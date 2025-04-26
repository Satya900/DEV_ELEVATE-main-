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
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  experienceLevel: string;
  primaryLanguage: string;
  tags: string[];
  description: string;
  examples: Example[];
  constraints: Constraint[];
  hints?: Hint[];
  starterCode: Record<string, string>;
  solutionCode: Record<string, string>;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  acceptanceRate?: number;
}

export interface SubmissionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  output: string;
  executionTime?: number;
  memory?: number;
}
