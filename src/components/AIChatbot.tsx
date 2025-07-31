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
import { ChatMessage, ChatResponse, analyzeUserCode, getProgressiveHint, sendMessageToChatbot as sendMessageToChatbotService } from '../services/chatbotService';
import { CodeQuestion } from '../types/questions';

interface AIChatbotProps {
  question: CodeQuestion;
  userCode: string;
  selectedLanguage: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  question,
  userCode,
  selectedLanguage
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

What would you like to start with?`
    };
    setMessages([welcomeMessage]);
  }, [question.title]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const allMessages = [...messages, userMessage];
      const response = await sendMessageToChatbot(allMessages);
      
      if (response.error) {
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: `❌ **Error**: ${response.error}`
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.message
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '❌ **Error**: Failed to get response. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageToChatbot = async (messages: ChatMessage[]): Promise<ChatResponse> => {
    // Use the service that calls our backend API
    return await sendMessageToChatbotService(messages);
  };

  const handleAnalyzeCode = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await analyzeUserCode(question, userCode, selectedLanguage);
      
      if (response.error) {
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: `❌ **Error**: ${response.error}`
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.message
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '❌ **Error**: Failed to analyze code. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetHint = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const hintLevel = Math.floor(messages.length / 2); // Simple hint progression
      const response = await getProgressiveHint(question, hintLevel);
      
      if (response.error) {
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: `❌ **Error**: ${response.error}`
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: `💡 **Hint ${hintLevel + 1}**: ${response.message}`
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '❌ **Error**: Failed to get hint. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([{
      role: 'assistant',
      content: `Hello! I'm your AI programming tutor for **${question.title}**. How can I help you today?`
    }]);
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
            <p className="text-xs text-gray-500 dark:text-gray-400">Powered by ChatGPT</p>
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
                        __html: message.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1 rounded">$1</code>')
                      }}
                    />
                  </div>
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