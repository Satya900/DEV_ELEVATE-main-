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
      console.log(`Running code with input: "${input}"`);
      
      // Run with custom input first
      const result = await executeCode(code, language, input);
      setOutput(result.output);
      console.log(`Custom input result: ${result.output}`);

      // If test cases provided, run them
      if (testCases && testCases.length > 0) {
        console.log(`Running ${testCases.length} test cases`);
        
        const testResults = await Promise.all(
          testCases.map(async (testCase, index) => {
            console.log(`Running test case ${index + 1}: "${testCase.input}"`);
            const testResult = await executeCode(code, language, testCase.input);
            
            // Normalize line endings and trim whitespace for comparison
            const normalizedActual = testResult.output.replace(/\r\n/g, '\n').trim();
            const normalizedExpected = testCase.expectedOutput.replace(/\r\n/g, '\n').trim();
            
            const passed = normalizedActual === normalizedExpected;
            
            console.log(`Test case ${index + 1} result: ${passed ? 'PASSED' : 'FAILED'}`);
            console.log(`  Expected: "${normalizedExpected}"`);
            console.log(`  Actual: "${normalizedActual}"`);
            
            return {
              ...testCase,
              actualOutput: testResult.output,
              passed,
              executionTime: testResult.executionTime
            };
          })
        );

        const allTestsPassed = testResults.every(test => test.passed);
        console.log(`All tests passed: ${allTestsPassed}`);
        
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
      const errorMessage = error.message || 'Error executing code. Please try again.';
      setOutput(errorMessage);
      return {
        output: errorMessage,
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