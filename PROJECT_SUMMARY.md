# aigenx - AI Chatbot Generator CLI

## 📦 Project Overview

**aigenx** is a production-ready CLI tool that scaffolds high-performance AI chatbot applications with modern UI, streaming responses, and support for multiple AI providers.

### 🎯 Project Identity

- **Name:** aigenx
- **Author:** ramykatour
- **Email:** ramymouner@hotmail.com
- **GitHub:** https://github.com/ramykatour/aigenx
- **License:** MIT
- **Version:** 1.0.0

---

## ✨ Key Features Delivered

### CLI Features
- ✅ Interactive command-line interface with prompts
- ✅ Support for multiple AI providers (Groq, HuggingFace, TogetherAI)
- ✅ Framework selection (Next.js with App Router)
- ✅ Auto-configuration of environment files
- ✅ Clean terminal UX with colors and formatted output
- ✅ Force overwrite option for existing directories

### Generated App Features
- ✅ **Next.js 15** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Streaming responses** with real-time token-by-token display
- ✅ **Edge runtime** for API routes
- ✅ **React Server Components** where applicable
- ✅ **Dark mode** by default with modern design
- ✅ **Glassmorphism** effects with blur and transparency
- ✅ **Smooth animations** using Framer Motion
- ✅ **Responsive design** (mobile-first)
- ✅ **Keyboard shortcuts** (Enter to send, Shift+Enter for new line)
- ✅ **Auto-resize textarea** for input
- ✅ **Copy message** functionality
- ✅ **Clear chat** button
- ✅ **Typing indicator** with animated dots
- ✅ **Auto-scroll** to latest message
- ✅ **State management** with Zustand
- ✅ **Error handling** with user-friendly messages
- ✅ **Accessibility** features (ARIA labels, semantic HTML)

---

## 📁 Complete Project Structure

```
/home/z/aigenx/
├── bin/
│   └── index.js                    # CLI entry point with Commander.js
├── lib/
│   └── create-project.js           # Project creation logic
├── templates/
│   └── nextjs-template/            # Next.js app template
│       ├── app/
│       │   ├── api/
│       │   │   └── chat/
│       │   │       └── route.ts    # Streaming chat API (Edge runtime)
│       │   ├── layout.tsx          # Root layout with metadata
│       │   ├── page.tsx            # Home page component
│       │   └── globals.css         # Global styles (imported in layout)
│       ├── components/
│       │   ├── ChatInterface.tsx   # Main chat container
│       │   ├── ChatHeader.tsx      # Header with clear button
│       │   ├── ChatMessage.tsx     # Message component with copy
│       │   └── ChatInput.tsx       # Input with auto-resize
│       ├── lib/
│       │   ├── api.ts              # API client with streaming
│       │   ├── store.ts            # Zustand state management
│       │   └── utils.ts            # Utility functions
│       ├── styles/
│       │   └── globals.css         # Custom styles & animations
│       ├── .env.example            # Environment variables template
│       ├── .gitignore              # Git ignore rules
│       ├── next.config.js          # Next.js configuration
│       ├── package.json            # Dependencies
│       ├── postcss.config.js       # PostCSS configuration
│       ├── tailwind.config.ts      # Tailwind CSS configuration
│       ├── tsconfig.json           # TypeScript configuration
│       └── README.md               # Generated app documentation
├── package.json                    # CLI tool dependencies
├── README.md                       # Main README
└── SETUP.md                        # Complete setup guide
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies (if developing)

```bash
cd /home/z/aigenx
npm install
```

### 2. Test CLI Locally

```bash
node /home/z/aigenx/bin/index.js create my-chat-app
```

### 3. Follow Interactive Prompts

```
✨ Welcome to aigenx!

Building modern AI chatbot apps with ease.

? Select your AI Provider: 🚀 Groq (fastest, recommended)
? Select Framework: ⚛️  Next.js (App Router) - Production Ready
```

### 4. Navigate to Generated App

```bash
cd my-chat-app
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
# For Groq (recommended)
GROQ_API_KEY=gsk_your_api_key_here
```

Get your Groq API key: https://console.groq.com/keys

### 7. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 🎨 UI/UX Details

### Color Scheme
- **Background:** Deep dark (#0a0a0f)
- **Primary:** Violet to Purple gradient
- **User Messages:** Blue to Cyan gradient
- **AI Messages:** Violet to Purple gradient
- **Text:** White (#ffffff)
- **Secondary Text:** Gray (#6b7280)

### Design Elements
- **Glassmorphism:** Background blur with semi-transparent panels
- **Gradients:** Radial gradient background with violet/purple accents
- **Shadows:** Subtle shadows for depth
- **Rounded Corners:** xl/2xl for modern feel
- **Animations:**
  - Slide-in for messages (left for AI, right for user)
  - Typing indicator with bouncing dots
  - Hover effects on buttons
  - Scale animations on interactions

### Typography
- **Font:** Inter (Google Fonts)
- **Hierarchy:** Clear heading and body text sizes
- **Line Height:** Comfortable reading spacing (leading-relaxed)

---

## 🔌 API Integration

### Supported Providers

#### 1. Groq (Recommended) 🚀
- **Fastest inference** speeds
- **OpenAI-compatible** API
- **Models:** Llama 3.3 70B, Llama 3, Mixtral, and more
- **Endpoint:** https://api.groq.com/openai/v1/chat/completions
- **Streaming:** ✅ Native SSE support

#### 2. HuggingFace 🤗
- **Wide range** of open-source models
- **Community-driven**
- **Models:** Any HuggingFace model (default: Mistral-7B)
- **Endpoint:** https://api-inference.huggingface.co/models/{model}
- **Streaming:** ✅ Simulated via client-side

#### 3. TogetherAI ⚡
- **High-performance** open-source models
- **Production-ready**
- **Models:** Mixtral 8x7B, and more
- **Endpoint:** https://api.together.xyz/v1/chat/completions
- **Streaming:** ✅ Native SSE support

### API Route Features
- Edge runtime support
- Streaming responses via Server-Sent Events (SSE)
- Automatic provider detection
- Error handling
- Request/response logging

---

## 🧩 Technical Implementation

### State Management (Zustand)

```typescript
interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  systemPrompt: string;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateLastMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
  setSystemPrompt: (prompt: string) => void;
}
```

### Streaming Implementation

```typescript
async function streamChatResponse(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  onError: (error: string) => void,
  onComplete: () => void
): Promise<void>
```

### Message Flow

1. User types message in textarea
2. Press Enter → handleSubmit()
3. Add user message to store
4. Add empty assistant message for streaming
5. Call API with streaming
6. Update assistant message token by token
7. onComplete() → setLoading(false)

---

## 📦 Dependencies

### CLI Tool
- `commander` - CLI framework
- `inquirer` - Interactive prompts
- `chalk` - Terminal colors
- `ora` - Loading spinners
- `execa` - Process execution
- `fs-extra` - File system operations

### Generated App
- `next` - React framework
- `react` & `react-dom` - React library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `zustand` - State management
- `lucide-react` - Icons
- `clsx` & `tailwind-merge` - Class utilities

---

## 🚀 Publishing to npm

### Step 1: Login to npm

```bash
npm login
```

### Step 2: Verify Package Name

```bash
npm view aigenx
```

### Step 3: Publish

```bash
npm publish --access public
```

### Step 4: Use Published Package

```bash
npx aigenx create my-app
```

---

## 📝 Usage Examples

### Create with Groq

```bash
npx aigenx create my-groq-app
# Select: Groq
# Select: Next.js
```

### Create with HuggingFace

```bash
npx aigenx create my-hf-app
# Select: HuggingFace
# Select: Next.js
```

### Force Overwrite

```bash
npx aigenx create existing-app --force
```

---

## 🎯 Performance Optimizations

1. **Edge Runtime** - API routes run on edge for low latency
2. **Streaming Responses** - No waiting for full response
3. **Lazy Loading** - Components load on demand
4. **Minimal Re-renders** - Zustand optimizes updates
5. **Code Splitting** - Next.js automatic code splitting
6. **Optimized Bundle** - Tree-shaking and minification
7. **CSS Purging** - Tailwind removes unused styles

---

## 🔧 Configuration Options

### Environment Variables

```env
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

### Customization Points

1. **System Prompt** - Change AI behavior
2. **Model Selection** - Use different models
3. **Colors** - Modify Tailwind config
4. **Animations** - Adjust Framer Motion
5. **API Endpoint** - Add custom providers

---

## 🌟 Key Highlights

### What Makes This Special?

1. **Production-Ready** - Not a prototype, but a complete solution
2. **Modern Stack** - Latest technologies (Next.js 15, React 18)
3. **Beautiful UI** - ChatGPT/Perplexity style design
4. **Fast Performance** - Streaming with edge runtime
5. **Developer Experience** - Clean code, TypeScript, easy customization
6. **Multiple Providers** - Flexibility in AI choice
7. **Complete Documentation** - README, SETUP.md, inline comments

### Quality Metrics

- ✅ TypeScript throughout
- ✅ Error handling everywhere
- ✅ Accessibility features
- ✅ Mobile responsive
- ✅ Dark mode default
- ✅ Smooth animations
- ✅ Clean architecture
- ✅ Reusable components

---

## 📚 Additional Documentation

- **README.md** - Main documentation
- **SETUP.md** - Complete setup and deployment guide
- **templates/nextjs-template/README.md** - Generated app docs

---

## 🤝 Support

- **GitHub:** https://github.com/ramykatour/aigenx
- **Email:** ramymouner@hotmail.com
- **Issues:** https://github.com/ramykatour/aigenx/issues

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 🎉 Conclusion

**aigenx** is a complete, production-ready CLI tool that generates high-performance AI chatbot applications. It includes:

- ✅ Fully functional CLI with interactive prompts
- ✅ Complete Next.js 15 template with App Router
- ✅ Modern, beautiful UI with dark mode
- ✅ Streaming responses with edge runtime
- ✅ Support for multiple AI providers
- ✅ Comprehensive documentation
- ✅ Ready for npm publishing

The generated apps feel like **create-next-app** quality with smooth UX, fast performance, and production-ready code.


