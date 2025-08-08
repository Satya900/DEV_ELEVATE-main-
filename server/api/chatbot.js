require('dotenv').config({ path: './.env' });

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());
// CORS configuration for development
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Add your frontend URLs
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Debug environment variables
console.log('Environment variables:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Your Gemini API key - store this securely in production
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Validate API key on startup
if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
  console.error('❌ ERROR: Gemini API key not configured!');
  console.error('Please set your GEMINI_API_KEY in the .env file');
  process.exit(1);
}

console.log('✅ Gemini API key configured');

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

app.post('/api/chatbot', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Messages array is required' 
      });
    }

    // Format messages for Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start a chat session and send messages
    const chat = model.startChat({
      history: formattedMessages.slice(0, -1), // Use all but the last message as history
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const msg = formattedMessages[formattedMessages.length - 1].parts[0].text; // Get the latest message text
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const assistantMessage = response.text();
    
    if (!assistantMessage) {
      throw new Error('No response from AI assistant');
    }

    res.json({
      message: assistantMessage,
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    console.error('Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    // Basic error handling, may need refinement based on Gemini API errors
    res.status(500).json({
      error: error.message || 'Failed to get response from AI assistant.',
    });
  }
});

// Test endpoint - may need to be updated for Gemini API
app.get('/api/test', async (req, res) => {
  try {
    // You might want to use a different way to test the Gemini API
    res.json({
      success: true,
      message: 'Test endpoint reached. Gemini API key should be configured in .env',
    });
  } catch (error) {
    console.error('API key test failed:', error.response?.status, error.response?.data);
    res.status(500).json({
      success: false,
      error: 'API key test failed',
      details: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Chatbot API server running on port ${PORT}`);
  console.log(`🔗 Test your API key: http://localhost:${PORT}/api/test`);
}); 