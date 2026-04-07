# AI Chat App (Vanilla JS)

A modern, lightweight AI chatbot built with vanilla JavaScript, HTML, and CSS. No frameworks required!

## Features

- 🚀 **Lightweight** - Zero framework dependencies
- 🎨 **Beautiful UI** - Modern dark mode design with glassmorphism
- ⚡ **Streaming Responses** - Real-time token-by-token streaming
- 📱 **Responsive** - Mobile-first design
- 🌙 **Dark Mode** - Modern dark theme by default
- 🎯 **Fast Performance** - Minimal bundle, instant loading
- 💾 **Local Storage** - Conversation persistence
- ♿ **Accessible** - Semantic HTML with proper labels
- 🔌 **Multiple Providers** - Support for Groq, HuggingFace, and TogetherAI

## Getting Started

### Prerequisites

- Node.js 18+ (for the dev server, optional)
- API key from your chosen AI provider

### Quick Start

1. **Using a simple HTTP server (Python):**

```bash
python3 -m http.server 3000
```

2. **Using Node.js serve:**

```bash
npm install
npm run dev
```

3. **Using VS Code Live Server:**
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

4. **Using PHP:**

```bash
php -S localhost:3000
```

### Set Up Environment Variables

Since this is a client-side only app, you'll need to set up a backend API. See the **Backend Setup** section below.

For local development with a proxy, you can:

1. Create a `.env` file (for reference only):
```env
GROQ_API_KEY=your_groq_api_key_here
SYSTEM_PROMPT=You are a helpful AI assistant.
```

2. Set up a simple API proxy (see examples below).

## Backend Setup

### Option 1: Simple Node.js Proxy

Create `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                stream: true,
                temperature: 0.7,
                max_tokens: 2048,
            }),
        });

        // Stream the response
        res.setHeader('Content-Type', 'text/event-stream');
        response.body.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('Proxy server running on port 3001');
});
```

Install dependencies:
```bash
npm install express cors node-fetch dotenv
```

Run:
```bash
node server.js
```

Update `app.js` API URL:
```javascript
const response = await fetch('http://localhost:3001/api/chat', {
```

### Option 2: Vercel Serverless Function

Create `api/chat.js`:

```javascript
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                stream: true,
            }),
        });

        res.setHeader('Content-Type', 'text/event-stream');
        response.body.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
```

### Option 3: Netlify Functions

Create `netlify/functions/chat.js`:

```javascript
const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method not allowed' };
    }

    const { messages } = JSON.parse(event.body);

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                stream: true,
            }),
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/event-stream' },
            body: await response.text(),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
```

## Project Structure

```
vanilla-chat/
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── app.js             # Application logic
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Features Details

### Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line

### UI Features

- Dark mode by default
- Smooth animations
- Typing indicator
- Copy message button
- Clear chat functionality
- Auto-scroll to latest message
- Glassmorphism design
- Gradient backgrounds
- Custom scrollbar
- Responsive layout

### State Management

- Conversation persistence via localStorage
- Auto-save messages
- Restore previous sessions

### Performance

- No framework overhead
- Minimal JavaScript (~8KB minified)
- No build step required
- Instant page load
- Optimized re-renders

## Customization

### Change Colors

Edit `styles.css`:

```css
:root {
    --background: #0a0a0f;
    --foreground: #ffffff;
    --violet-primary: #8b5cf6;
    --violet-light: #a78bfa;
    /* Add your custom colors */
}
```

### Change System Prompt

Edit `app.js`:

```javascript
const state = {
    messages: [],
    isLoading: false,
    systemPrompt: 'You are a coding assistant.' // Change this
};
```

### Add Custom Animations

Edit `styles.css`:

```css
@keyframes customAnimation {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Add environment variables
4. Deploy

### GitHub Pages

1. Push code to GitHub
2. Enable GitHub Pages in settings
3. Select branch (main)
4. Access at `username.github.io/repo-name`

### Static Hosting (Any)

Simply upload the files to any static hosting service:
- AWS S3 + CloudFront
- Cloudflare Pages
- Firebase Hosting
- Surge.sh

## API Integration

### Supported Providers

#### Groq (Recommended) 🚀
- **Fastest inference** speeds
- OpenAI-compatible API
- Get API key: https://console.groq.com/keys

#### HuggingFace 🤗
- Wide range of models
- Get API key: https://huggingface.co/settings/tokens

#### TogetherAI ⚡
- High-performance models
- Get API key: https://api.together.xyz/settings/api-keys

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation
- Screen reader friendly
- High contrast colors

## Performance Tips

1. **Minify CSS and JS** for production
2. **Enable gzip/brotli** compression on server
3. **Use CDN** for fonts
4. **Optimize images** if you add any
5. **Enable caching** headers

## Troubleshooting

### API Not Working

- Ensure you have a backend proxy running
- Check API key is set correctly
- Verify CORS is configured
- Check browser console for errors

### Styles Not Loading

- Ensure `styles.css` is in the same directory
- Check file path in HTML `<link>` tag
- Clear browser cache

### Messages Not Saving

- Check localStorage is enabled in browser
- Clear localStorage and refresh
- Check browser console for errors

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript (ES6+)** - No frameworks
- **LocalStorage API** - State persistence
- **Fetch API** - HTTP requests
- **Server-Sent Events** - Streaming responses

## Advantages of Vanilla JS

- ✅ **Zero dependencies** - No npm packages needed for core functionality
- ✅ **Fastest load time** - No framework overhead
- ✅ **Easy to understand** - No abstractions or magic
- ✅ **Easy to debug** - Direct access to DOM and state
- ✅ **Future-proof** - No framework deprecations
- ✅ **Small bundle** - ~8KB minified
- ✅ **Portable** - Works anywhere with a browser

## License

MIT

## Support

For issues and questions, visit: https://github.com/ramykatour/aigen

---

Built using vanilla JavaScript
