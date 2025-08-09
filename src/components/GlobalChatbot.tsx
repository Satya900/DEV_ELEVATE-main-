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
  systemPrompt?: string;
}

export const GlobalChatbot: React.FC<GlobalChatbotProps> = ({
  position = 'bottom-right',
  theme = 'auto',
  apiEndpoint = import.meta.env.VITE_PUBLIC_BACKEND_URL || '',
  welcomeMessage = "Hi! I'm your AI assistant. How can I help you today?",
  systemPrompt = "Provide hints and guidance, but don't give complete solutions unless specifically asked"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Comprehensive markdown to HTML converter
  const convertMarkdownToHtml = (text: string): string => {
    let html = text;

    // Handle code blocks first (before inline code)
    html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || '';
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto my-2"><code class="text-xs ${lang ? `language-${lang}` : ''}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Handle inline code (after code blocks)
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs">$1</code>');

    // Handle headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-sm font-semibold mt-3 mb-1">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-base font-semibold mt-3 mb-1">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold mt-3 mb-1">$1</h1>');

    // Handle bold and italic (in correct order to avoid conflicts)
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Handle unordered lists
    html = html.replace(/^[•\-\*]\s+(.*)$/gim, '<li class="ml-3 mb-1 text-xs">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside my-2">$1</ul>');

    // Handle numbered lists
    html = html.replace(/^\d+\.\s+(.*)$/gim, '<li class="ml-3 mb-1 text-xs">$1</li>');
    
    // Clean up multiple consecutive list tags
    html = html.replace(/<\/ul>\s*<ul[^>]*>/g, '');
    html = html.replace(/<\/ol>\s*<ol[^>]*>/g, '');

    // Handle links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Handle line breaks (convert double newlines to paragraphs)
    html = html.replace(/\n\n/g, '</p><p class="mb-1">');
    html = `<p class="mb-1">${html}</p>`;

    // Clean up empty paragraphs
    html = html.replace(/<p[^>]*><\/p>/g, '');

    // Handle blockquotes
    html = html.replace(/^> (.*)$/gim, '<blockquote class="border-l-2 border-gray-300 pl-2 italic my-1 text-xs">$1</blockquote>');

    // Handle horizontal rules
    html = html.replace(/^---$/gim, '<hr class="border-gray-300 my-2">');

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

  // Initialize with welcome message and system prompt
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date()
        }
      ]);
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

  // Real API call that sends the full message array with roles
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
                        <div 
                          className="whitespace-pre-wrap break-words"
                          dangerouslySetInnerHTML={{ 
                            __html: convertMarkdownToHtml(message.content)
                          }}
                        />
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