# aigen Quick Reference

## 🚀 Essential Commands

### Create a New App
```bash
npx aigen create my-app
```

### With Specific Provider (manual prompt selection)
```bash
npx aigen create my-app
# Then select: Groq, HuggingFace, or TogetherAI
```

### Force Overwrite Existing Directory
```bash
npx aigen create my-app --force
```

---

## 🔑 API Keys

### Groq (Recommended)
1. Go to: https://console.groq.com/keys
2. Create new API key
3. Add to `.env`:
   ```env
   GROQ_API_KEY=gsk_your_key_here
   ```

### HuggingFace
1. Go to: https://huggingface.co/settings/tokens
2. Create new token
3. Add to `.env`:
   ```env
   HUGGINGFACE_API_KEY=your_key_here
   MODEL=mistralai/Mistral-7B-Instruct-v0.2
   ```

### TogetherAI
1. Go to: https://api.together.xyz/settings/api-keys
2. Create new API key
3. Add to `.env`:
   ```env
   TOGETHERAI_API_KEY=your_key_here
   MODEL=mistralai/Mixtral-8x7B-Instruct-v0.1
   ```

---

## 📁 Generated App Commands

### Development
```bash
cd my-app
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

---

## 🎨 Customization

### Change System Prompt
Edit `.env`:
```env
SYSTEM_PROMPT=You are a coding assistant that specializes in React.
```

### Change Model
Edit `.env`:
```env
# Groq models:
# - llama-3.3-70b-versatile (default)
# - llama-3.1-70b-versatile
# - mixtral-8x7b-32768

MODEL=llama-3.3-70b-versatile
```

### Change Colors
Edit `styles/globals.css`:
```css
:root {
  --background: #0a0a0f;
  --foreground: #ffffff;
}
```

---

## ⌨️ Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line
- `Cmd/Ctrl + C` - Stop generation (in terminal)

---

## 🐛 Common Issues

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### API Key Not Working
- Check `.env` file is in project root
- Verify API key is correct
- Ensure no extra spaces around the key

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Publishing CLI to npm

### First Time
```bash
cd /home/z/aigen
npm install
npm login
npm publish --access public
```

### Update Version
```bash
# Edit package.json version
npm publish
```

### Verify Published
```bash
npm view aigen
```

---

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Deployment
```
GROQ_API_KEY=your_production_key
SYSTEM_PROMPT=You are a helpful AI assistant.
```

---

## 🔍 Testing CLI Locally

### From aigen directory
```bash
cd /home/z/aigen
npm install
node bin/index.js create test-app
```

### Using npm link
```bash
cd /home/z/aigen
npm link
aigen create test-app
```

---

## 📊 Project Stats

- **CLI Files:** 2 (bin/index.js, lib/create-project.js)
- **Template Files:** 15+
- **Components:** 4 (ChatInterface, ChatHeader, ChatMessage, ChatInput)
- **API Routes:** 1 (chat with streaming)
- **Dependencies:** 11
- **Lines of Code:** 1500+

---

## 🎯 Key Features

✅ Next.js 15 with App Router
✅ TypeScript throughout
✅ Streaming responses
✅ Edge runtime
✅ Dark mode default
✅ Glassmorphism design
✅ Multiple AI providers
✅ State management (Zustand)
✅ Animations (Framer Motion)
✅ Responsive design
✅ Accessibility features
✅ Copy message
✅ Clear chat
✅ Typing indicator
✅ Auto-scroll
✅ Keyboard shortcuts

---

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP.md` - Complete setup guide
- `QUICK_REFERENCE.md` - This file
- `PROJECT_SUMMARY.md` - Complete project overview
- `templates/nextjs-template/README.md` - Generated app docs

---

## 💡 Tips

1. Use Groq for fastest responses
2. Always test API keys in `.env.example` first
3. Deploy to Vercel for best performance
4. Customize system prompt for specific use cases
5. Use `npx aigen` to always get latest version

---

## 🆘 Help & Support

- **GitHub:** https://github.com/ramykatour/aigen
- **Email:** ramymouner@hotmail.com
- **Issues:** https://github.com/ramykatour/aigen/issues

---

