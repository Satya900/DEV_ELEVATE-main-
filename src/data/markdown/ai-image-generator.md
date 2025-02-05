# AI Image Generator

[Previous content remains the same until the first code block]

#### Frontend Code Example (React + TypeScript)
```typescript
import React, { useState } from 'react';
import axios from 'axios';

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/generate', { prompt });
      setImage(response.data.image_url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>AI Image Generator</h1>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt..." />
      <button onClick={generateImage} disabled={loading}>Generate</button>
      {loading && <p>Loading...</p>}
      {image && <img src={image} alt="Generated" />}
    </div>
  );
};

export default AIImageGenerator;
```

[Previous content remains the same until the next code block]

#### Backend Code Example (FastAPI + TensorFlow)
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import tensorflow as tf
import requests
import redis

app = FastAPI()
cache = redis.Redis(host='localhost', port=6379, db=0)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
def generate_image(request: PromptRequest):
    cached_image = cache.get(request.prompt)
    if cached_image:
        return {"image_url": cached_image.decode('utf-8')}
    
    # Placeholder for TensorFlow image generation
    generated_image_url = "https://example.com/generated_image.png"
    cache.set(request.prompt, generated_image_url)
    return {"image_url": generated_image_url}
```

[Previous content remains the same until the SQL code block]

#### Table Schema:
```sql
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    prompt TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

[Previous content remains the same until the bash commands]

### **1. Clone the repository:**
```bash
git clone https://github.com/devcrafters/ai-image-generator.git
cd ai-image-generator
```

### **2. Install dependencies:**
#### **Backend:**
```bash
pip install fastapi tensorflow redis uvicorn
```
#### **Frontend:**
```bash
cd frontend
npm install
```

### **3. Start the services:**
#### **Start Backend:**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
#### **Start Frontend:**
```bash
npm start
```

[Rest of the content remains the same]