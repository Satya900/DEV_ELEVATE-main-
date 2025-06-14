import axios from 'axios';
import { SubmissionResult } from '../types/questions';

const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
const API_KEY = '2b22ea0cb6msh7e3e865ff03f1eep11be06jsn4247dfad1f34';

export const languageMap: Record<string, { name: string; judgeId: string }> = {
  python: { name: 'python', judgeId: '71' },
  javascript: { name: 'javascript', judgeId: '63' },
  java: { name: 'java', judgeId: '62' },
  cpp: { name: 'cpp', judgeId: '54' },
  c: { name: 'c', judgeId: '50' }
};

export const executeCode = async (
  code: string,
  language: string,
  input: string
): Promise<SubmissionResult> => {
  try {
    console.log(`Executing code in ${language} with input: ${input}`);
    
    // Submit the code
    const submission = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: parseInt(languageMap[language]?.judgeId || '71'),
        stdin: input,
      },
      {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    const { token } = submission.data;
    console.log(`Submission token: ${token}`);

    // Poll for results
    let result = null;
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
      attempts++;
      console.log(`Polling attempt ${attempts}/${maxAttempts}`);
      
      try {
        const { data } = await axios.get(
          `${JUDGE0_API}/submissions/${token}?base64_encoded=false`,
          {
            headers: {
              'X-RapidAPI-Key': API_KEY,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
          }
        );
        result = data;
        
        console.log(`Status: ${result.status?.description}, ID: ${result.status?.id}`);
        
        // If not In Queue (1) or Processing (2)
        if (result.status?.id > 2) {
          break;
        }
      } catch (error) {
        console.error('Error polling for results:', error);
      }

      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, 1000));
    } while (attempts < maxAttempts);

    if (!result) {
      throw new Error('Failed to get execution results after multiple attempts');
    }

    // Map Judge0 status to our SubmissionResult status
    let status: SubmissionResult['status'] = 'Runtime Error';
    if (result.status.id === 3) {
      status = 'Accepted';
    } else if (result.status.id === 4) {
      status = 'Wrong Answer';
    } else if (result.status.id === 5) {
      status = 'Time Limit Exceeded';
    }

    console.log(`Final result: ${status}, Output: ${result.stdout || result.stderr || 'No output'}`);

    return {
      status,
      output: result.stdout || result.stderr || 'No output',
      executionTime: result.time,
      memory: result.memory
    };
  } catch (error) {
    console.error('Code execution error:', error);
    return {
      status: 'Runtime Error',
      output: `Error executing code: ${error.message || 'Unknown error'}`
    };
  }
};