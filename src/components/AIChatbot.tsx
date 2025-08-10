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
  AlertCircle,
  Brain,
  Code2,
  Zap,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, ChatResponse, analyzeUserCode, getProgressiveHint, sendMessageToChatbot as sendMessageToChatbotService } from '../services/chatbotService';
import { CodeQuestion } from '../types/questions';

interface AIChatbotProps {
  question: CodeQuestion;
  userCode: string;
  selectedLanguage: string;
}

interface EnhancedMessage extends ChatMessage {
  isComplete?: boolean;
  displayText?: string;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  question,
  userCode,
  selectedLanguage
}) => {
  const [messages, setMessages] = useState<EnhancedMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  // Handle manual scrolling to disable auto-scroll
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    
    setAutoScroll(isAtBottom);
  };

  // Typing animation effect
  useEffect(() => {
    if (currentTypingIndex >= 0 && currentTypingIndex < messages.length) {
      const message = messages[currentTypingIndex];
      if (message.role === 'assistant' && !message.isComplete) {
        const fullText = message.content;
        const currentText = message.displayText || '';

        if (currentText.length < fullText.length) {
          const timeoutId = setTimeout(() => {
            setMessages(prev =>
              prev.map((msg, index) => {
                if (index === currentTypingIndex) {
                  return {
                    ...msg,
                    displayText: fullText.slice(0, currentText.length + 1)
                  };
                }
                return msg;
              })
            );
          }, 25);

          return () => clearTimeout(timeoutId);
        } else {
          setMessages(prev =>
            prev.map((msg, index) => {
              if (index === currentTypingIndex) {
                return {
                  ...msg,
                  isComplete: true,
                  displayText: fullText
                };
              }
              return msg;
            })
          );
          setCurrentTypingIndex(-1);
          setIsTyping(false);
          setAutoScroll(true);
          setTimeout(() => setIsAiGenerating(false), 100); // Always reset isAiGenerating after typing
        }
      }
    } else {
      // If no typing is happening, make sure isAiGenerating is not stuck
      setIsAiGenerating(false);
    }
  }, [messages, currentTypingIndex]);

  // Initialize chatbot with welcome message
  useEffect(() => {
    const welcomeMessage: EnhancedMessage = {
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
      isComplete: true,
      displayText: ''
    };
    setMessages([welcomeMessage]);
  }, [question.title]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isAiGenerating) return;

    const userMessage: EnhancedMessage = {
      role: 'user',
      content: content.trim(),
      isComplete: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setIsAiGenerating(true);
    setAutoScroll(true);

    try {
      const allMessages = [...messages, userMessage];
      const response = await sendMessageToChatbot(allMessages);
      
      if (response.error) {
        const errorMessage: EnhancedMessage = {
          role: 'assistant',
          content: `❌ **Error**: ${response.error}`,
          isComplete: false,
          displayText: ''
        };
        setMessages(prev => [...prev, errorMessage]);
        setCurrentTypingIndex(messages.length + 1);
      } else {
        const assistantMessage: EnhancedMessage = {
          role: 'assistant',
          content: response.message,
          isComplete: false,
          displayText: ''
        };
        setMessages(prev => [...prev, assistantMessage]);
        setCurrentTypingIndex(messages.length + 1);
      }
    } catch (error) {
      const errorMessage: EnhancedMessage = {
        role: 'assistant',
        content: '❌ **Error**: Failed to get response. Please try again.',
        isComplete: false,
        displayText: ''
      };
      setMessages(prev => [...prev, errorMessage]);
      setCurrentTypingIndex(messages.length + 1);
      setIsAiGenerating(false);
    }
  };

  const sendMessageToChatbot = async (messages: ChatMessage[]): Promise<ChatResponse> => {
    return await sendMessageToChatbotService(messages);
  };

  const handleAnalyzeCode = async () => {
    if (isAiGenerating) return;
    
    setIsAiGenerating(true);
    try {
      const response = await analyzeUserCode(question, userCode, selectedLanguage);
      
      if (response.error) {
        const errorMessage: EnhancedMessage = {
          role: 'assistant',
          content: `❌ **Error**: ${response.error}`,
          isComplete: false,
          displayText: ''
        };
        setMessages(prev => [...prev, errorMessage]);
        setCurrentTypingIndex(messages.length + 1);
      } else {
        const assistantMessage: EnhancedMessage = {
          role: 'assistant',
          content: response.message,
          isComplete: false,
          displayText: ''
        };
        setMessages(prev => [...prev, assistantMessage]);
        setCurrentTypingIndex(messages.length + 1);
      }
    } catch (error) {
      const errorMessage: EnhancedMessage = {
        role: 'assistant',
        content: '❌ **Error**: Failed to analyze code. Please try again.',
        isComplete: false,
        displayText: ''
      };
      setMessages(prev => [...prev, errorMessage]);
      setCurrentTypingIndex(messages.length + 1);
      setIsAiGenerating(false);
    }
  };

  const handleGetHint = async () => {
    if (isAiGenerating) return;
    
    setIsAiGenerating(true);
    try {
      const hintLevel = Math.floor(messages.length / 2);
      const response = await getProgressiveHint(question, hintLevel);
      
      if (response.error) {
        const errorMessage: EnhancedMessage = {
          role: 'assistant',
          content: `❌ **Error**: ${response.error}`,
          isComplete: false,
          displayText: ''
        };
        setMessages(prev => [...prev, errorMessage]);
        setCurrentTypingIndex(messages.length + 1);
      } else {
        const assistantMessage: EnhancedMessage = {
          role: 'assistant',
          content: `💡 **Hint ${hintLevel + 1}**: ${response.message}`,
          isComplete: false,
          displayText: ''
        };
        setMessages(prev => [...prev, assistantMessage]);
        setCurrentTypingIndex(messages.length + 1);
      }
    } catch (error) {
      const errorMessage: EnhancedMessage = {
        role: 'assistant',
        content: '❌ **Error**: Failed to get hint. Please try again.',
        isComplete: false,
        displayText: ''
      };
      setMessages(prev => [...prev, errorMessage]);
      setCurrentTypingIndex(messages.length + 1);
      setIsAiGenerating(false);
    }
  };

  const handleResetChat = () => {
    setMessages([{
      role: 'assistant',
      content: `Hello! I'm your AI programming tutor for **${question.title}**. How can I help you today?`,
      isComplete: true,
      displayText: ''
    }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isAiGenerating) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const quickActions = [
    {
      label: 'Analyze My Code',
      icon: <Code2 className="h-4 w-4" />,
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
      icon: <Brain className="h-4 w-4" />,
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
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl border border-orange-500/20 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23f97316" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400/10 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 py-5 bg-black/40 backdrop-blur-md border-b border-orange-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                isAiGenerating ? 'bg-orange-400 animate-pulse' : 'bg-green-400 animate-ping'
              }`}></div>
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                isAiGenerating ? 'bg-orange-400' : 'bg-green-400'
              }`}></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                AI Programming Tutor
              </h3>
              <p className="text-sm text-gray-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-orange-400" />
                {isAiGenerating ? 'Generating response...' : 'Ready to help you solve coding challenges'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetChat}
              className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
              title="Reset chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && !isAiGenerating && (
        <div className="relative z-10 px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-orange-500/10">
          <p className="text-gray-400 text-sm mb-3">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                disabled={isAiGenerating}
                className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-xs transition-all duration-200 ${
                  isAiGenerating 
                    ? 'bg-gray-500/10 border-gray-500/30 text-gray-500 cursor-not-allowed' 
                    : 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30 text-orange-300 hover:scale-105'
                }`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 scrollbar-thin scrollbar-thumb-orange-500/50 scrollbar-track-transparent"
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-start space-x-4 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/25' 
                  : 'bg-gradient-to-br from-gray-700 to-gray-800 border border-orange-500/30 shadow-orange-500/10'
              }`}>
                {message.role === 'user' ? (
                  <User className="text-white w-5 h-5" />
                ) : (
                  <Bot className="text-orange-400 w-5 h-5" />
                )}
              </div>
              
              <div className="max-w-[75%] relative group">
                <div className={`px-5 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-orange-500/20'
                    : 'bg-black/40 backdrop-blur-md text-gray-100 border border-orange-500/20 shadow-orange-500/5'
                }`}>
                  {/* Message background pattern for AI */}
                  {message.role === 'assistant' && (
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="prose prose-sm max-w-none relative z-10">
                    <div 
                      className="whitespace-pre-wrap leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: (message.role === 'assistant' ? (message.displayText || message.content) : message.content)
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-300">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em class="text-orange-200">$1</em>')
                          .replace(/`(.*?)`/g, '<code class="bg-orange-500/20 px-1 rounded text-orange-200">$1</code>')
                          .replace(/•/g, '<span class="text-orange-400">•</span>')
                      }}
                    />
                    {message.role === 'assistant' && !message.isComplete && (
                      <span className="inline-block w-0.5 h-4 bg-orange-400 ml-1 animate-pulse"></span>
                    )}
                  </div>
                  
                  {/* Subtle glow effect */}
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-orange-400/20 to-amber-500/20 opacity-0 group-hover:opacity-100'
                      : 'bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100'
                  }`}></div>
                </div>
                
                {/* Message timestamp */}
                <div className={`text-xs text-gray-500 mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && currentTypingIndex === -1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-4"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-gray-700 to-gray-800 border border-orange-500/30">
              <Bot className="text-orange-400 w-5 h-5" />
            </div>
            <div className="bg-black/40 backdrop-blur-md px-5 py-4 rounded-2xl border border-orange-500/20">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-orange-300 text-xs ml-2">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {!autoScroll && (
        <div className="absolute bottom-24 right-6 z-20">
          <button
            onClick={() => {
              setAutoScroll(true);
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            ↓
          </button>
        </div>
      )}

      {/* Input Section */}
      <div className="relative z-10 bg-black/60 backdrop-blur-md p-4 border-t border-orange-500/20">
        <div className="flex items-end gap-3">
          <div className="relative flex-1">
            <div className="absolute left-4 bottom-4 text-orange-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full bg-black/40 border pl-12 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 resize-none min-h-[48px] max-h-32 scrollbar-thin scrollbar-thumb-orange-500/50 scrollbar-track-transparent ${
                isAiGenerating 
                  ? 'border-gray-500/30 bg-gray-500/10 cursor-not-allowed' 
                  : 'border-orange-500/30'
              }`}
              placeholder={isAiGenerating ? "Please wait for AI to finish..." : "Ask me anything about this problem..."}
              rows={1}
              disabled={isAiGenerating}
              style={{ 
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23f97316" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')`,
                backgroundSize: '20px 20px',
                backgroundBlendMode: 'overlay'
              }}
            />
            
            {/* Input glow effect */}
            <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
              isAiGenerating 
                ? 'bg-gradient-to-r from-gray-500/10 to-gray-500/10 opacity-100' 
                : 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 focus-within:opacity-100'
            }`}></div>
          </div>
          
          <button
            onClick={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isAiGenerating}
            className={`group relative w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg transition-all duration-300 overflow-hidden ${
              isAiGenerating 
                ? 'bg-gray-500 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-br from-orange-500 to-amber-600 shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95'
            }`}
          >
            {/* Button background animation */}
            {!isAiGenerating && (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            
            {isAiGenerating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
            )}
            
            {/* Ripple effect */}
            {!isAiGenerating && (
              <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150 rounded-xl"></div>
            )}
          </button>
        </div>
        
        {isAiGenerating && (
          <p className="text-orange-400 text-xs mt-2 flex items-center gap-1">
            <span className="w-1 h-1 bg-orange-400 rounded-full animate-pulse"></span>
            AI is generating response, please wait...
          </p>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #f59e0b);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        /* Custom animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
          50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.5); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}; 