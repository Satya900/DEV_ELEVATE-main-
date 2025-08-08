const fs = require('fs');
const path = require('path');

console.log('🔧 DevElevate AI Chatbot Setup');
console.log('================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
} else {
  console.log('📝 Creating .env file...');
  
  // Read the example file
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  
  // Write the .env file
  fs.writeFileSync(envPath, envExample);
  
  console.log('✅ .env file created successfully!');
}

console.log('\n📋 Next Steps:');
console.log('1. Edit server/.env file');
console.log('2. Replace "your-gemini-api-key-here" with your actual Gemini API key');
console.log('3. Make sure your API key is from Google AI Studio');
console.log('4. Start the server with: npm run dev');
console.log('\n🔗 Get your API key from: https://makersuite.google.com/app/apikey'); 