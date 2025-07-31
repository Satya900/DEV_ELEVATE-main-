# AI Chatbot Troubleshooting Guide

## ❌ Error: Request failed with status code 401

This error means the OpenAI API key is invalid or not properly configured. Follow these steps to fix it:

## 🔧 **Step-by-Step Fix**

### **1. Run the Setup Script**
```bash
cd server
npm run setup
```

This will create the `.env` file if it doesn't exist.

### **2. Get a Valid OpenAI API Key**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (it should start with `sk-`)
5. Make sure you have sufficient credits in your account

### **3. Configure the API Key**
1. Open `server/.env` file
2. Replace `your-openai-api-key-here` with your actual API key:
```bash
OPENAI_API_KEY=sk-your-actual-key-here
```

### **4. Test the API Key**
```bash
# Start the server
npm run dev

# In another terminal, test the API key
curl http://localhost:3001/api/test
```

You should see:
```json
{
  "success": true,
  "message": "API key is valid",
  "models": 123
}
```

### **5. Start Both Servers**
```bash
# Terminal 1: Backend server
cd server
npm run dev

# Terminal 2: Frontend
npm run dev
```

## 🚨 **Common Issues & Solutions**

### **Issue 1: "API key is valid" but still getting 401**
- **Cause**: API key might be expired or revoked
- **Solution**: Generate a new API key from OpenAI platform

### **Issue 2: "No API key found"**
- **Cause**: `.env` file not created or API key not set
- **Solution**: Run `npm run setup` and configure the key

### **Issue 3: "Insufficient credits"**
- **Cause**: OpenAI account has no credits
- **Solution**: Add credits to your OpenAI account

### **Issue 4: "Rate limit exceeded"**
- **Cause**: Too many requests in a short time
- **Solution**: Wait a few minutes and try again

### **Issue 5: "Network error"**
- **Cause**: Backend server not running
- **Solution**: Make sure backend is running on port 3001

## 🔍 **Debug Steps**

### **1. Check Server Logs**
When you start the server, you should see:
```
✅ OpenAI API key configured
🚀 Chatbot API server running on port 3001
🔗 Test your API key: http://localhost:3001/api/test
```

If you see "❌ ERROR: OpenAI API key not configured!", the key is not set properly.

### **2. Test API Key Manually**
```bash
curl -X GET "https://api.openai.com/v1/models" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE"
```

Replace `YOUR_API_KEY_HERE` with your actual key.

### **3. Check Environment Variables**
```bash
# On Windows
echo %OPENAI_API_KEY%

# On Mac/Linux
echo $OPENAI_API_KEY
```

### **4. Verify File Structure**
```
server/
├── .env                    # Your API key here
├── api/
│   └── chatbot.js         # Backend server
├── package.json
└── setup.js               # Setup script
```

## 🛠️ **Advanced Debugging**

### **Enable Detailed Logging**
Add this to `server/api/chatbot.js` for more detailed logs:

```javascript
// Add at the top of the file
const DEBUG = process.env.NODE_ENV === 'development';

// Add in the chatbot endpoint
if (DEBUG) {
  console.log('Request received:', {
    messagesCount: messages.length,
    firstMessage: messages[0]?.content?.substring(0, 100) + '...'
  });
}
```

### **Check OpenAI API Status**
Visit [OpenAI Status Page](https://status.openai.com/) to ensure the API is working.

### **Verify Account Permissions**
Make sure your OpenAI account has:
- ✅ API access enabled
- ✅ Sufficient credits
- ✅ No restrictions on API usage

## 📞 **Getting Help**

If you're still having issues:

1. **Check the server logs** for detailed error messages
2. **Test your API key** using the `/api/test` endpoint
3. **Verify your OpenAI account** has sufficient credits
4. **Try generating a new API key** if the current one doesn't work

## 🔒 **Security Notes**

- Never commit your `.env` file to version control
- Keep your API key private and secure
- Monitor your OpenAI usage to avoid unexpected charges
- Consider setting up usage limits in your OpenAI dashboard 