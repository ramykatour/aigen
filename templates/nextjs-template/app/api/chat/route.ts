import { NextRequest, NextResponse } from 'next/server';

// Supported providers
type Provider = 'groq' | 'huggingface' | 'togetherai';

// Configuration for each provider
const PROVIDER_CONFIGS = {
  groq: {
    baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
  },
  huggingface: {
    baseUrl: `https://api-inference.huggingface.co/models/${process.env.MODEL || 'mistralai/Mistral-7B-Instruct-v0.2'}`,
    apiKey: process.env.HUGGINGFACE_API_KEY,
    model: process.env.MODEL || 'mistralai/Mistral-7B-Instruct-v0.2',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    },
  },
  togetherai: {
    baseUrl: 'https://api.together.xyz/v1/chat/completions',
    apiKey: process.env.TOGETHERAI_API_KEY,
    model: process.env.MODEL || 'mistralai/Mixtral-8x7B-Instruct-v0.1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOGETHERAI_API_KEY}`,
    },
  },
};

// Detect which provider is configured
function getProvider(): Provider {
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.HUGGINGFACE_API_KEY) return 'huggingface';
  if (process.env.TOGETHERAI_API_KEY) return 'togetherai';
  return 'groq'; // Default
}

// Format messages for different providers
function formatMessages(messages: any[], provider: Provider) {
  if (provider === 'huggingface') {
    // HuggingFace uses a different format
    return {
      inputs: messages
        .filter((m) => m.role !== 'system')
        .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n'),
      parameters: {
        max_new_tokens: 2048,
        temperature: 0.7,
        do_sample: true,
      },
    };
  }

  // Groq and TogetherAI use OpenAI-compatible format
  return {
    model: PROVIDER_CONFIGS[provider].model,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
    stream: true,
    temperature: 0.7,
    max_tokens: 2048,
  };
}

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const provider = getProvider();
    const config = PROVIDER_CONFIGS[provider];

    if (!config.apiKey) {
      return NextResponse.json(
        { error: `No API key configured for ${provider}. Please set the environment variable.` },
        { status: 500 }
      );
    }

    // Special handling for HuggingFace (non-streaming for simplicity)
    if (provider === 'huggingface') {
      const response = await fetch(config.baseUrl, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(formatMessages(messages, provider)),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json(
          { error: `HuggingFace API error: ${errorText}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      const content = data.generated_text || '';

      // Stream the response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const chunks = content.split('');
          for (const chunk of chunks) {
            const data = JSON.stringify({ content: chunk });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Groq and TogetherAI (OpenAI-compatible with streaming)
    const response = await fetch(config.baseUrl, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(formatMessages(messages, provider)),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `${provider} API error: ${errorText}` },
        { status: response.status }
      );
    }

    // Create a TransformStream to process the SSE stream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk);
        const lines = text.split('\n').filter((line) => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;

              if (content) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                );
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      },
    });

    const transformedStream = response.body?.pipeThrough(transformStream);

    return new NextResponse(transformedStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
