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
    // Submit the code
    const submission = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=false`,
      {
        source_code: code,
        language_id: parseInt(languageMap[language].judgeId),
        stdin: input,
        wait: true
      },
      {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    const { token } = submission.data;

    // Poll for results
    let result = null;
    do {
      const { data } = await axios.get(
        `${JUDGE0_API}/submissions/${token}`,
        {
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          }
        }
      );
      result = data;

      if (result.status.id > 2) { // If not In Queue (1) or Processing (2)
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before polling again
    } while (true);

    // Map Judge0 status to our SubmissionResult status
    let status: SubmissionResult['status'] = 'Runtime Error';
    if (result.status.id === 3) {
      status = 'Accepted';
    } else if (result.status.id === 4) {
      status = 'Wrong Answer';
    } else if (result.status.id === 5) {
      status = 'Time Limit Exceeded';
    }

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
      output: 'Error executing code. Please try again.'
    };
  }
};
