import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles, 
  Code, 
  Lightbulb,
  RotateCcw,
  Settings,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ChatResponse {
  message: string;
  error?: string;
}

interface CodeQuestion {
  title: string;
  description?: string;
  // Add other question properties as needed
}

interface AIChatbotProps {
  question: CodeQuestion;
  userCode: string;
  selectedLanguage: string;
  apiEndpoint?: string;
  systemPrompt?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  question,
  userCode,
  selectedLanguage,
  apiEndpoint = import.meta.env.VITE_PUBLIC_BACKEND_URL || '',
  systemPrompt = "You are a programming tutor. Provide hints and guidance, but don't give complete solutions unless specifically asked. Help students learn by understanding concepts."
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Comprehensive markdown to HTML converter
  const convertMarkdownToHtml = (text: string): string => {
    let html = text;

    // Handle code blocks first (before inline code)
    html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || '';
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto my-2"><code class="text-sm ${lang ? `language-${lang}` : ''}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Handle inline code (after code blocks)
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-sm">$1</code>');

    // Handle headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>');

    // Handle bold and italic (in correct order to avoid conflicts)
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Handle unordered lists
    html = html.replace(/^[•\-\*]\s+(.*)$/gim, '<li class="ml-4 mb-1">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-2">$1</ul>');

    // Handle numbered lists
    html = html.replace(/^\d+\.\s+(.*)$/gim, '<li class="ml-4 mb-1">$1</li>');
    
    // Clean up multiple consecutive list tags
    html = html.replace(/<\/ul>\s*<ul[^>]*>/g, '');
    html = html.replace(/<\/ol>\s*<ol[^>]*>/g, '');

    // Handle links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Handle line breaks (convert double newlines to paragraphs)
    html = html.replace(/\n\n/g, '</p><p class="mb-2">');
    html = `<p class="mb-2">${html}</p>`;

    // Clean up empty paragraphs
    html = html.replace(/<p[^>]*><\/p>/g, '');

    // Handle blockquotes
    html = html.replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-2">$1</blockquote>');

    // Handle horizontal rules
    html = html.replace(/^---$/gim, '<hr class="border-gray-300 my-4">');

    return html;
  };

  // Helper function to escape HTML
  const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chatbot with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      role: 'assistant',
      content: `Hello! I'm your AI programming tutor for **${question.title}**. I'm here to help you understand and solve this problem step by step.

**What I can help you with:**
• Understanding the problem requirements
• Breaking down the solution approach
• Analyzing your code and providing feedback
• Explaining concepts and algorithms
• Giving progressive hints when you're stuck

**How to use me:**
• Ask questions about the problem
• Share your code for analysis
• Request hints at different levels
• Ask for explanations of concepts

What would you like to start with?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [question.title]);

  // Fixed API call function that properly sends messages
  const sendMessageToAPI = async (messages: ChatMessage[]): Promise<string> => {
    try {
      // Find the first user message and start conversation from there
      const firstUserMessageIndex = messages.findIndex(msg => msg.role === 'user');
      
      if (firstUserMessageIndex === -1) {
        throw new Error('No user messages found in conversation');
      }

      // Only include messages from the first user message onwards
      const conversationMessages = messages.slice(firstUserMessageIndex);

      // Prepare messages for API
      const messagesToSend = conversationMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Add system prompt at the beginning if it exists
      if (systemPrompt) {
        messagesToSend.unshift({ role: 'system' as any, content: systemPrompt });
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesToSend
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      // Handle different possible response formats
      if (data.message) return data.message;
      if (data.response) return data.response;
      if (data.content) return data.content;
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content; // OpenAI format
      }
      
      throw new Error('Invalid response format from API');
      
    } catch (error) {
      console.error('API Error:', error);
      
      // Re-throw the error to be handled by the calling function
      throw new Error(
        error instanceof Error 
          ? `API Error: ${error.message}` 
          : 'Failed to connect to AI service'
      );
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAPI(updatedMessages);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `❌ ${error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeCode = async () => {
    if (isLoading || !userCode.trim()) return;
    
    const analysisPrompt = `Please analyze this ${selectedLanguage} code for the problem "${question.title}":

\`\`\`${selectedLanguage}
${userCode}
\`\`\`

Please provide feedback on:
- Code correctness and logic
- Potential improvements
- Best practices
- Any issues or bugs you notice`;

    await sendMessage(analysisPrompt);
  };

  const handleGetHint = async () => {
    if (isLoading) return;
    
    const hintLevel = Math.floor(messages.filter(m => m.role === 'user').length / 2); // Simple hint progression
    const hintPrompt = `Can you give me a progressive hint (level ${hintLevel + 1}) for solving "${question.title}"? Please don't give away the complete solution, just guide me in the right direction.`;
    
    await sendMessage(hintPrompt);
  };

  const handleResetChat = () => {
    const welcomeMessage: ChatMessage = {
      role: 'assistant',
      content: `Hello! I'm your AI programming tutor for **${question.title}**. How can I help you today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const quickActions = [
    {
      label: 'Analyze My Code',
      icon: <Code className="h-4 w-4" />,
      action: handleAnalyzeCode,
      description: 'Get feedback on your current code'
    },
    {
      label: 'Get a Hint',
      icon: <Lightbulb className="h-4 w-4" />,
      action: handleGetHint,
      description: 'Receive a progressive hint'
    },
    {
      label: 'Explain the Problem',
      icon: <Bot className="h-4 w-4" />,
      action: () => sendMessage('Can you explain this problem in detail?'),
      description: 'Get a detailed problem explanation'
    },
    {
      label: 'Show Approach',
      icon: <Sparkles className="h-4 w-4" />,
      action: () => sendMessage('What approach should I take to solve this problem?'),
      description: 'Learn the solution strategy'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">AI Tutor</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Powered by AI</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetChat}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Reset chat"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              disabled={isLoading}
              className="flex items-center space-x-2 p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
            >
              {action.icon}
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                
                <div className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    <div 
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ 
                        __html: convertMarkdownToHtml(message.content)
                      }}
                    />
                  </div>
                  {message.timestamp && (
                    <div className={`text-xs mt-1 opacity-70 ${
                      message.role === 'user' ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">AI is thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about this problem..."
            className="flex-1 p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};