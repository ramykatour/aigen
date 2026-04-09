# aigenx Setup Guide

Complete guide to setting up, testing, and publishing the aigenx CLI tool.

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git (optional, for development)

## 🔧 Development Setup

### 1. Clone and Navigate

```bash
cd /home/z/aigenx
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Make CLI Executable (Unix/Linux/Mac)

```bash
chmod +x bin/index.js
```

## 🧪 Local Testing

### Method 1: Using npm link (Recommended)

1. Link the package globally:

```bash
npm link
```

2. Test the CLI:

```bash
aigenx create test-chat-app
```

3. Follow the interactive prompts:
   - Select AI Provider: Groq (recommended)
   - Select Framework: Next.js

4. Navigate to the created app:

```bash
cd test-chat-app
```

5. Install dependencies:

```bash
npm install
```

6. Set up environment:

```bash
# Copy the example
cp .env.example .env

# Edit .env and add your Groq API key
# Get your key from: https://console.groq.com/keys
```

Example `.env` file:

```env
GROQ_API_KEY=gsk_your_api_key_here
SYSTEM_PROMPT=You are a helpful AI assistant.
```

7. Run the development server:

```bash
npm run dev
```

8. Open http://localhost:3000 in your browser

### Method 2: Direct Node Execution

```bash
node bin/index.js create test-app
```

### Method 3: Using npm test script

```bash
npm test
```

## 🚀 Publishing to npm

### Step 1: Create npm Account

If you don't have an npm account:

1. Go to https://www.npmjs.com/signup
2. Create your account
3. Verify your email

### Step 2: Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

### Step 3: Verify Package Name

Check if the package name is available:

```bash
npm view aigenx
```

If it returns "404 Not Found", the name is available.

### Step 4: Update Version (if needed)

Edit `package.json` and update the version:

```json
{
  "name": "aigenx",
  "version": "1.0.0",
  ...
}
```

### Step 5: Test Before Publishing

Run the test script:

```bash
npm test
```

### Step 6: Publish (Private or Public)

#### Public Package (Recommended)

```bash
npm publish --access public
```

#### Private Package

```bash
npm publish --access private
```

### Step 7: Verify Publication

Check if your package is published:

```bash
npm view aigenx
```

Or visit: https://www.npmjs.com/package/aigenx

## 📦 Using the Published Package

### Using npx (No Installation Required)

```bash
npx aigenx create my-app
```

### Global Installation

```bash
npm install -g aigenx
aigenx create my-app
```

### Local Installation

```bash
npm install aigenx
npx aigenx create my-app
```

## 🎯 Testing Different Scenarios

### Test 1: Groq with Next.js

```bash
aigenx create groq-test
cd groq-test
# Set GROQ_API_KEY in .env
npm install
npm run dev
```

### Test 2: HuggingFace with Next.js

```bash
aigenx create hf-test
cd hf-test
# Set HUGGINGFACE_API_KEY in .env
npm install
npm run dev
```

### Test 3: TogetherAI with Next.js

```bash
aigenx create together-test
cd together-test
# Set TOGETHERAI_API_KEY in .env
npm install
npm run dev
```

### Test 4: Force Overwrite

```bash
aigenx create existing-app --force
```

## 🐛 Troubleshooting

### Issue: Permission Denied

```bash
chmod +x bin/index.js
```

### Issue: Module Not Found

```bash
npm install
```

### Issue: Cannot Find Module

Make sure you're in the aigenx directory:

```bash
cd /home/z/aigenx
npm install
npm link
```

### Issue: Package Name Already Exists

Change the name in `package.json`:

```json
{
  "name": "@username/aigenx",
  ...
}
```

Then publish with scoped name:

```bash
npm publish --access public
```

### Issue: API Connection Error

Make sure you've set the correct environment variables in your generated app's `.env` file.

### Issue: Port 3000 Already in Use

Change the port:

```bash
npm run dev -- -p 3001
```

## 📝 Updating the Package

1. Update version in `package.json`:

```json
{
  "version": "1.0.1"
}
```

2. Commit and push changes:

```bash
git add .
git commit -m "Update to v1.0.1"
git push
```

3. Publish new version:

```bash
npm publish
```

## 🌐 Deployment Guide for Generated Apps

### Vercel (Recommended)

1. Push your generated app to GitHub
2. Go to https://vercel.com
3. Click "Add New Project"
4. Import your repository
5. Add environment variables:
   - `GROQ_API_KEY` (or your chosen provider)
   - `SYSTEM_PROMPT` (optional)
6. Click "Deploy"

### Other Platforms

#### Netlify

```bash
npm run build
# Upload .next folder to Netlify
```

#### Railway

1. Create new project on Railway
2. Connect GitHub repository
3. Add environment variables
4. Deploy

#### Render

1. Create new Web Service
2. Connect GitHub repository
3. Add environment variables
4. Deploy

## 📊 Best Practices

1. **Always test locally before publishing**
2. **Use semantic versioning** (Major.Minor.Patch)
3. **Update changelog** with each release
4. **Test on different Node versions**
5. **Keep dependencies updated**

## 🔒 Security

- Never commit `.env` files
- Use `.env.example` as a template
- Rotate API keys regularly
- Review dependencies for vulnerabilities:

```bash
npm audit
npm audit fix
```

## 📚 Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [HuggingFace API Docs](https://huggingface.co/docs/api-inference)
- [TogetherAI API Docs](https://docs.together.ai/)

## 💡 Tips

1. Use `npx` to always get the latest version
2. Pin versions in production for stability
3. Use `npm ci` for clean installs in CI/CD
4. Keep your package.json clean and organized
5. Add meaningful descriptions to your package

## 🤝 Support

If you encounter issues:

1. Check this guide first
2. Review the README.md
3. Open an issue on GitHub: https://github.com/ramykatour/aigenx/issues
4. Email: ramymouner@hotmail.com

---

