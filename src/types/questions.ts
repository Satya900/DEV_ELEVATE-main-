export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Constraint {
  description: string;
}

export interface Hint {
  level: number;
  content: string;
}

export interface CodeQuestion {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  experienceLevel?: string;
  language?: string;
  languageId?: number;
  tags: string[];
  description: string;
  examples?: Example[];
  constraints?: Constraint[];
  hints?: Hint[];
  starterCode: Record<string, string>;
  solutionCode?: Record<string, string>;
  testCases: {
    input: string;
    expectedOutput: string;
    actualOutput?: string;
    passed?: boolean;
    executionTime?: number;
  }[];
  acceptanceRate?: number;
  timeComplexity?: string;
  spaceComplexity?: string;
  walkthrough?: string;
  commonMistakes?: string[];
}

export interface SubmissionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  output: string;
  executionTime?: number;
  memory?: number;
}

export interface Submission {
  id: string;
  userId: string;
  questionId: string;
  questionTitle?: string;
  code: string;
  language: string;
  status: string;
  timestamp: Date;
  executionTime?: number;
  memory?: number;
  runtime?: number;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  executionTime?: number;
}