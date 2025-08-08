# Gemini AI Chatbot Setup Guide

## 🚀 Quick Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure the Environment

Create a file called `.env` in the `server` folder with this content:

```bash
# Gemini API Configuration
GEMINI_API_KEY=your-actual-gemini-api-key-here

# Server Configuration
PORT=3001
NODE_ENV=development
```

**Replace `your-actual-gemini-api-key-here` with your real Gemini API key.**

### 3. Install Dependencies

```bash
cd server
npm install
```

### 4. Start the Server

```bash
npm run dev
```

You should see:
```
✅ Gemini API key configured
🚀 Chatbot API server running on port 3001
🔗 Test your API key: http://localhost:3001/api/test
```

### 5. Test the Setup

```bash
curl http://localhost:3001/api/test
```

### 6. Start the Frontend

In another terminal:
```bash
npm run dev
```

## 🔧 What's Changed

- ✅ **Backend**: Now uses Google's Gemini AI instead of OpenAI
- ✅ **API**: Uses `@google/generative-ai` library
- ✅ **Authentication**: Uses Gemini API key
- ✅ **Chat Format**: Properly formatted for Gemini's chat API

## 🎯 Features

- **Context-Aware**: AI understands the specific programming problem
- **Code Analysis**: Can review and provide feedback on user code
- **Progressive Hints**: Provides hints at different levels
- **Real-time Chat**: Interactive conversation with the AI tutor

## 🚨 Troubleshooting

### "Gemini API key not configured"
- Make sure you created the `.env` file in the `server` folder
- Verify your API key is correct
- Check that the file is named exactly `.env` (with the dot)

### "API key test failed"
- Verify your Gemini API key is valid
- Check your Google AI Studio account has sufficient quota
- Ensure you're using the correct API key format

### "CORS error"
- The server is configured to accept requests from `localhost:5173` and `localhost:3000`
- If using a different port, update the CORS configuration in `server/api/chatbot.js`

## 🔗 Useful Links

- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google Generative AI Node.js Library](https://github.com/google/generative-ai-nodejs)

## 💡 Tips

- Gemini API keys are free to create
- You get generous free tier usage
- The API is generally faster than OpenAI
- Supports multiple languages and code analysis 