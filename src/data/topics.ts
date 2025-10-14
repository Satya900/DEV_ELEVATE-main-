const topics = [
  {
    id: 'java-basics',
    name: 'Java Basics',
    description: 'Learn the fundamentals of Java programming.',
    color: '#f59e42',
    icon: '☕',
    questions: ['java-1'],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 10,
  },
  {
    id: 'python-basics',
    name: 'Python Basics',
    description: 'Start your Python journey here.',
    color: '#3572A5',
    icon: '🐍',
    questions: ['py-1', 'py-unique-1'],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 10,
  },
  {
    id: 'javascript-basics',
    name: 'JavaScript Basics',
    description: 'Master the basics of JavaScript.',
    color: '#f7df1e',
    icon: '🟨',
    questions: [
      'js-1',
      'js-2',
      'js-3',
      'js-4',
      'js-5',
      'js-6',
      'js-7',
      'js-8',
      'js-9',
      'js-10',
      'js-11',
      'js-12',
      'js-13',
    ],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 10,
  },
  {
    id: 'cpp-basics',
    name: 'C++ Basics',
    description: 'Get started with C++ programming.',
    color: '#00599C',
    icon: '💠',
    questions: ['cpp-1'],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 10,
  },
  {
    id: 'c-basics',
    name: 'C Basics',
    description: 'Introduction to C programming.',
    color: '#555555',
    icon: '🔵',
    questions: ['c-1'],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 10,
  },
  {
    id: 'arrays-hashing',
    name: 'Arrays & Hashing',
    description: 'Core data structures and hashing techniques.',
    color: '#10b981',
    icon: '🔢',
    questions: [],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 0,
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    description: 'Efficient searching algorithms.',
    color: '#6366f1',
    icon: '🔍',
    questions: [],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 0,
  },
  {
    id: 'pointers-references',
    name: 'Pointers & References',
    description: 'Deep dive into pointers and references.',
    color: '#f43f5e',
    icon: '📌',
    questions: [],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 0,
  },
  {
    id: 'async-programming',
    name: 'Async Programming',
    description: 'Learn about asynchronous programming concepts.',
    color: '#0ea5e9',
    icon: '⚡',
    questions: [],
    badgeThresholds: { bronze: 10, silver: 20, gold: 30 },
    totalPoints: 0,
  },
]

// Helper: get topic by id
export function getTopicById(topicId) {
  return topics.find((t) => t.id === topicId)
}

// Helper: get points per question (default 10)
export function getPointsPerQuestion(topicId, questionId) {
  const topic = getTopicById(topicId)
  if (!topic) return 0
  // You can customize per-topic/question points here
  return 10
}

// Helper: calculate topic progress, badge, and points
export function calculateTopicProgress(topic, solvedQuestions) {
  const totalQuestions = topic.questions.length
  const solved = topic.questions.filter((qId) => solvedQuestions.includes(qId))
  const solvedCount = solved.length
  const percentage =
    totalQuestions === 0 ? 0 : Math.round((solvedCount / totalQuestions) * 100)
  const points = solvedCount * 10
  let badgeLevel = 'none'
  if (percentage === 100) badgeLevel = 'gold'
  else if (percentage >= 50) badgeLevel = 'silver'
  else if (percentage > 0) badgeLevel = 'bronze'
  return {
    solvedQuestions: solved,
    percentage,
    points,
    badgeLevel,
  }
}

// Returns all topics that contain the given questionId
export function getTopicsForQuestion(questionId) {
  return topics.filter(
    (topic) =>
      Array.isArray(topic.questions) && topic.questions.includes(questionId)
  )
}

export { topics }
export default topics
