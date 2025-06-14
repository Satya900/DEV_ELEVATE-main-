export const mockQuestions = [
  {
    id: 'q1',
    title: 'Sample Question',
    description: 'This is a sample question.',
    topicId: 'java-basics',
    difficulty: 'Easy',
    experienceLevel: 'Beginner',
    tags: ['Arrays', 'Basics'],
    timeToSolve: 10,
    starterCode: {
      python: '# Write your code here\n# Read input and print output\na, b = map(int, input().split())\nresult = a + b\nprint(result)',
      javascript: '// Write your code here\n// Read input and print output\nconst readline = require("readline");\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.on("line", (line) => {\n  const [a, b] = line.split(" ").map(Number);\n  const result = a + b;\n  console.log(result);\n  rl.close();\n});',
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        int result = a + b;\n        System.out.println(result);\n        scanner.close();\n    }\n}',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    int result = a + b;\n    cout << result << endl;\n    return 0;\n}',
      c: '#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    int result = a + b;\n    printf("%d\\n", result);\n    return 0;\n}'
    },
    solution: '',
    testCases: [
      { input: '2 3', expectedOutput: '5\n' },
      { input: '10 20', expectedOutput: '30\n' }
    ]
  },
  {
    id: 'q2',
    title: 'Second Sample',
    description: 'Another sample question.',
    topicId: 'python-basics',
    difficulty: 'Medium',
    experienceLevel: 'Intermediate',
    tags: ['Strings'],
    timeToSolve: 15,
    starterCode: {
      python: '# Write your code here\n# Read input and print output\ntext = input()\nprint(text[::-1])',
      javascript: '// Write your code here\n// Read input and print output\nconst readline = require("readline");\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.on("line", (line) => {\n  const reversed = line.split("").reverse().join("");\n  console.log(reversed);\n  rl.close();\n});',
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String text = scanner.nextLine();\n        StringBuilder sb = new StringBuilder(text);\n        System.out.println(sb.reverse().toString());\n        scanner.close();\n    }\n}',
      cpp: '#include <iostream>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n    string text;\n    getline(cin, text);\n    reverse(text.begin(), text.end());\n    cout << text << endl;\n    return 0;\n}',
      c: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char text[100];\n    scanf("%s", text);\n    int length = strlen(text);\n    for (int i = length - 1; i >= 0; i--) {\n        printf("%c", text[i]);\n    }\n    printf("\\n");\n    return 0;\n}'
    },
    solution: '',
    testCases: [
      { input: 'hello', expectedOutput: 'olleh\n' },
      { input: 'world', expectedOutput: 'dlrow\n' }
    ]
  },
  // Python
  {
    id: 'py-1',
    title: 'Sum of Two Numbers (Python)',
    description: 'Write a function that returns the sum of two numbers.',
    topicId: 'python-basics',
    language: 'python',
    languageId: 71,
    starterCode: {
      python: '# Read input and print output\na, b = map(int, input().split())\n\nclass Solution:\n    def sum_two(self, a, b):\n        # Write your code here\n        pass\n\n# Create solution instance and call function\nsolution = Solution()\nresult = solution.sum_two(a, b)\nprint(result)',
    },
    difficulty: 'Easy',
    tags: ['math', 'function'],
    acceptanceRate: 90,
    examples: [
      { input: '2 3', output: '5', explanation: '2 + 3 = 5' },
      { input: '10 20', output: '30', explanation: '10 + 20 = 30' }
    ],
    constraints: [
      { description: '1 <= a, b <= 1000' }
    ],
    relatedConcepts: ['Addition', 'Functions'],
    hints: [
      { level: 1, content: 'Use the + operator.' },
      { level: 2, content: 'Return the sum of a and b.' }
    ],
    walkthrough: 'To solve this, simply return a + b.',
    commonMistakes: ['Forgetting to return the result.'],
    solutionCode: { python: 'def sum_two(a, b):\n    return a + b' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '2 3', expectedOutput: '5\n' },
      { input: '10 20', expectedOutput: '30\n' }
    ]
  },
  // Java
  {
    id: 'java-1',
    title: 'Sum of Two Numbers (Java)',
    description: 'Write a method that returns the sum of two numbers.',
    topicId: 'java-basics',
    language: 'java',
    languageId: 62,
    starterCode: {
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static int sumTwo(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        int result = sumTwo(a, b);\n        System.out.println(result);\n        scanner.close();\n    }\n}',
    },
    difficulty: 'Easy',
    tags: ['math', 'function'],
    acceptanceRate: 88,
    examples: [
      { input: '2 3', output: '5', explanation: '2 + 3 = 5' },
      { input: '10 20', output: '30', explanation: '10 + 20 = 30' }
    ],
    constraints: [
      { description: '1 <= a, b <= 1000' }
    ],
    relatedConcepts: ['Addition', 'Methods'],
    hints: [
      { level: 1, content: 'Use the + operator.' },
      { level: 2, content: 'Return the sum of a and b.' }
    ],
    walkthrough: 'To solve this, simply return a + b.',
    commonMistakes: ['Forgetting to return the result.'],
    solutionCode: { java: 'public static int sumTwo(int a, int b) { return a + b; }' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '2 3', expectedOutput: '5\n' },
      { input: '10 20', expectedOutput: '30\n' }
    ]
  },
  // JavaScript
  {
    id: 'js-1',
    title: 'Sum of Two Numbers (JavaScript)',
    description: 'Write a function that returns the sum of two numbers.',
    topicId: 'javascript-basics',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: 'const readline = require("readline");\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nfunction sumTwo(a, b) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const [a, b] = line.split(" ").map(Number);\n  const result = sumTwo(a, b);\n  console.log(result);\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['math', 'function'],
    acceptanceRate: 92,
    examples: [
      { input: '2 3', output: '5', explanation: '2 + 3 = 5' },
      { input: '10 20', output: '30', explanation: '10 + 20 = 30' }
    ],
    constraints: [
      { description: '1 <= a, b <= 1000' }
    ],
    relatedConcepts: ['Addition', 'Functions'],
    hints: [
      { level: 1, content: 'Use the + operator.' },
      { level: 2, content: 'Return the sum of a and b.' }
    ],
    walkthrough: 'To solve this, simply return a + b.',
    commonMistakes: ['Forgetting to return the result.'],
    solutionCode: { javascript: 'function sumTwo(a, b) { return a + b; }' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '2 3', expectedOutput: '5\n' },
      { input: '10 20', expectedOutput: '30\n' }
    ]
  },
  // C++
  {
    id: 'cpp-1',
    title: 'Sum of Two Numbers (C++)',
    description: 'Write a function that returns the sum of two numbers.',
    topicId: 'cpp-basics',
    language: 'cpp',
    languageId: 54,
    starterCode: {
      cpp: '#include <iostream>\nusing namespace std;\n\nint sumTwo(int a, int b) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    int result = sumTwo(a, b);\n    cout << result << endl;\n    return 0;\n}'
    },
    difficulty: 'Easy',
    tags: ['math', 'function'],
    acceptanceRate: 88,
    examples: [
      { input: '2 3', output: '5', explanation: '2 + 3 = 5' },
      { input: '10 20', output: '30', explanation: '10 + 20 = 30' }
    ],
    constraints: [
      { description: '1 <= a, b <= 1000' }
    ],
    relatedConcepts: ['Addition', 'Functions'],
    hints: [
      { level: 1, content: 'Use the + operator.' },
      { level: 2, content: 'Return the sum of a and b.' }
    ],
    walkthrough: 'To solve this, simply return a + b.',
    commonMistakes: ['Forgetting to return the result.'],
    solutionCode: { cpp: 'int sumTwo(int a, int b) { return a + b; }' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '2 3', expectedOutput: '5\n' },
      { input: '10 20', expectedOutput: '30\n' }
    ]
  },
  // C
  {
    id: 'c-1',
    title: 'Sum of Two Numbers (C)',
    description: 'Write a function that returns the sum of two numbers.',
    topicId: 'c-basics',
    language: 'c',
    languageId: 50,
    starterCode: {
      c: '#include <stdio.h>\n\nint sumTwo(int a, int b) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    int result = sumTwo(a, b);\n    printf("%d\\n", result);\n    return 0;\n}'
    },
    difficulty: 'Easy',
    tags: ['math', 'function'],
    acceptanceRate: 87,
    examples: [
      { input: '2 3', output: '5', explanation: '2 + 3 = 5' },
      { input: '10 20', output: '30', explanation: '10 + 20 = 30' }
    ],
    constraints: [
      { description: '1 <= a, b <= 1000' }
    ],
    relatedConcepts: ['Addition', 'Functions'],
    hints: [
      { level: 1, content: 'Use the + operator.' },
      { level: 2, content: 'Return the sum of a and b.' }
    ],
    walkthrough: 'To solve this, simply return a + b.',
    commonMistakes: ['Forgetting to return the result.'],
    solutionCode: { c: 'int sumTwo(int a, int b) { return a + b; }' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '2 3', expectedOutput: '5\n' },
      { input: '10 20', expectedOutput: '30\n' }
    ]
  },
  // Unique Python Question
  {
    id: 'py-unique-1',
    title: 'Reverse a String (Python)',
    description: 'Write a function that takes a string and returns its reverse.',
    topicId: 'python-strings',
    language: 'python',
    languageId: 71,
    starterCode: {
      python: '# Read input and print output\ns = input()\n\nclass Solution:\n    def reverse_string(self, s):\n        # Write your code here\n        pass\n\n# Create solution instance and call function\nsolution = Solution()\nresult = solution.reverse_string(s)\nprint(result)',
    },
    difficulty: 'Easy',
    tags: ['string', 'reverse'],
    acceptanceRate: 93,
    examples: [
      { input: 'hello', output: 'olleh', explanation: 'Reverse of hello is olleh' },
      { input: 'Python', output: 'nohtyP', explanation: 'Reverse of Python is nohtyP' }
    ],
    constraints: [
      { description: '1 <= len(s) <= 100' }
    ],
    relatedConcepts: ['String Manipulation'],
    hints: [
      { level: 1, content: 'Use slicing or reversed() function.' },
      { level: 2, content: 'Return s[::-1].' }
    ],
    walkthrough: 'To reverse a string in Python, you can use slicing: s[::-1].',
    commonMistakes: ['Returning the original string instead of the reversed one.'],
    solutionCode: { python: 'def reverse_string(s):\n    return s[::-1]' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: 'hello', expectedOutput: 'olleh\n' },
      { input: 'Python', expectedOutput: 'nohtyP\n' }
    ]
  },
  // Unique Java Question
  {
    id: 'java-unique-1',
    title: 'Factorial Calculation (Java)',
    description: 'Write a method that returns the factorial of a given number n.',
    topicId: 'java-math',
    language: 'java',
    languageId: 62,
    starterCode: {
      java: 'import java.util.Scanner;\n\npublic class Main {\n    public static int factorial(int n) {\n        // Write your code here\n        return 1;\n    }\n    \n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        int result = factorial(n);\n        System.out.println(result);\n        scanner.close();\n    }\n}'
    },
    difficulty: 'Easy',
    tags: ['math', 'factorial'],
    acceptanceRate: 89,
    examples: [
      { input: '5', output: '120', explanation: '5! = 120' },
      { input: '3', output: '6', explanation: '3! = 6' }
    ],
    constraints: [
      { description: '0 <= n <= 12' }
    ],
    relatedConcepts: ['Recursion', 'Loops'],
    hints: [
      { level: 1, content: 'Use a loop or recursion.' },
      { level: 2, content: 'Multiply all numbers from 1 to n.' }
    ],
    walkthrough: 'To calculate factorial, multiply all numbers from 1 to n.',
    commonMistakes: ['Not handling n=0 correctly.'],
    solutionCode: { java: 'public static int factorial(int n) {\n    int res = 1;\n    for (int i = 2; i <= n; i++) res *= i;\n    return res;\n}' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '5', expectedOutput: '120\n' },
      { input: '3', expectedOutput: '6\n' }
    ]
  },
  // Unique JavaScript Question
  {
    id: 'js-unique-1',
    title: 'Filter Even Numbers (JavaScript)',
    description: 'Write a function that returns a new array containing only the even numbers from the input array.',
    topicId: 'javascript-arrays',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: 'const readline = require("readline");\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nfunction filterEven(arr) {\n  // Write your code here\n  return [];\n}\n\nrl.on("line", (line) => {\n  // Parse input like "nums = [1,2,3,4,5,6]" to get the array\n  const match = line.match(/nums = \\[(.*?)\\]/);\n  if (match) {\n    const nums = match[1].split(",").map(Number);\n    const result = filterEven(nums);\n    console.log(JSON.stringify(result));\n  }\n  rl.close();\n});'
    },
    difficulty: 'Easy',
    tags: ['array', 'filter'],
    acceptanceRate: 91,
    examples: [
      { input: 'nums = [1,2,3,4,5,6]', output: '[2, 4, 6]', explanation: 'Only even numbers are kept.' },
      { input: 'nums = [7,8,9]', output: '[8]', explanation: 'Only 8 is even.' }
    ],
    constraints: [
      { description: '1 <= arr.length <= 100' }
    ],
    relatedConcepts: ['Array Methods', 'Filter'],
    hints: [
      { level: 1, content: 'Use the filter method.' },
      { level: 2, content: 'Check if a number is even using n % 2 === 0.' }
    ],
    walkthrough: 'Use arr.filter(n => n % 2 === 0) to get even numbers.',
    commonMistakes: ['Returning odd numbers instead of even.'],
    solutionCode: { javascript: 'function filterEven(arr) { return arr.filter(n => n % 2 === 0); }' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: 'nums = [1,2,3,4,5,6]', expectedOutput: '[2,4,6]\n' },
      { input: 'nums = [7,8,9]', expectedOutput: '[8]\n' }
    ]
  },
  // Unique C++ Question
  {
    id: 'cpp-unique-1',
    title: 'Find Maximum in Array (C++)',
    description: 'Write a function that returns the maximum value in an array of integers.',
    topicId: 'cpp-arrays',
    language: 'cpp',
    languageId: 54,
    starterCode: {
      cpp: '#include <iostream>\n#include <vector>\n#include <sstream>\n#include <string>\nusing namespace std;\n\nint findMax(const vector<int>& arr) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    \n    // Parse input like "nums = [1, 5, 3, 9, 2]"\n    size_t start = line.find("[");\n    size_t end = line.find("]");\n    if (start != string::npos && end != string::npos) {\n        string numsStr = line.substr(start + 1, end - start - 1);\n        stringstream ss(numsStr);\n        vector<int> nums;\n        string token;\n        while (getline(ss, token, \',\')) {\n            nums.push_back(stoi(token));\n        }\n        \n        int result = findMax(nums);\n        cout << result << endl;\n    }\n    \n    return 0;\n}'
    },
    difficulty: 'Easy',
    tags: ['array', 'maximum'],
    acceptanceRate: 88,
    examples: [
      { input: 'nums = [1, 5, 3, 9, 2]', output: '9', explanation: '9 is the largest.' },
      { input: 'nums = [-1, -5, -3]', output: '-1', explanation: '-1 is the largest.' }
    ],
    constraints: [
      { description: '1 <= arr.length <= 100' }
    ],
    relatedConcepts: ['Arrays', 'Loops'],
    hints: [
      { level: 1, content: 'Iterate through the array.' },
      { level: 2, content: 'Keep track of the maximum value.' }
    ],
    walkthrough: 'Initialize max to arr[0] and update as you iterate.',
    commonMistakes: ['Not initializing max correctly.'],
    solutionCode: { cpp: 'int findMax(const vector<int>& arr) { int m = arr[0]; for (int x : arr) if (x > m) m = x; return m; }' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'nums = [1, 5, 3, 9, 2]', expectedOutput: '9\n' },
      { input: 'nums = [-1, -5, -3]', expectedOutput: '-1\n' }
    ]
  },
  // Unique C Question
  {
    id: 'c-unique-1',
    title: 'Count Vowels in a String (C)',
    description: 'Write a function that counts the number of vowels in a given string.',
    topicId: 'c-strings',
    language: 'c',
    languageId: 50,
    starterCode: {
      c: '#include <stdio.h>\n#include <string.h>\n\nint countVowels(const char* s) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    char s[101];\n    scanf("%s", s);\n    int result = countVowels(s);\n    printf("%d\\n", result);\n    return 0;\n}'
    },
    difficulty: 'Easy',
    tags: ['string', 'vowel'],
    acceptanceRate: 86,
    examples: [
      { input: 'hello', output: '2', explanation: 'e and o are vowels.' },
      { input: 'rhythm', output: '0', explanation: 'No vowels.' }
    ],
    constraints: [
      { description: '1 <= len(s) <= 100' }
    ],
    relatedConcepts: ['Strings', 'Loops'],
    hints: [
      { level: 1, content: 'Iterate through the string.' },
      { level: 2, content: 'Check if each character is a vowel.' }
    ],
    walkthrough: 'Loop through the string and count a, e, i, o, u.',
    commonMistakes: ['Not checking for both uppercase and lowercase vowels.'],
    solutionCode: { c: 'int countVowels(const char* s) { int c = 0; for (int i = 0; s[i]; i++) { char ch = s[i]|32; if (ch==\'a\'||ch==\'e\'||ch==\'i\'||ch==\'o\'||ch==\'u\') c++; } return c; }' },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'hello', expectedOutput: '2\n' },
      { input: 'rhythm', expectedOutput: '0\n' }
    ]
  }
];