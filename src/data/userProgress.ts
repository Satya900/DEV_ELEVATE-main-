export interface UserProgress {
  userId: string;
  displayName: string;
  solvedQuestions: string[] | Record<string, boolean>;
  submissions: Submission[];
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastActive: Date;
    calendar: Record<string, number>;
  };
  categoryProgress: Array<{
    category: string;
    solved: number;
    total: number;
    percentage: number;
  }>;
  difficultyProgress: Array<{
    difficulty: string;
    solved: number;
    total: number;
    percentage: number;
  }>;
  topicProgress?: Array<{
    topicId: string;
    solvedQuestions: string[];
    points?: number;
    badgeLevel?: string;
    lastUpdated?: string;
  }>;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: Date;
  }>;
  totalSolved: number;
  totalAttempted: number;
  rank: number;
  xp: number;
  level: number;
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

export const mockUserProgress = {
  userId: "user123",
  displayName: "John Doe",
  solvedQuestions: ['q1'],
  submissions: [
    {
      id: "sub1",
      userId: "user123",
      questionId: "q1",
      questionTitle: "Sample Question",
      code: "def solution(nums):\n    return sum(nums)",
      language: "python",
      status: "Accepted",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      executionTime: 5,
      memory: 8192,
      runtime: 5
    }
  ],
  streak: {
    currentStreak: 3,
    longestStreak: 5,
    lastActive: new Date(),
    calendar: {
      "2023-12-01": 2,
      "2023-12-02": 1,
      "2023-12-03": 3
    }
  },
  categoryProgress: [
    {
      category: "Array",
      solved: 1,
      total: 3,
      percentage: 33
    },
    {
      category: "Hash Table",
      solved: 0,
      total: 2,
      percentage: 0
    },
    {
      category: "Math",
      solved: 0,
      total: 1,
      percentage: 0
    },
    {
      category: "Basics",
      solved: 1,
      total: 1,
      percentage: 100
    }
  ],
  difficultyProgress: [
    {
      difficulty: "Beginner",
      solved: 1,
      total: 1,
      percentage: 100
    },
    {
      difficulty: "Easy",
      solved: 0,
      total: 3,
      percentage: 0
    },
    {
      difficulty: "Medium",
      solved: 0,
      total: 1,
      percentage: 0
    },
    {
      difficulty: "Hard",
      solved: 0,
      total: 0,
      percentage: 0
    },
    {
      difficulty: "Expert",
      solved: 0,
      total: 0,
      percentage: 0
    }
  ],
  topicProgress: [
    {
      topicId: "java-basics",
      solvedQuestions: ["q1"],
      points: 10,
      badgeLevel: "bronze",
      lastUpdated: new Date().toISOString()
    }
  ],
  badges: [
    {
      id: "first-solve",
      name: "First Solve",
      description: "Solved your first problem",
      icon: "🎯",
      earnedAt: new Date(Date.now() - 604800000) // 1 week ago
    }
  ],
  totalSolved: 1,
  totalAttempted: 2,
  rank: 10000,
  xp: 50,
  level: 1
};