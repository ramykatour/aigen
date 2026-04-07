# aigen 🚀

A modern CLI tool to scaffold high-performance AI chatbot apps.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/aigen.svg)](https://nodejs.org/)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/ramykatour/aigen)

## ✨ Features

- 🎯 **Quick Setup** - Generate a full-featured AI chatbot in seconds
- 🤖 **Multiple AI Providers** - Support for Groq, HuggingFace, and TogetherAI
- ⚛️ **Modern Frameworks** - Next.js 15 (App Router) and Vanilla options
- 🎨 **Beautiful UI** - Production-ready, ChatGPT-style interface
- ⚡ **Performance Optimized** - Streaming responses, edge runtime, lazy loading
- 🌙 **Dark Mode** - Modern dark theme with glassmorphism
- 📱 **Responsive** - Mobile-first design
- 🧩 **TypeScript** - Full type safety
- 🚀 **Deploy-Ready** - Vercel and other platforms supported

## 📦 Installation

### Using npx (Recommended)

```bash
npx aigen create my-app
```

### Global Installation

```bash
npm install -g aigen
aigen create my-app
```

## 🚀 Quick Start

1. Run the create command:

```bash
npx aigen create my-chat-app
```

2. Follow the interactive prompts:

```
? Select your AI Provider: 🚀 Groq (fastest, recommended)
? Select Framework: ⚛️  Next.js (App Router) - Production Ready
```

3. Navigate to your project:

```bash
cd my-chat-app
```

4. Install dependencies:

```bash
npm install
```

5. Set up your environment variables:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
# For Groq (recommended):
GROQ_API_KEY=your_groq_api_key_here
```

6. Get your API key:
   - **Groq**: https://console.groq.com/keys (Fastest, recommended)
   - **HuggingFace**: https://huggingface.co/settings/tokens
   - **TogetherAI**: https://api.together.xyz/settings/api-keys

7. Start the development server:

```bash
npm run dev
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Supported AI Providers

### Groq (Recommended) 🚀

- **Fastest** inference speeds
- OpenAI-compatible API
- Models: Llama 3, Mixtral, and more
- Get API key: https://console.groq.com/keys

### HuggingFace 🤗

- Wide range of open-source models
- Community-driven
- Get API key: https://huggingface.co/settings/tokens

### TogetherAI ⚡

- High-performance open-source models
- Great for production
- Get API key: https://api.together.xyz/settings/api-keys

## 🎨 Features of Generated Apps

### UI/UX

- Modern dark mode design
- Glassmorphism effects
- Smooth animations
- Typing indicators
- Auto-resize textarea
- Copy message button
- Clear chat functionality
- Mobile-responsive

### Performance

- Next.js 15 with App Router
- Edge runtime for API routes
- Streaming responses
- React Server Components
- Lazy loading
- Optimized bundle size

### Developer Experience

- TypeScript
- Tailwind CSS
- Zustand for state management
- Framer Motion for animations
- Clean architecture
- Easy to customize

## 📁 Project Structure

The generated Next.js app includes:

```
my-chat-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # Streaming chat API
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── ChatInterface.tsx     # Main chat container
│   ├── ChatHeader.tsx        # Header
│   ├── ChatMessage.tsx       # Message component
│   └── ChatInput.tsx         # Input component
├── lib/
│   ├── api.ts                # API client
│   ├── store.ts              # State management
│   └── utils.ts              # Utilities
├── styles/
│   └── globals.css           # Custom styles
├── .env.example              # Environment template
└── package.json
```

## 🛠️ Development

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/ramykatour/aigen.git
cd aigen
```

2. Install dependencies:

```bash
npm install
```

3. Link the package:

```bash
npm link
```

4. Test locally:

```bash
aigen create test-app
```

### Project Structure

```
aigen/
├── bin/
│   └── index.js              # CLI entry point
├── lib/
│   └── create-project.js     # Project creation logic
├── templates/
│   ├── nextjs-template/      # Next.js template
│   └── vanilla-template/     # Vanilla template (coming soon)
├── package.json
└── README.md
```

## 🚀 Publishing to npm

1. Update version in `package.json`
2. Build and test:

```bash
npm test
```

3. Publish:

```bash
npm publish
```

## 🔧 Configuration

### Environment Variables

The generated app uses these environment variables:

```bash
# Groq (recommended)
GROQ_API_KEY=your_key

# HuggingFace
HUGGINGFACE_API_KEY=your_key
MODEL=mistralai/Mistral-7B-Instruct-v0.2

# TogetherAI
TOGETHERAI_API_KEY=your_key
MODEL=mistralai/Mixtral-8x7B-Instruct-v0.1

# Optional
SYSTEM_PROMPT=You are a helpful AI assistant.
```

### Customization

You can easily customize:
- AI models via environment variables
- System prompts
- UI colors and styles
- API endpoint logic

## 📝 Examples

### Create with Groq

```bash
npx aigen create my-app
# Select: Groq
# Select: Next.js
```

### Create with HuggingFace

```bash
npx aigen create my-app
# Select: HuggingFace
# Select: Next.js
```

### Force Overwrite

```bash
npx aigen create my-app --force
```

## 🌟 Roadmap

- [ ] Vanilla JS template
- [ ] More AI providers (OpenAI, Anthropic)
- [ ] Custom template support
- [ ] Plugin system
- [ ] Multi-language support
- [ ] Authentication templates
- [ ] Database integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [ramykatour](https://github.com/ramykatour)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Groq for the fast inference
- The open-source community

## 📞 Support

- GitHub: https://github.com/ramykatour/aigen
- Email: ramymouner@hotmail.com
- Issues: https://github.com/ramykatour/aigen/issues

---

Made by [ramykatour](https://github.com/ramykatour)
