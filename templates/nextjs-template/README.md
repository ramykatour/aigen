# AI Chat App

A modern, production-ready AI chatbot built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Fast & Responsive** - Built with Next.js 15 App Router and React Server Components
- 🎨 **Beautiful UI** - Modern dark mode design with glassmorphism effects
- ⚡ **Streaming Responses** - Real-time token-by-token streaming
- 🔌 **Multiple Providers** - Support for Groq, HuggingFace, and TogetherAI
- 📱 **Mobile-First** - Fully responsive design
- ♿ **Accessible** - Semantic HTML with proper ARIA labels
- 🎯 **Type-Safe** - Built with TypeScript
- ⚙️ **Customizable** - Easy to configure and extend

## Getting Started

### Prerequisites

- Node.js 18+ installed
- API key from your chosen AI provider

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up your environment variables by creating a `.env` file:

```bash
# For Groq (recommended - fastest)
GROQ_API_KEY=your_groq_api_key_here

# OR for HuggingFace
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
MODEL=mistralai/Mistral-7B-Instruct-v0.2

# OR for TogetherAI
TOGETHERAI_API_KEY=your_togetherai_api_key_here
MODEL=mistralai/Mixtral-8x7B-Instruct-v0.1

# Optional: Custom system prompt
SYSTEM_PROMPT=You are a helpful AI assistant.
```

3. Get your API key:
   - **Groq**: https://console.groq.com/keys (Fastest, recommended)
   - **HuggingFace**: https://huggingface.co/settings/tokens
   - **TogetherAI**: https://api.together.xyz/settings/api-keys

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # Chat API with streaming
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── ChatInterface.tsx     # Main chat container
│   ├── ChatHeader.tsx        # Header with clear button
│   ├── ChatMessage.tsx       # Individual message component
│   └── ChatInput.tsx         # Input with auto-resize
├── lib/
│   ├── api.ts                # API client with streaming
│   ├── store.ts              # Zustand state management
│   └── utils.ts              # Utility functions
└── styles/
    └── globals.css           # Custom styles and animations
```

## Features Details

### Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line

### UI Features

- Dark mode by default
- Smooth animations with Framer Motion
- Typing indicator
- Copy message button
- Clear chat functionality
- Auto-scroll to latest message
- Glassmorphism design
- Gradient backgrounds

### Performance

- Edge runtime for API routes
- Streaming responses
- Lazy loading
- Optimized re-renders with Zustand
- Minimal bundle size

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

This app works on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Cloudflare Pages

## Customization

### Change the AI Model

Edit `.env`:

```bash
# For Groq (models: llama3-70b-8192, llama3-8b-8192, mixtral-8x7b-32768)
MODEL=llama3-70b-8192

# For HuggingFace (any HuggingFace model)
MODEL=mistralai/Mistral-7B-Instruct-v0.2

# For TogetherAI (any TogetherAI model)
MODEL=mistralai/Mixtral-8x7B-Instruct-v0.1
```

### Customize System Prompt

Edit `.env`:

```bash
SYSTEM_PROMPT=You are a helpful AI assistant specializing in coding.
```

### Modify UI Colors

Edit `styles/globals.css`:

```css
:root {
  --background: #0a0a0f;
  --foreground: #ffffff;
}
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Runtime**: Edge (for API routes)

## License

MIT

## Support

For issues and questions, please visit: https://github.com/ramykatour/aigen
