import { useState } from 'react';
import { executeCode } from '../services/codeExecutionService';
import { TestCase } from '../types/questions';

interface ExecutionResult {
  output: string;
  testResults: TestCase[];
  allTestsPassed: boolean;
  executionTime?: number;
}

export const useCodeExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<TestCase[]>([]);

  const runCode = async (
    code: string,
    language: string,
    input: string,
    testCases?: { input: string; expectedOutput: string }[]
  ): Promise<ExecutionResult> => {
    setIsRunning(true);
    setOutput('Running code...');
    
    try {
      // Run with custom input first
      const result = await executeCode(code, language, input);
      setOutput(result.output);

      // If test cases provided, run them
      if (testCases) {
        const testResults = await Promise.all(
          testCases.map(async (testCase) => {
            const testResult = await executeCode(code, language, testCase.input);
            return {
              ...testCase,
              actualOutput: testResult.output,
              passed: testResult.output.trim() === testCase.expectedOutput.trim(),
              executionTime: testResult.executionTime
            };
          })
        );

        const allTestsPassed = testResults.every(test => test.passed);
        setTestResults(testResults);

        return {
          output: result.output,
          testResults,
          allTestsPassed,
          executionTime: result.executionTime
        };
      }

      return {
        output: result.output,
        testResults: [],
        allTestsPassed: false,
        executionTime: result.executionTime
      };

    } catch (error) {
      console.error('Code execution error:', error);
      setOutput('Error executing code. Please try again.');
      return {
        output: 'Error executing code. Please try again.',
        testResults: [],
        allTestsPassed: false
      };
    } finally {
      setIsRunning(false);
    }
  };

  return {
    isRunning,
    output,
    testResults,
    runCode
  };
};
