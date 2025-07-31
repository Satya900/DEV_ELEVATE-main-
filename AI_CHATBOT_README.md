# AI Chatbot for Question Solving

This implementation adds an AI-powered chatbot to the question solving page that provides contextual help for each specific programming problem using the ChatGPT API. The system uses a secure backend server to handle API calls, so users don't need to manage their own API keys.

## 🚀 Features

### **AI Tutor Integration**
- **Question-Specific Context**: The AI is trained on the specific problem being solved
- **Interactive Chat Interface**: Real-time conversation with the AI tutor
- **Code Analysis**: AI can analyze user code and provide feedback
- **Progressive Hints**: AI provides hints at different levels of detail
- **Multiple Languages**: Support for Python, JavaScript, Java, C++, and C
- **Secure Backend**: Server-side API key management for security

### **Smart Features**
- **Contextual Responses**: AI understands the specific problem requirements
- **Code Feedback**: Analyzes user code for bugs and improvements
- **Learning-Focused**: Teaches problem-solving approach, not just answers
- **Progressive Assistance**: Provides hints that become more specific as needed

## 🏗️ Architecture

### **Components Structure**
```
Frontend (React)
├── QuestionSolvingPage
│   └── AIChatbot (replaces hints section)
│       ├── Chat Interface
│       ├── Quick Actions
│       ├── Message History
│       └── Input Area

Backend (Express.js)
├── /api/chatbot endpoint
├── OpenAI API integration
├── Error handling
└── Security management
```

### **Services**
- **chatbotService.ts**: Frontend service for API communication
- **server/api/chatbot.js**: Backend API endpoint
- **Question Context Creation**: Builds problem-specific prompts
- **Code Analysis**: Specialized functions for code review
- **Progressive Hints**: Level-based hint system

## 🔧 Setup Instructions

### **1. Backend Setup**

#### **Install Dependencies**
```bash
cd server
npm install
```

#### **Configure Environment**
1. Copy `env.example` to `.env`
2. Add your OpenAI API key:
```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
```

#### **Start the Backend Server**
```bash
npm run dev
```
The server will run on `http://localhost:3001`

### **2. Frontend Setup**

#### **Start the Frontend**
```bash
# In the root directory
npm run dev
```
The frontend will run on `http://localhost:5173` and proxy API calls to the backend.

### **3. Usage**
1. Navigate to any coding question
2. Click the "AI Tutor" tab (replaces the hints section)
3. Start chatting with the AI about the problem
4. Use quick actions for common requests

## 🎯 How It Works

### **Question Context Creation**
The AI is provided with comprehensive context about the specific problem:

```typescript
const context = `
PROBLEM CONTEXT:
Title: ${question.title}
Difficulty: ${question.difficulty}
Description: ${question.description}
Examples: ${question.examples}
Constraints: ${question.constraints}
Expected Time Complexity: ${question.timeComplexity}
Expected Space Complexity: ${question.spaceComplexity}

INSTRUCTIONS:
1. You are ONLY helping with this specific problem
2. Provide hints and guidance, don't give complete solutions
3. Explain concepts clearly and step-by-step
4. Analyze code and provide constructive feedback
5. Help identify bugs and suggest improvements
6. Focus on teaching the problem-solving approach
`;
```

### **API Flow**
```
Frontend → Backend API → OpenAI API → Response → Frontend
```

1. **Frontend**: Sends chat messages to `/api/chatbot`
2. **Backend**: Validates request and forwards to OpenAI
3. **OpenAI**: Processes the request with context
4. **Backend**: Receives response and sends back to frontend
5. **Frontend**: Displays AI response in chat interface

### **AI Training Instructions**
The AI is specifically instructed to:
- **Stay Focused**: Only help with the current problem
- **Guide Learning**: Provide hints, not complete solutions
- **Analyze Code**: Review user code for issues and improvements
- **Explain Concepts**: Teach the underlying logic and approach
- **Be Encouraging**: Support the learning process

### **Quick Actions**
The chatbot provides quick action buttons for common requests:
- **Analyze My Code**: Get feedback on current code
- **Get a Hint**: Receive a progressive hint
- **Explain the Problem**: Get detailed problem explanation
- **Show Approach**: Learn the solution strategy

## 🔒 Security & Privacy

### **API Key Security**
- **Server-Side Storage**: API key is stored securely on the backend
- **No Client Exposure**: API key never leaves the server
- **Environment Variables**: Secure configuration management
- **Request Validation**: Input validation and sanitization

### **Data Privacy**
- **No Logging**: Chat messages are not stored
- **Temporary Context**: Question context is only used for the current session
- **User Control**: Users can reset chat history anytime
- **Secure Communication**: HTTPS in production

## 💡 Usage Examples

### **Getting Started**
```
User: "Can you explain this problem?"
AI: "This problem asks you to find the sum of two numbers. You're given two integers as input and need to return their sum. The key points are..."

User: "What approach should I take?"
AI: "For this problem, you can use a simple addition approach. Think about how you would add two numbers manually..."
```

### **Code Analysis**
```
User: [Analyzes code button]
AI: "Looking at your code, I can see you're on the right track! A few observations:
1. Your function structure is good
2. You're correctly handling the input
3. Consider what happens with edge cases like..."
```

### **Progressive Hints**
```
User: "I'm stuck, can you give me a hint?"
AI: "💡 Hint 1: Think about what operation you need to perform on the two input numbers..."

User: "I need more help"
AI: "💡 Hint 2: Consider using the + operator to combine the two values..."
```

## 🛠️ Technical Implementation

### **Key Files**
- `src/components/AIChatbot.tsx`: Main chatbot component
- `src/services/chatbotService.ts`: Frontend API service
- `server/api/chatbot.js`: Backend API endpoint
- `src/pages/QuestionSolvingPage.tsx`: Integration point
- `vite.config.ts`: Proxy configuration

### **Backend API**
```javascript
// Express.js endpoint
app.post('/api/chatbot', async (req, res) => {
  const { messages } = req.body;
  
  // Call OpenAI API with server-side key
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  res.json({ message: response.data.choices[0].message.content });
});
```

### **Frontend Service**
```typescript
// Frontend service calls backend API
export const sendMessageToChatbot = async (messages: ChatMessage[]) => {
  const response = await axios.post('/api/chatbot', { messages });
  return { message: response.data.message };
};
```

### **Error Handling**
- **Invalid Requests**: Input validation and error responses
- **Rate Limiting**: Graceful handling of API limits
- **Network Issues**: Retry logic and user feedback
- **Server Errors**: Fallback responses and logging

## 🎨 UI/UX Features

### **Chat Interface**
- **Message Bubbles**: Clear distinction between user and AI messages
- **Loading States**: Animated indicators during AI processing
- **Auto-scroll**: Automatic scrolling to latest messages
- **Markdown Support**: Rich text formatting in responses

### **Quick Actions**
- **Grid Layout**: Easy-to-access action buttons
- **Icons**: Visual representation of each action
- **Disabled States**: Proper handling during loading

## 🔮 Future Enhancements

### **Planned Features**
- **Conversation History**: Save chat sessions to database
- **Code Snippets**: Share code examples in chat
- **Voice Input**: Speech-to-text for questions
- **Multi-language Support**: Chat in different languages
- **Advanced Analytics**: Track learning progress

### **AI Improvements**
- **Custom Models**: Fine-tuned models for programming
- **Context Memory**: Remember previous conversations
- **Adaptive Hints**: Hints that adapt to user skill level
- **Code Generation**: Generate starter code templates

## 🚨 Important Notes

### **API Costs**
- **Usage Monitoring**: Monitor your OpenAI API usage
- **Cost Control**: Set usage limits in OpenAI dashboard
- **Efficient Prompts**: Optimized prompts to reduce token usage

### **Best Practices**
- **Secure Environment**: Keep your API key in environment variables
- **Monitor Usage**: Check your OpenAI billing regularly
- **Use Responsibly**: The AI is for learning, not cheating
- **Combine with Practice**: Use AI guidance alongside hands-on practice

## 🐛 Troubleshooting

### **Common Issues**
1. **"Server Error"**: Check if backend server is running
2. **"Rate Limit Exceeded"**: Wait a moment and try again
3. **"No Response"**: Check your internet connection
4. **"Invalid API Key"**: Verify your OpenAI API key in server/.env

### **Development Setup**
1. **Start Backend**: `cd server && npm run dev`
2. **Start Frontend**: `npm run dev` (in root directory)
3. **Check Proxy**: Ensure Vite proxy is configured correctly
4. **Environment**: Verify .env file has correct API key

### **Production Deployment**
1. **Environment Variables**: Set OPENAI_API_KEY in production
2. **HTTPS**: Use HTTPS for secure communication
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Monitoring**: Add logging and monitoring for API usage

---

This AI chatbot implementation provides a powerful, context-aware learning assistant that helps students understand and solve programming problems while maintaining focus on the learning process rather than just getting answers. The server-side architecture ensures security and ease of use for all users. 