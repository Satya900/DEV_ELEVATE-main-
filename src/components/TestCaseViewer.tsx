import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface TestCase {
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  executionTime?: number;
}

interface TestCaseViewerProps {
  testCases: TestCase[];
  showResults?: boolean;
}

export const TestCaseViewer: React.FC<TestCaseViewerProps> = ({ 
  testCases, 
  showResults = false 
}) => {
  return (
    <div className="space-y-4">
      {testCases.map((testCase, index) => (
        <div 
          key={index}
          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Test Case {index + 1}</h4>
            {showResults && (
              <div className="flex items-center gap-2">
                {testCase.passed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                {testCase.executionTime && (
                  <span className="text-sm text-gray-500">
                    {testCase.executionTime}ms
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium">Input:</label>
              <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded">
                {testCase.input}
              </pre>
            </div>
            
            <div>
              <label className="text-sm font-medium">Expected Output:</label>
              <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded">
                {testCase.expectedOutput}
              </pre>
            </div>

            {showResults && testCase.actualOutput && (
              <div>
                <label className="text-sm font-medium">Your Output:</label>
                <pre className={`mt-1 p-2 rounded ${
                  testCase.passed 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}>
                  {testCase.actualOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
