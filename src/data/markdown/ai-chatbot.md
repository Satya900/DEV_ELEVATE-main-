# AI Chatbot Platform

An intelligent conversational AI platform with natural language processing, machine learning capabilities, and multi-channel deployment options.

## Overview

This AI chatbot platform provides businesses with sophisticated conversational AI capabilities, featuring natural language understanding, context awareness, and seamless integration across multiple communication channels. Built with Python, TensorFlow, and modern web technologies.

## Key Features

### AI Capabilities
- **Natural Language Processing**: Advanced NLP with intent recognition and entity extraction
- **Context Awareness**: Maintains conversation context across multiple interactions
- **Multi-language Support**: Supports 20+ languages with automatic translation
- **Sentiment Analysis**: Real-time emotion detection and response adaptation
- **Learning System**: Continuous learning from user interactions
- **Custom Training**: Train on domain-specific data and knowledge bases

### Platform Features
- **Multi-channel Deployment**: Web, mobile, Slack, WhatsApp, Facebook Messenger
- **Analytics Dashboard**: Comprehensive conversation analytics and insights
- **A/B Testing**: Test different conversation flows and responses
- **Integration APIs**: Connect with CRM, helpdesk, and business systems
- **Live Handoff**: Seamless transfer to human agents when needed
- **Customizable UI**: White-label chat widgets and interfaces

## Technology Stack

### Backend Architecture
```python
# main.py - Flask application with TensorFlow integration
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
import tensorflow as tf
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import spacy
import redis
import logging

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
socketio = SocketIO(app, cors_allowed_origins="*")

# Load pre-trained models
nlp = spacy.load("en_core_web_sm")
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForSequenceClassification.from_pretrained("microsoft/DialoGPT-medium")

# Redis for session management
redis_client = redis.Redis(host='localhost', port=6379, db=0)

class ChatbotEngine:
    def __init__(self):
        self.intent_classifier = self.load_intent_model()
        self.entity_extractor = self.load_entity_model()
        self.response_generator = self.load_response_model()
        self.context_manager = ContextManager()
    
    def load_intent_model(self):
        """Load pre-trained intent classification model"""
        model = tf.keras.models.load_model('models/intent_classifier.h5')
        return model
    
    def load_entity_model(self):
        """Load named entity recognition model"""
        return spacy.load("models/entity_model")
    
    def load_response_model(self):
        """Load response generation model"""
        return tf.keras.models.load_model('models/response_generator.h5')
    
    def process_message(self, message, user_id, session_id):
        """Main message processing pipeline"""
        try:
            # Preprocess message
            processed_message = self.preprocess_message(message)
            
            # Extract intent and entities
            intent = self.classify_intent(processed_message)
            entities = self.extract_entities(processed_message)
            
            # Get conversation context
            context = self.context_manager.get_context(session_id)
            
            # Generate response
            response = self.generate_response(intent, entities, context, processed_message)
            
            # Update context
            self.context_manager.update_context(session_id, {
                'last_intent': intent,
                'last_entities': entities,
                'last_message': message,
                'last_response': response
            })
            
            # Log interaction
            self.log_interaction(user_id, session_id, message, response, intent)
            
            return {
                'response': response,
                'intent': intent,
                'entities': entities,
                'confidence': self.get_confidence_score(intent)
            }
            
        except Exception as e:
            logging.error(f"Error processing message: {str(e)}")
            return {
                'response': "I'm sorry, I encountered an error. Please try again.",
                'intent': 'error',
                'entities': [],
                'confidence': 0.0
            }
    
    def preprocess_message(self, message):
        """Clean and preprocess user message"""
        # Remove special characters, normalize text
        doc = nlp(message.lower().strip())
        
        # Remove stop words and lemmatize
        tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
        
        return ' '.join(tokens)
    
    def classify_intent(self, message):
        """Classify user intent using trained model"""
        # Tokenize and vectorize message
        sequence = self.tokenize_message(message)
        
        # Predict intent
        prediction = self.intent_classifier.predict(sequence)
        intent_index = np.argmax(prediction)
        
        # Map to intent label
        intent_labels = ['greeting', 'question', 'complaint', 'compliment', 'goodbye', 'help']
        return intent_labels[intent_index]
    
    def extract_entities(self, message):
        """Extract named entities from message"""
        doc = self.entity_extractor(message)
        
        entities = []
        for ent in doc.ents:
            entities.append({
                'text': ent.text,
                'label': ent.label_,
                'start': ent.start_char,
                'end': ent.end_char
            })
        
        return entities
    
    def generate_response(self, intent, entities, context, message):
        """Generate appropriate response based on intent and context"""
        
        # Rule-based responses for specific intents
        if intent == 'greeting':
            return self.get_greeting_response(context)
        elif intent == 'goodbye':
            return "Thank you for chatting with me! Have a great day!"
        elif intent == 'help':
            return self.get_help_response()
        
        # Use neural response generation for complex queries
        return self.neural_response_generation(message, context)
    
    def neural_response_generation(self, message, context):
        """Generate response using neural language model"""
        # Prepare input with context
        input_text = self.prepare_input_with_context(message, context)
        
        # Tokenize input
        inputs = tokenizer.encode(input_text, return_tensors='pt')
        
        # Generate response
        with tf.device('/GPU:0' if tf.config.list_physical_devices('GPU') else '/CPU:0'):
            outputs = model.generate(
                inputs,
                max_length=150,
                num_return_sequences=1,
                temperature=0.7,
                pad_token_id=tokenizer.eos_token_id
            )
        
        # Decode response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Post-process response
        return self.post_process_response(response)

class ContextManager:
    """Manages conversation context and memory"""
    
    def __init__(self):
        self.context_timeout = 1800  # 30 minutes
    
    def get_context(self, session_id):
        """Retrieve conversation context from Redis"""
        context_data = redis_client.get(f"context:{session_id}")
        
        if context_data:
            return json.loads(context_data)
        
        return {
            'conversation_history': [],
            'user_preferences': {},
            'current_topic': None,
            'entities_mentioned': []
        }
    
    def update_context(self, session_id, new_data):
        """Update conversation context"""
        context = self.get_context(session_id)
        
        # Update context with new data
        context.update(new_data)
        
        # Add to conversation history
        context['conversation_history'].append({
            'timestamp': datetime.now().isoformat(),
            'user_message': new_data.get('last_message'),
            'bot_response': new_data.get('last_response'),
            'intent': new_data.get('last_intent')
        })
        
        # Keep only last 10 exchanges
        context['conversation_history'] = context['conversation_history'][-10:]
        
        # Store updated context
        redis_client.setex(
            f"context:{session_id}",
            self.context_timeout,
            json.dumps(context)
        )

# Initialize chatbot engine
chatbot = ChatbotEngine()

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    data = request.json
    message = data.get('message', '')
    user_id = data.get('user_id', 'anonymous')
    session_id = data.get('session_id', str(uuid.uuid4()))
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    # Process message
    result = chatbot.process_message(message, user_id, session_id)
    
    return jsonify({
        'response': result['response'],
        'session_id': session_id,
        'intent': result['intent'],
        'confidence': result['confidence']
    })

@socketio.on('message')
def handle_message(data):
    """Handle real-time chat messages"""
    message = data.get('message', '')
    user_id = data.get('user_id', 'anonymous')
    session_id = data.get('session_id', str(uuid.uuid4()))
    
    # Process message
    result = chatbot.process_message(message, user_id, session_id)
    
    # Emit response
    emit('response', {
        'response': result['response'],
        'session_id': session_id,
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
```

### Training Pipeline
```python
# training/train_intent_classifier.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

class IntentClassifierTrainer:
    def __init__(self):
        self.tokenizer = Tokenizer(num_words=10000, oov_token='<OOV>')
        self.label_encoder = LabelEncoder()
        self.max_sequence_length = 50
        
    def load_training_data(self, file_path):
        """Load training data from CSV file"""
        df = pd.read_csv(file_path)
        
        # Expected columns: 'text', 'intent'
        texts = df['text'].values
        intents = df['intent'].values
        
        return texts, intents
    
    def preprocess_data(self, texts, intents):
        """Preprocess text data and encode labels"""
        # Fit tokenizer on texts
        self.tokenizer.fit_on_texts(texts)
        
        # Convert texts to sequences
        sequences = self.tokenizer.texts_to_sequences(texts)
        
        # Pad sequences
        X = pad_sequences(sequences, maxlen=self.max_sequence_length)
        
        # Encode labels
        y = self.label_encoder.fit_transform(intents)
        y = tf.keras.utils.to_categorical(y)
        
        return X, y
    
    def build_model(self, vocab_size, num_classes):
        """Build LSTM model for intent classification"""
        model = Sequential([
            Embedding(vocab_size, 128, input_length=self.max_sequence_length),
            LSTM(64, dropout=0.2, recurrent_dropout=0.2),
            Dense(32, activation='relu'),
            Dropout(0.5),
            Dense(num_classes, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def train(self, texts, intents, epochs=50, batch_size=32):
        """Train the intent classification model"""
        # Preprocess data
        X, y = self.preprocess_data(texts, intents)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Build model
        vocab_size = len(self.tokenizer.word_index) + 1
        num_classes = len(self.label_encoder.classes_)
        
        model = self.build_model(vocab_size, num_classes)
        
        # Train model
        history = model.fit(
            X_train, y_train,
            batch_size=batch_size,
            epochs=epochs,
            validation_data=(X_test, y_test),
            verbose=1
        )
        
        # Evaluate model
        test_loss, test_accuracy = model.evaluate(X_test, y_test, verbose=0)
        print(f"Test Accuracy: {test_accuracy:.4f}")
        
        # Save model and tokenizer
        model.save('models/intent_classifier.h5')
        
        return model, history

# Training script
if __name__ == "__main__":
    trainer = IntentClassifierTrainer()
    
    # Load training data
    texts, intents = trainer.load_training_data('data/training_data.csv')
    
    # Train model
    model, history = trainer.train(texts, intents)
    
    print("Training completed successfully!")
```

### Frontend Chat Interface
```typescript
// components/ChatInterface.tsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './ChatInterface.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  intent?: string;
  confidence?: number;
}

interface ChatInterfaceProps {
  apiUrl: string;
  userId?: string;
  theme?: 'light' | 'dark';
  placeholder?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  apiUrl,
  userId = 'anonymous',
  theme = 'light',
  placeholder = 'Type your message...'
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(apiUrl);
    
    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to chatbot server');
    });
    
    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from chatbot server');
    });
    
    socketRef.current.on('response', (data: any) => {
      const botMessage: Message = {
        id: generateMessageId(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        intent: data.intent,
        confidence: data.confidence
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    });
    
    // Add welcome message
    const welcomeMessage: Message = {
      id: generateMessageId(),
      text: "Hello! I'm here to help you. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    return () => {
      socketRef.current?.disconnect();
    };
  }, [apiUrl]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateMessageId(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (isConnected && socketRef.current) {
        // Send via WebSocket for real-time response
        socketRef.current.emit('message', {
          message: inputValue,
          user_id: userId,
          session_id: sessionId
        });
      } else {
        // Fallback to HTTP API
        const response = await fetch(`${apiUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: inputValue,
            user_id: userId,
            session_id: sessionId
          }),
        });

        const data = await response.json();
        
        const botMessage: Message = {
          id: generateMessageId(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
          intent: data.intent,
          confidence: data.confidence
        };

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: generateMessageId(),
        text: "Sorry, I'm having trouble connecting. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const generateSessionId = () => {
    return 'session_' + Math.random().toString(36).substr(2, 9);
  };

  const generateMessageId = () => {
    return 'msg_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className={`chat-interface ${theme}`}>
      <div className="chat-header">
        <div className="bot-avatar">🤖</div>
        <div className="bot-info">
          <h3>AI Assistant</h3>
          <span className={`status ${isConnected ? 'online' : 'offline'}`}>
            {isConnected ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender}`}
          >
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString()}
              </div>
              {message.confidence && (
                <div className="message-confidence">
                  Confidence: {(message.confidence * 100).toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="message-input"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
```

### Analytics Dashboard
```typescript
// components/AnalyticsDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AnalyticsData {
  conversationMetrics: {
    totalConversations: number;
    averageLength: number;
    completionRate: number;
    satisfactionScore: number;
  };
  intentDistribution: Array<{
    intent: string;
    count: number;
    percentage: number;
  }>;
  dailyConversations: Array<{
    date: string;
    conversations: number;
    resolved: number;
  }>;
  responseMetrics: {
    averageResponseTime: number;
    accuracyRate: number;
    escalationRate: number;
  };
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics?range=${dateRange}`);
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analyticsData) {
    return <div className="loading">Loading analytics...</div>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h1>Chatbot Analytics</h1>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="date-range-selector"
        >
          <option value="1d">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Total Conversations"
          value={analyticsData.conversationMetrics.totalConversations}
          icon="💬"
        />
        <MetricCard
          title="Avg. Conversation Length"
          value={`${analyticsData.conversationMetrics.averageLength} msgs`}
          icon="📏"
        />
        <MetricCard
          title="Completion Rate"
          value={`${analyticsData.conversationMetrics.completionRate}%`}
          icon="✅"
        />
        <MetricCard
          title="Satisfaction Score"
          value={`${analyticsData.conversationMetrics.satisfactionScore}/5`}
          icon="⭐"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Daily Conversations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.dailyConversations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="conversations"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Intent Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.intentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ intent, percentage }) => `${intent} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analyticsData.intentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Response Metrics</h3>
          <div className="response-metrics">
            <div className="metric">
              <span className="metric-label">Avg. Response Time</span>
              <span className="metric-value">
                {analyticsData.responseMetrics.averageResponseTime}ms
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Accuracy Rate</span>
              <span className="metric-value">
                {analyticsData.responseMetrics.accuracyRate}%
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Escalation Rate</span>
              <span className="metric-value">
                {analyticsData.responseMetrics.escalationRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: string;
}> = ({ title, value, icon }) => (
  <div className="metric-card">
    <div className="metric-icon">{icon}</div>
    <div className="metric-content">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

export default AnalyticsDashboard;
```

## Model Training and Deployment

### Docker Configuration
```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy model
RUN python -m spacy download en_core_web_sm

# Copy application code
COPY . .

# Create directories for models
RUN mkdir -p models data

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "main.py"]
```

### Model Training Pipeline
```python
# training/pipeline.py
import os
import logging
from datetime import datetime
import mlflow
import mlflow.tensorflow
from training.intent_classifier import IntentClassifierTrainer
from training.entity_extractor import EntityExtractorTrainer
from training.response_generator import ResponseGeneratorTrainer

class TrainingPipeline:
    def __init__(self, config):
        self.config = config
        self.setup_logging()
        self.setup_mlflow()
    
    def setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('training.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def setup_mlflow(self):
        mlflow.set_tracking_uri(self.config['mlflow_uri'])
        mlflow.set_experiment(self.config['experiment_name'])
    
    def run_training(self):
        """Run the complete training pipeline"""
        with mlflow.start_run():
            self.logger.info("Starting training pipeline")
            
            # Train intent classifier
            intent_metrics = self.train_intent_classifier()
            mlflow.log_metrics(intent_metrics)
            
            # Train entity extractor
            entity_metrics = self.train_entity_extractor()
            mlflow.log_metrics(entity_metrics)
            
            # Train response generator
            response_metrics = self.train_response_generator()
            mlflow.log_metrics(response_metrics)
            
            # Evaluate complete pipeline
            pipeline_metrics = self.evaluate_pipeline()
            mlflow.log_metrics(pipeline_metrics)
            
            self.logger.info("Training pipeline completed successfully")
    
    def train_intent_classifier(self):
        """Train intent classification model"""
        self.logger.info("Training intent classifier")
        
        trainer = IntentClassifierTrainer()
        texts, intents = trainer.load_training_data(self.config['intent_data_path'])
        
        model, history = trainer.train(texts, intents)
        
        # Log model
        mlflow.tensorflow.log_model(model, "intent_classifier")
        
        return {
            'intent_accuracy': max(history.history['val_accuracy']),
            'intent_loss': min(history.history['val_loss'])
        }
    
    def evaluate_pipeline(self):
        """Evaluate the complete pipeline performance"""
        # Load test data
        test_conversations = self.load_test_conversations()
        
        total_conversations = len(test_conversations)
        correct_responses = 0
        
        for conversation in test_conversations:
            # Simulate conversation
            predicted_response = self.simulate_conversation(conversation)
            
            # Check if response is appropriate
            if self.is_response_appropriate(predicted_response, conversation['expected']):
                correct_responses += 1
        
        accuracy = correct_responses / total_conversations
        
        return {
            'pipeline_accuracy': accuracy,
            'total_test_conversations': total_conversations
        }

if __name__ == "__main__":
    config = {
        'intent_data_path': 'data/intent_training.csv',
        'entity_data_path': 'data/entity_training.json',
        'response_data_path': 'data/response_training.json',
        'mlflow_uri': 'http://localhost:5000',
        'experiment_name': 'chatbot_training'
    }
    
    pipeline = TrainingPipeline(config)
    pipeline.run_training()
```

## Testing

### Unit Tests
```python
# tests/test_chatbot_engine.py
import unittest
from unittest.mock import Mock, patch
from main import ChatbotEngine

class TestChatbotEngine(unittest.TestCase):
    def setUp(self):
        self.chatbot = ChatbotEngine()
    
    def test_preprocess_message(self):
        """Test message preprocessing"""
        message = "Hello! How are you doing today?"
        processed = self.chatbot.preprocess_message(message)
        
        # Should remove punctuation and normalize
        self.assertNotIn('!', processed)
        self.assertNotIn('?', processed)
    
    def test_intent_classification(self):
        """Test intent classification"""
        greeting_message = "hello there"
        intent = self.chatbot.classify_intent(greeting_message)
        
        self.assertEqual(intent, 'greeting')
    
    def test_entity_extraction(self):
        """Test entity extraction"""
        message = "My name is John and I live in New York"
        entities = self.chatbot.extract_entities(message)
        
        # Should extract person and location entities
        entity_labels = [entity['label'] for entity in entities]
        self.assertIn('PERSON', entity_labels)
        self.assertIn('GPE', entity_labels)
    
    @patch('main.redis_client')
    def test_context_management(self, mock_redis):
        """Test conversation context management"""
        session_id = 'test_session'
        
        # Mock Redis response
        mock_redis.get.return_value = None
        
        context = self.chatbot.context_manager.get_context(session_id)
        
        self.assertIsInstance(context, dict)
        self.assertIn('conversation_history', context)

if __name__ == '__main__':
    unittest.main()
```

## Deployment

### Kubernetes Configuration
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-chatbot
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-chatbot
  template:
    metadata:
      labels:
        app: ai-chatbot
    spec:
      containers:
      - name: chatbot
        image: ai-chatbot:latest
        ports:
        - containerPort: 5000
        env:
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: chatbot-secrets
              key: database-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: chatbot-service
spec:
  selector:
    app: ai-chatbot
  ports:
  - protocol: TCP
    port: 80
    targetPort: 5000
  type: LoadBalancer
```

## Future Enhancements

- **Voice Integration**: Speech-to-text and text-to-speech capabilities
- **Visual Recognition**: Image and document analysis
- **Advanced Analytics**: Predictive analytics and user behavior insights
- **Multi-modal Responses**: Rich media responses with images and videos
- **Enterprise Integration**: Advanced CRM and helpdesk integrations
- **Custom Model Training**: No-code model training interface

## Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for improvements.

## License

This project is licensed under the MIT License.