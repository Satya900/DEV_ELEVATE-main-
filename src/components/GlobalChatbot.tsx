import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Code,
  Lightbulb
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface GlobalChatbotProps {
  position?: 'bottom-right' | 'bottom-left';
  theme?: 'light' | 'dark' | 'auto';
  apiEndpoint?: string;
  welcomeMessage?: string;
}

export const GlobalChatbot: React.FC<GlobalChatbotProps> = ({
  position = 'bottom-right',
  theme = 'auto',
  apiEndpoint =import.meta.env.VITE_PUBLIC_BACKEND_URL || '',
  welcomeMessage = "Hi! I'm your AI assistant. How can I help you today?"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      }]);
    }
  }, [welcomeMessage]);

  // Update unread count when chatbot is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setUnreadCount(prev => prev + 1);
      }
    } else if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  // Mock API call - replace with your actual API
  const sendMessageToAPI = async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses based on message content
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand what you're asking. Here's what I think...",
      "Based on your question, I'd recommend the following approach:",
      "That's an interesting problem. Let's break it down step by step.",
      "I can definitely help you with that! Here's my suggestion:",
      "Good point! Here's how you can approach this:",
      "I see what you mean. Here's a detailed explanation:",
      "That's a common question. Here's what you need to know:"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some context-aware responses
    if (message.toLowerCase().includes('code') || message.toLowerCase().includes('programming')) {
      return `${randomResponse} For coding questions, I can help you debug, explain concepts, or suggest best practices. What specific programming challenge are you facing?`;
    }
    
    if (message.toLowerCase().includes('help') || message.toLowerCase().includes('how')) {
      return `${randomResponse} I'm here to assist you with any questions or problems you might have. Feel free to be specific about what you need help with!`;
    }
    
    return `${randomResponse} Feel free to ask me anything else you'd like to know!`;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAPI(content);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const handleResetChat = () => {
    setMessages([{
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date()
    }]);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const quickActions = [
    {
      label: 'Help me code',
      icon: <Code className="h-3 w-3" />,
      action: () => sendMessage('I need help with coding. Can you assist me?')
    },
    {
      label: 'Explain something',
      icon: <HelpCircle className="h-3 w-3" />,
      action: () => sendMessage('Can you explain a concept to me?')
    },
    {
      label: 'Give me ideas',
      icon: <Lightbulb className="h-3 w-3" />,
      action: () => sendMessage('I need some creative ideas. Can you help?')
    },
    {
      label: 'General help',
      icon: <Sparkles className="h-3 w-3" />,
      action: () => sendMessage('I need some general assistance.')
    }
  ];

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-all duration-300 ${
          isMinimized ? 'h-12' : 'h-96'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <p className="text-xs opacity-80">Online</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Reset chat"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        disabled={isLoading}
                        className="flex items-center space-x-2 p-2 text-xs bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {action.icon}
                        <span className="font-medium truncate">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {message.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                      </div>
                      
                      <div className={`p-3 rounded-2xl text-sm ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md'
                      }`}>
                        <div className="whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                        {message.timestamp && (
                          <div className={`text-xs mt-1 opacity-70 ${
                            message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <Bot className="h-3 w-3 text-gray-700 dark:text-gray-300" />
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white max-h-20"
                    rows={1}
                    disabled={isLoading}
                    style={{ minHeight: '36px' }}
                  />
                  <button
                    onClick={() => sendMessage(inputMessage)}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChatbot}
        className={`w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'scale-90' : 'scale-100 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </>
        )}
      </button>
    </div>
  );
};