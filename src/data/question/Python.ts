export const python = [
  {
    id: 'py-1',
    title: 'Sum of Two Numbers (Python)',
    description: 'Write a function that returns the sum of two numbers.',
    topicId: 'python-basics',
    language: 'python',
    languageId: 71,
    starterCode: {
      python:
        '# Read input and print output\na, b = map(int, input().split())\n\nclass Solution:\n def sum_two(self, a, b):\n # Write your code here\n pass\n\n# Create solution instance and call function\nsolution = Solution()\nresult = solution.sum_two(a, b)\nprint(result)',
    },
    difficulty: 'Easy',
    tags: ['math', 'function'],
    acceptanceRate: 90,
    examples: [
      { input: '2 3', output: '5', explanation: '2 + 3 = 5' },
      { input: '10 20', output: '30', explanation: '10 + 20 = 30' },
    ],
    constraints: [{ description: '1 <= a, b <= 1000' }],
    relatedConcepts: ['Addition', 'Functions'],
    hints: [
      { level: 1, content: 'Use the + operator.' },
      { level: 2, content: 'Return the sum of a and b.' },
    ],
    walkthrough: 'To solve this, simply return a + b.',
    commonMistakes: ['Forgetting to return the result.'],
    solutionCode: { python: 'def sum_two(a, b):\n return a + b' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '2 3', expectedOutput: '5\n' },
      { input: '10 20', expectedOutput: '30\n' },
    ],
  },
  {
    id: 'py-2',
    title: 'Find Maximum of Two Numbers (Python)',
    description: 'Write a function that returns the maximum of two numbers.',
    topicId: 'python-basics',
    language: 'python',
    languageId: 71,
    starterCode: {
      python:
        '# Read input and print output\na, b = map(int, input().split())\n\nclass Solution:\n    def find_max(self, a, b):\n        # Write your code here\n        pass\n\nsolution = Solution()\nresult = solution.find_max(a, b)\nprint(result)',
    },
    difficulty: 'Easy',
    tags: ['conditionals', 'function'],
    acceptanceRate: 91,
    examples: [
      { input: '3 7', output: '7', explanation: 'Maximum of 3 and 7 is 7.' },
      {
        input: '10 5',
        output: '10',
        explanation: 'Maximum of 10 and 5 is 10.',
      },
    ],
    constraints: [{ description: '1 <= a, b <= 1000' }],
    relatedConcepts: ['Conditionals', 'Comparison'],
    hints: [
      { level: 1, content: 'Use an if-else statement to compare a and b.' },
      { level: 2, content: 'Or use the built-in max() function.' },
    ],
    walkthrough: 'Compare both numbers and return the larger one.',
    commonMistakes: ['Returning the smaller number.'],
    solutionCode: { python: 'def find_max(a, b):\n    return max(a, b)' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '3 7', expectedOutput: '7\n' },
      { input: '10 5', expectedOutput: '10\n' },
    ],
  },
  {
    id: 'py-3',
    title: 'Check Even or Odd (Python)',
    description:
      'Write a function that checks whether a number is even or odd.',
    topicId: 'python-basics',
    language: 'python',
    languageId: 71,
    starterCode: {
      python:
        '# Read input and print output\nn = int(input())\n\nclass Solution:\n    def check_even_odd(self, n):\n        # Write your code here\n        pass\n\nsolution = Solution()\nresult = solution.check_even_odd(n)\nprint(result)',
    },
    difficulty: 'Easy',
    tags: ['conditionals', 'math'],
    acceptanceRate: 93,
    examples: [
      { input: '4', output: 'Even', explanation: '4 is divisible by 2.' },
      { input: '7', output: 'Odd', explanation: '7 is not divisible by 2.' },
    ],
    constraints: [{ description: '1 <= n <= 10^5' }],
    relatedConcepts: ['Modulo', 'Conditionals'],
    hints: [
      { level: 1, content: 'Use n % 2 to check divisibility.' },
      { level: 2, content: 'If n % 2 == 0, it is even.' },
    ],
    walkthrough: 'Check remainder when dividing by 2.',
    commonMistakes: ['Returning boolean instead of a string.'],
    solutionCode: {
      python:
        'def check_even_odd(n):\n    return "Even" if n % 2 == 0 else "Odd"',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '4', expectedOutput: 'Even\n' },
      { input: '7', expectedOutput: 'Odd\n' },
    ],
  },
  {
    id: 'py-4',
    title: 'Sum of N Natural Numbers (Python)',
    description:
      'Write a function that returns the sum of the first N natural numbers.',
    topicId: 'python-basics',
    language: 'python',
    languageId: 71,
    starterCode: {
      python:
        '# Read input and print output\nn = int(input())\n\nclass Solution:\n    def sum_natural(self, n):\n        # Write your code here\n        pass\n\nsolution = Solution()\nresult = solution.sum_natural(n)\nprint(result)',
    },
    difficulty: 'Easy',
    tags: ['math', 'loops'],
    acceptanceRate: 91,
    examples: [
      { input: '5', output: '15', explanation: '1 + 2 + 3 + 4 + 5 = 15' },
      {
        input: '10',
        output: '55',
        explanation: 'Sum of first 10 numbers = 55',
      },
    ],
    constraints: [{ description: '1 <= n <= 10^5' }],
    relatedConcepts: ['Loops', 'Arithmetic Progression'],
    hints: [
      { level: 1, content: 'Use formula n*(n+1)//2.' },
      { level: 2, content: 'Or loop and add numbers one by one.' },
    ],
    walkthrough: 'Use mathematical formula to calculate sum.',
    commonMistakes: ['Using float division instead of integer division.'],
    solutionCode: {
      python: 'def sum_natural(n):\n    return n * (n + 1) // 2',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '5', expectedOutput: '15\n' },
      { input: '10', expectedOutput: '55\n' },
    ],
  },
  {
    id: 'py-5',
    title: 'Reverse a String (Python)',
    description: 'Write a function that returns the reverse of a given string.',
    topicId: 'python-basics',
    language: 'python',
    languageId: 71,
    starterCode: {
      python:
        '# Read input and print output\ns = input()\n\nclass Solution:\n    def reverse_string(self, s):\n        # Write your code here\n        pass\n\nsolution = Solution()\nresult = solution.reverse_string(s)\nprint(result)',
    },
    difficulty: 'Easy',
    tags: ['string', 'slicing'],
    acceptanceRate: 90,
    examples: [
      { input: 'hello', output: 'olleh', explanation: 'Reversing the string.' },
      {
        input: 'python',
        output: 'nohtyp',
        explanation: 'Reversing the string.',
      },
    ],
    constraints: [{ description: '1 <= |s| <= 10^4' }],
    relatedConcepts: ['Strings', 'Slicing'],
    hints: [
      { level: 1, content: 'Use slicing syntax s[::-1].' },
      { level: 2, content: 'You can also use reversed() and join().' },
    ],
    walkthrough: 'Simplest way is slicing with step -1.',
    commonMistakes: ['Using print inside the function instead of returning.'],
    solutionCode: { python: 'def reverse_string(s):\n    return s[::-1]' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: 'hello', expectedOutput: 'olleh\n' },
      { input: 'python', expectedOutput: 'nohtyp\n' },
    ],
  },
  {
    id: 'py-6',
    title: 'Factorial of a Number (Python)',
    description: 'Write a function that returns the factorial of a number.',
    topicId: 'python-basics',
    language: 'python',
    languageId: 71,
    starterCode: {
      python:
        '# Read input and print output\nn = int(input())\n\nclass Solution:\n    def factorial(self, n):\n        # Write your code here\n        pass\n\nsolution = Solution()\nresult = solution.factorial(n)\nprint(result)',
    },
    difficulty: 'Easy',
    tags: ['loops', 'math'],
    acceptanceRate: 88,
    examples: [
      { input: '5', output: '120', explanation: '5! = 120' },
      { input: '0', output: '1', explanation: '0! = 1 by definition' },
    ],
    constraints: [{ description: '0 <= n <= 20' }],
    relatedConcepts: ['Loops', 'Recursion'],
    hints: [
      { level: 1, content: 'Use a loop to multiply from 1 to n.' },
      { level: 2, content: 'For n = 0, return 1.' },
    ],
    walkthrough: 'Multiply all numbers up to n.',
    commonMistakes: ['Returning 0 for n = 0.'],
    solutionCode: {
      python:
        'def factorial(n):\n    fact = 1\n    for i in range(1, n + 1):\n        fact *= i\n    return fact',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '5', expectedOutput: '120\n' },
      { input: '0', expectedOutput: '1\n' },
    ],
  },
  {
    id: 'py-7',
    title: 'Check Prime Number (Python)',
    description: 'Write a function that checks whether a number is prime.',
    topicId: 'python-basics',
    language: 'python',
    languageId: 71,
    starterCode: {
      python:
        '# Read input and print output\nn = int(input())\n\nclass Solution:\n    def is_prime(self, n):\n        # Write your code here\n        pass\n\nsolution = Solution()\nresult = solution.is_prime(n)\nprint(result)',
    },
    difficulty: 'Medium',
    tags: ['math', 'loops'],
    acceptanceRate: 85,
    examples: [
      {
        input: '7',
        output: 'Prime',
        explanation: '7 has no divisors other than 1 and 7.',
      },
      { input: '9', output: 'Not Prime', explanation: '9 is divisible by 3.' },
    ],
    constraints: [{ description: '2 <= n <= 10^6' }],
    relatedConcepts: ['Conditionals', 'Optimization'],
    hints: [
      { level: 1, content: 'Check divisibility up to √n.' },
      { level: 2, content: 'If divisible by any number, it is not prime.' },
    ],
    walkthrough: 'Loop from 2 to √n and check divisibility.',
    commonMistakes: ['Checking divisibility up to n instead of √n.'],
    solutionCode: {
      python:
        'def is_prime(n):\n    if n < 2:\n        return "Not Prime"\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return "Not Prime"\n    return "Prime"',
    },
    timeComplexity: 'O(√n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '7', expectedOutput: 'Prime\n' },
      { input: '9', expectedOutput: 'Not Prime\n' },
    ],
  },
]
