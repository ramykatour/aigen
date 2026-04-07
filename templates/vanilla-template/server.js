/**
 * Simple Express Proxy Server for Vanilla JS Chat App
 * This proxy handles API requests to avoid CORS issues and keep API keys secure
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat API proxy
app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Detect which provider to use based on environment variables
    let provider = 'groq';
    if (!process.env.GROQ_API_KEY && process.env.HUGGINGFACE_API_KEY) {
        provider = 'huggingface';
    } else if (!process.env.GROQ_API_KEY && process.env.TOGETHERAI_API_KEY) {
        provider = 'togetherai';
    }

    try {
        let apiUrl, headers, body;

        switch (provider) {
            case 'groq':
                apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                };
                body = {
                    model: process.env.MODEL || 'llama-3.3-70b-versatile',
                    messages: messages.map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 2048,
                };
                break;

            case 'huggingface':
                apiUrl = `https://api-inference.huggingface.co/models/${process.env.MODEL || 'mistralai/Mistral-7B-Instruct-v0.2'}`;
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                };
                body = {
                    inputs: messages
                        .filter(m => m.role !== 'system')
                        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
                        .join('\n'),
                    parameters: {
                        max_new_tokens: 2048,
                        temperature: 0.7,
                        do_sample: true,
                    },
                };
                break;

            case 'togetherai':
                apiUrl = 'https://api.together.xyz/v1/chat/completions';
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.TOGETHERAI_API_KEY}`,
                };
                body = {
                    model: process.env.MODEL || 'mistralai/Mixtral-8x7B-Instruct-v0.1',
                    messages: messages.map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 2048,
                };
                break;

            default:
                return res.status(500).json({ error: 'No API provider configured' });
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            return res.status(response.status).json({ error: `API error: ${errorText}` });
        }

        // For HuggingFace, we need to handle non-streaming response
        if (provider === 'huggingface') {
            const data = await response.json();
            const content = data.generated_text || '';

            // Convert to streaming format
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const chunks = content.split('');
            for (const chunk of chunks) {
                res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
                await new Promise(resolve => setTimeout(resolve, 5));
            }
            res.write('data: [DONE]\n\n');
            res.end();
        } else {
            // Stream the response for Groq and TogetherAI
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            response.body.pipe(res);
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve static files from current directory
app.use(express.static(__dirname));

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 Server is running!');
    console.log(`\n📝 Open http://localhost:${PORT} in your browser`);
    console.log(`\n🔧 API endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`\n⚠️  Make sure to set your API key in .env file\n`);
});
