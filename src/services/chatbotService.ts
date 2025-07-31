import axios from 'axios';
import { CodeQuestion } from '../types/questions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export const createQuestionContext = (question: CodeQuestion): string => {
  return `You are an expert programming tutor helping a student solve a coding problem. 

PROBLEM CONTEXT:
Title: ${question.title}
Difficulty: ${question.difficulty}
Description: ${question.description}

${question.examples ? `Examples:
${question.examples.map((ex, i) => `Example ${i + 1}:
Input: ${ex.input}
Output: ${ex.output}
${ex.explanation ? `Explanation: ${ex.explanation}` : ''}`).join('\n')}` : ''}

${question.constraints ? `Constraints:
${question.constraints.map(c => `• ${c.description}`).join('\n')}` : ''}

${question.timeComplexity ? `Expected Time Complexity: ${question.timeComplexity}` : ''}
${question.spaceComplexity ? `Expected Space Complexity: ${question.spaceComplexity}` : ''}

INSTRUCTIONS:
1. You are ONLY helping with this specific problem - do not solve other problems
2. Provide hints and guidance, but don't give complete solutions unless specifically asked
3. Explain concepts clearly and step-by-step
4. If the user shows code, analyze it and provide constructive feedback
5. Help identify bugs and suggest improvements
6. Explain the logic and approach, not just the syntax
7. Be encouraging and supportive
8. If the user is stuck, provide progressive hints starting with general concepts
9. Focus on teaching the problem-solving approach, not just the answer

Remember: Your goal is to help the student learn and understand the problem-solving process, not just get the right answer.`;
};

// Server-side API endpoint for chatbot
const CHATBOT_API_ENDPOINT = '/api/chatbot';

export const sendMessageToChatbot = async (
  messages: ChatMessage[]
): Promise<ChatResponse> => {
  try {
    const response = await axios.post(CHATBOT_API_ENDPOINT, {
      messages,
    });

    return {
      message: response.data.message,
    };
  } catch (error: any) {
    console.error('Chatbot API error:', error);
    
    if (error.response?.status === 429) {
      return {
        message: '',
        error: 'Rate limit exceeded. Please try again in a moment.',
      };
    } else if (error.response?.status >= 500) {
      return {
        message: '',
        error: 'Server error. Please try again later.',
      };
    } else {
      return {
        message: '',
        error: error.message || 'Failed to get response from AI assistant.',
      };
    }
  }
};

export const analyzeUserCode = async (
  question: CodeQuestion,
  userCode: string,
  language: string
): Promise<ChatResponse> => {
  const systemMessage = createQuestionContext(question);
  
  const userMessage = `I'm working on this problem and here's my current code in ${language}:

\`\`\`${language}
${userCode}
\`\`\`

Please analyze my code and provide feedback. What am I doing well? What could be improved? Are there any bugs or logical errors? What's the next step I should take?`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: userMessage },
  ];

  return await sendMessageToChatbot(messages);
};

export const getProgressiveHint = async (
  question: CodeQuestion,
  hintLevel: number
): Promise<ChatResponse> => {
  const systemMessage = createQuestionContext(question);
  
  const hintPrompts = [
    "Give me a very general hint about the approach to solve this problem. Don't reveal too much.",
    "Provide a more specific hint about the data structure or algorithm that might be useful.",
    "Give me a hint about the specific logic or pattern I should look for.",
    "Provide a hint about the edge cases or special conditions I should consider.",
    "Give me a more detailed hint about the implementation approach.",
  ];

  const userMessage = `I need hint level ${hintLevel + 1} for this problem. ${hintPrompts[hintLevel] || hintPrompts[hintPrompts.length - 1]}`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: userMessage },
  ];

  return await sendMessageToChatbot(messages);
}; 