const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Your OpenAI API key - store this securely in production
const OPENAI_API_KEY = "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";

// Validate API key on startup
if (!OPENAI_API_KEY || OPENAI_API_KEY === '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') {
  console.error('❌ ERROR: OpenAI API key not configured!');
  console.error('Please set your OPENAI_API_KEY in the .env file');
  console.error('Get your API key from: https://platform.openai.com/api-keys');
  process.exit(1);
}

console.log('✅ OpenAI API key configured');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

app.post('/api/chatbot', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Messages array is required' 
      });
    }

    // Call OpenAI API
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const assistantMessage = response.data.choices[0]?.message?.content;
    
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
    
    if (error.response?.status === 401) {
      console.error('❌ 401 Error: Invalid or missing OpenAI API key');
      res.status(401).json({
        error: 'Invalid API key. Please check your OpenAI API key configuration.',
      });
    } else if (error.response?.status === 429) {
      res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.',
      });
    } else if (error.response?.status >= 500) {
      res.status(500).json({
        error: 'Server error. Please try again later.',
      });
    } else {
      res.status(500).json({
        error: error.message || 'Failed to get response from AI assistant.',
      });
    }
  }
});

// Test endpoint to verify API key
app.get('/api/test', async (req, res) => {
  try {
    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });
    
    res.json({
      success: true,
      message: 'API key is valid',
      models: response.data.data.length
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