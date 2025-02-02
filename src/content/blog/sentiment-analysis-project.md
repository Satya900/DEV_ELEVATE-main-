---
title: "Building a Sentiment Analysis Model with Python"
description: "Create a sentiment analysis model using Python and natural language processing"
pubDate: 2024-03-28
category: "Projects"
author: "Dev Elevate Team"
tags: ["machine-learning", "python", "nlp"]
---

# Building a Sentiment Analysis Model with Python

Let's create a sentiment analysis model that can classify text as positive, negative, or neutral using Python and natural language processing techniques.

## Project Overview

- **Tech Stack**: Python, scikit-learn, NLTK, FastAPI
- **Difficulty**: Intermediate
- **Time**: 4-6 hours

## Features

1. Text preprocessing
2. Model training
3. Sentiment prediction
4. REST API endpoint
5. Model evaluation
6. Cross-validation

## Implementation

### 1. Text Preprocessing

```python
# preprocessing.py
import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

class TextPreprocessor:
    def __init__(self):
        nltk.download('punkt')
        nltk.download('stopwords')
        nltk.download('wordnet')
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))

    def preprocess(self, text):
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and numbers
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenization
        tokens = word_tokenize(text)
        
        # Remove stop words and lemmatize
        tokens = [
            self.lemmatizer.lemmatize(token)
            for token in tokens
            if token not in self.stop_words
        ]
        
        return ' '.join(tokens)

# Example usage
preprocessor = TextPreprocessor()
clean_text = preprocessor.preprocess("This movie was really great! I loved it.")
```

### 2. Model Training

```python
# model.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import pandas as pd
import joblib

class SentimentModel:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(max_features=5000)
        self.classifier = RandomForestClassifier(
            n_estimators=100,
            random_state=42
        )
        self.preprocessor = TextPreprocessor()

    def train(self, data_path):
        # Load data
        df = pd.read_csv(data_path)
        
        # Preprocess text
        X = df['text'].apply(self.preprocessor.preprocess)
        y = df['sentiment']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Vectorize text
        X_train_vectorized = self.vectorizer.fit_transform(X_train)
        X_test_vectorized = self.vectorizer.transform(X_test)
        
        # Train model
        self.classifier.fit(X_train_vectorized, y_train)
        
        # Evaluate
        y_pred = self.classifier.predict(X_test_vectorized)
        print(classification_report(y_test, y_pred))
        
        return self

    def predict(self, text):
        # Preprocess and vectorize
        clean_text = self.preprocessor.preprocess(text)
        vectorized = self.vectorizer.transform([clean_text])
        
        # Predict
        prediction = self.classifier.predict(vectorized)
        probabilities = self.classifier.predict_proba(vectorized)
        
        return {
            'sentiment': prediction[0],
            'confidence': float(max(probabilities[0]))
        }

    def save(self, path):
        joblib.dump({
            'vectorizer': self.vectorizer,
            'classifier': self.classifier
        }, path)

    @classmethod
    def load(cls, path):
        model = cls()
        saved_model = joblib.load(path)
        model.vectorizer = saved_model['vectorizer']
        model.classifier = saved_model['classifier']
        return model
```

### 3. FastAPI Implementation

```python
# api.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Union
from model import SentimentModel

app = FastAPI(title="Sentiment Analysis API")

# Load trained model
model = SentimentModel.load('sentiment_model.joblib')

class TextRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str
    confidence: float

@app.post("/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: TextRequest) -> Dict[str, Union[str, float]]:
    try:
        result = model.predict(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

### 4. Model Evaluation

```python
# evaluation.py
from sklearn.model_selection import cross_val_score
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

def evaluate_model(model, X, y):
    # Perform cross-validation
    scores = cross_val_score(model, X, y, cv=5)
    print(f"Cross-validation scores: {scores}")
    print(f"Average CV score: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})")
    
    # Create confusion matrix
    y_pred = model.predict(X)
    cm = confusion_matrix(y, y_pred)
    
    # Plot confusion matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.show()
```

## Project Structure

```
src/
  preprocessing.py
  model.py
  api.py
  evaluation.py
  tests/
    test_preprocessing.py
    test_model.py
    test_api.py
  data/
    training_data.csv
  notebooks/
    model_development.ipynb
```

## Key Learning Points

1. Text preprocessing techniques
2. Feature extraction with TF-IDF
3. Model selection and training
4. API development with FastAPI
5. Model evaluation and metrics
6. Cross-validation

## Model Training Process

1. Data preparation:
```python
# Load and preprocess data
data = pd.read_csv('data/training_data.csv')
preprocessor = TextPreprocessor()
X = data['text'].apply(preprocessor.preprocess)
y = data['sentiment']

# Create train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
```

2. Feature extraction:
```python
# Create TF-IDF features
vectorizer = TfidfVectorizer(max_features=5000)
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)
```

3. Model training:
```python
# Train the model
classifier = RandomForestClassifier(n_estimators=100, random_state=42)
classifier.fit(X_train_vectorized, y_train)
```

## Next Steps

1. Add more advanced NLP features
2. Implement deep learning models
3. Add multilingual support
4. Create a web interface
5. Add batch processing
6. Implement model monitoring

Remember to handle edge cases and implement proper error handling throughout the application!