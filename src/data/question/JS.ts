export const js = [
  {
    id: 'js-1',
    title: 'Sum of Two Numbers (JavaScript)',
    description: 'Write a function that returns the sum of two numbers.',
    topicId: 'javascript-basics',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nfunction sumTwo(a, b) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const [a, b] = line.split(" ").map(Number);\n  const result = sumTwo(a, b);\n  console.log(result);\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['math', 'function'],
    acceptanceRate: 92,
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
    solutionCode: { javascript: 'function sumTwo(a, b) { return a + b; }' },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '2 3', expectedOutput: '5\n' },
      { input: '10 20', expectedOutput: '30\n' },
    ],
  },
  {
    id: 'js-2',
    title: 'Multiply Two Numbers (JavaScript)',
    description: 'Write a function that returns the product of two numbers.',
    topicId: 'javascript-basics',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction multiplyTwo(a, b) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const [a, b] = line.split(" ").map(Number);\n  const result = multiplyTwo(a, b);\n  console.log(result);\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['math', 'function'],
    acceptanceRate: 93,
    examples: [
      { input: '4 5', output: '20', explanation: '4 * 5 = 20' },
      { input: '7 8', output: '56', explanation: '7 * 8 = 56' },
    ],
    constraints: [{ description: '1 <= a, b <= 1000' }],
    relatedConcepts: ['Multiplication', 'Functions'],
    hints: [
      { level: 1, content: 'Use the * operator.' },
      { level: 2, content: 'Return a * b.' },
    ],
    walkthrough: 'Multiply the two inputs and return the result.',
    commonMistakes: ['Returning a + b instead of a * b.'],
    solutionCode: {
      javascript: 'function multiplyTwo(a, b) { return a * b; }',
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '4 5', expectedOutput: '20\n' },
      { input: '7 8', expectedOutput: '56\n' },
    ],
  },
  {
    id: 'js-3',
    title: 'Reverse a String',
    description: 'Given a string, return its reverse.',
    topicId: 'strings-basics',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction reverseString(s) {\n  // Write your code here\n  return s;\n}\n\nrl.on("line", (line) => {\n  const result = reverseString(line.trim());\n  console.log(result);\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['string', 'two-pointers'],
    acceptanceRate: 90,
    examples: [
      {
        input: 'hello',
        output: 'olleh',
        explanation: 'Reverse character order.',
      },
      { input: 'abc', output: 'cba', explanation: 'Reverse character order.' },
    ],
    constraints: [{ description: '1 <= |s| <= 10^5' }],
    relatedConcepts: ['Strings', 'Iteration'],
    hints: [
      { level: 1, content: 'Convert to array, reverse, and join.' },
      { level: 2, content: 'Or iterate from end to start.' },
    ],
    walkthrough: "Use built-in methods: split(''), reverse(), and join('').",
    commonMistakes: ['Forgetting to trim newline characters from input.'],
    solutionCode: {
      javascript:
        "function reverseString(s) { return s.split('').reverse().join(''); }",
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: 'hello', expectedOutput: 'olleh\n' },
      { input: 'abc', expectedOutput: 'cba\n' },
    ],
  },
  {
    id: 'js-4',
    title: 'Check Palindrome',
    description:
      'Determine if a given string is a palindrome (reads the same forwards and backwards).',
    topicId: 'strings-basics',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction isPalindrome(s) {\n  // Write your code here\n  return false;\n}\n\nrl.on("line", (line) => {\n  const s = line.trim();\n  const result = isPalindrome(s);\n  console.log(result ? "true" : "false");\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['string', 'two-pointers'],
    acceptanceRate: 88,
    examples: [
      {
        input: 'madam',
        output: 'true',
        explanation: "'madam' is the same reversed.",
      },
      { input: 'hello', output: 'false', explanation: 'Not a palindrome.' },
    ],
    constraints: [{ description: '1 <= |s| <= 10^5, lowercase letters only' }],
    relatedConcepts: ['Two Pointers', 'Strings'],
    hints: [
      { level: 1, content: 'Compare characters from both ends.' },
      { level: 2, content: 'Stop early if a mismatch is found.' },
    ],
    walkthrough:
      'Use two indices i and j; move towards the center comparing chars.',
    commonMistakes: ['Not converting to a common case if input can vary.'],
    solutionCode: {
      javascript:
        'function isPalindrome(s) { let i=0,j=s.length-1; while(i<j){ if(s[i]!==s[j]) return false; i++; j--; } return true; }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'madam', expectedOutput: 'true\n' },
      { input: 'hello', expectedOutput: 'false\n' },
    ],
  },
  {
    id: 'js-5',
    title: 'Sum of Array Elements',
    description:
      'Given a list of integers separated by spaces, return their sum.',
    topicId: 'arrays-basics',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction arraySum(arr) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const arr = line.trim().split(" ").map(Number);\n  const result = arraySum(arr);\n  console.log(result);\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['array', 'reduce'],
    acceptanceRate: 94,
    examples: [
      { input: '1 2 3 4', output: '10', explanation: '1+2+3+4' },
      { input: '5 5 5', output: '15', explanation: '5+5+5' },
    ],
    constraints: [{ description: '1 <= n <= 10^5, -10^9 <= ai <= 10^9' }],
    relatedConcepts: ['Arrays', 'Iteration', 'Reduce'],
    hints: [
      { level: 1, content: 'Use Array.prototype.reduce.' },
      { level: 2, content: 'Initialize accumulator with 0.' },
    ],
    walkthrough: 'Split input, map to numbers, reduce with (a, b) => a + b.',
    commonMistakes: [
      'Forgetting Number conversion, causing string concatenation.',
    ],
    solutionCode: {
      javascript: 'function arraySum(arr) { return arr.reduce((a,b)=>a+b,0); }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '1 2 3 4', expectedOutput: '10\n' },
      { input: '5 5 5', expectedOutput: '15\n' },
    ],
  },
  {
    id: 'js-6',
    title: 'Find Maximum',
    description:
      'Return the maximum number from a space-separated list of integers.',
    topicId: 'arrays-basics',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction findMax(arr) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const arr = line.trim().split(" ").map(Number);\n  console.log(findMax(arr));\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['array', 'math'],
    acceptanceRate: 91,
    examples: [
      { input: '1 9 2 8', output: '9', explanation: 'Max is 9' },
      { input: '7 7 7', output: '7', explanation: 'All are equal' },
    ],
    constraints: [{ description: '1 <= n <= 10^5, -10^9 <= ai <= 10^9' }],
    relatedConcepts: ['Arrays', 'Math.max'],
    hints: [
      { level: 1, content: 'Track the max while iterating.' },
      { level: 2, content: 'Avoid spreading very large arrays into Math.max.' },
    ],
    walkthrough: 'Initialize max with -Infinity and update for each element.',
    commonMistakes: [
      'Using Math.max(...arr) on huge arrays may hit call stack limits.',
    ],
    solutionCode: {
      javascript:
        'function findMax(arr){ let m=-Infinity; for(const x of arr){ if(x>m) m=x; } return m; }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '1 9 2 8', expectedOutput: '9\n' },
      { input: '7 7 7', expectedOutput: '7\n' },
    ],
  },
  {
    id: 'js-7',
    title: 'Count Vowels',
    description:
      'Count the number of vowels (a, e, i, o, u) in a given lowercase string.',
    topicId: 'strings-counting',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction countVowels(s) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const s = line.trim();\n  console.log(countVowels(s));\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['string', 'counting'],
    acceptanceRate: 92,
    examples: [
      { input: 'javascript', output: '3', explanation: 'a,a,i -> 3' },
      { input: 'bcdfg', output: '0', explanation: 'No vowels' },
    ],
    constraints: [{ description: '1 <= |s| <= 10^5, lowercase letters only' }],
    relatedConcepts: ['Strings', 'Sets'],
    hints: [
      { level: 1, content: 'Check membership in a set of vowels.' },
      { level: 2, content: 'Iterate once and increment a counter.' },
    ],
    walkthrough:
      "Use a Set('a','e','i','o','u'); count matches while iterating.",
    commonMistakes: [
      'Counting uppercase vowels when input is defined as lowercase.',
    ],
    solutionCode: {
      javascript:
        "function countVowels(s){ const v=new Set(['a','e','i','o','u']); let c=0; for(const ch of s){ if(v.has(ch)) c++; } return c; }",
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'javascript', expectedOutput: '3\n' },
      { input: 'bcdfg', expectedOutput: '0\n' },
    ],
  },
  {
    id: 'js-8',
    title: 'Factorial of a Number',
    description: 'Compute n! (n factorial).',
    topicId: 'math-factorial',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction factorial(n) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const n = Number(line.trim());\n  console.log(factorial(n));\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['math', 'loop'],
    acceptanceRate: 89,
    examples: [
      { input: '5', output: '120', explanation: '5*4*3*2*1' },
      { input: '0', output: '1', explanation: 'By definition 0! = 1' },
    ],
    constraints: [
      { description: '0 <= n <= 20 (to avoid overflow in 64-bit range)' },
    ],
    relatedConcepts: ['Loops', 'Math'],
    hints: [
      { level: 1, content: 'Multiply numbers from 1 to n.' },
      { level: 2, content: 'Handle n=0 as a special case.' },
    ],
    walkthrough: 'Iteratively multiply an accumulator from 1..n.',
    commonMistakes: ['Returning 0 for n=0.'],
    solutionCode: {
      javascript:
        'function factorial(n){ let ans=1; for(let i=2;i<=n;i++) ans*=i; return ans; }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '5', expectedOutput: '120\n' },
      { input: '0', expectedOutput: '1\n' },
    ],
  },
  {
    id: 'js-9',
    title: 'Nth Fibonacci Number',
    description: 'Return the n-th Fibonacci number where F0 = 0 and F1 = 1.',
    topicId: 'math-fibonacci',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction fib(n) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const n = Number(line.trim());\n  console.log(fib(n));\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['math', 'dp'],
    acceptanceRate: 86,
    examples: [
      { input: '0', output: '0', explanation: 'Base case' },
      { input: '7', output: '13', explanation: 'Sequence: 0,1,1,2,3,5,8,13' },
    ],
    constraints: [{ description: '0 <= n <= 50' }],
    relatedConcepts: ['Dynamic Programming', 'Iteration'],
    hints: [
      { level: 1, content: 'Use iterative DP with two variables.' },
      { level: 2, content: 'Avoid exponential recursion.' },
    ],
    walkthrough: 'Keep two rolling values for F(i-2) and F(i-1).',
    commonMistakes: ['Using naive recursion causing timeouts.'],
    solutionCode: {
      javascript:
        'function fib(n){ if(n<2) return n; let a=0,b=1; for(let i=2;i<=n;i++){ [a,b]=[b,a+b]; } return b; }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '0', expectedOutput: '0\n' },
      { input: '7', expectedOutput: '13\n' },
    ],
  },
  {
    id: 'js-10',
    title: 'Remove Duplicates',
    description:
      'Given space-separated integers, return them without duplicates while preserving first occurrence order.',
    topicId: 'arrays-sets',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction uniqueInOrder(arr) {\n  // Write your code here\n  return arr;\n}\n\nrl.on("line", (line) => {\n  const arr = line.trim().split(" ").map(Number);\n  const res = uniqueInOrder(arr);\n  console.log(res.join(" "));\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['array', 'set'],
    acceptanceRate: 87,
    examples: [
      {
        input: '1 2 2 3 1',
        output: '1 2 3',
        explanation: 'Keep first occurrences',
      },
      { input: '4 4 4', output: '4', explanation: 'Only one 4' },
    ],
    constraints: [{ description: '1 <= n <= 10^5, -10^9 <= ai <= 10^9' }],
    relatedConcepts: ['Sets', 'Maps'],
    hints: [
      { level: 1, content: 'Track seen numbers in a Set.' },
      { level: 2, content: 'Push element only if not seen.' },
    ],
    walkthrough: 'Iterate array; maintain a Set of seen; build result list.',
    commonMistakes: ['Sorting the array, which changes order.'],
    solutionCode: {
      javascript:
        'function uniqueInOrder(arr){ const seen=new Set(); const out=[]; for(const x of arr){ if(!seen.has(x)){ seen.add(x); out.push(x); } } return out; }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '1 2 2 3 1', expectedOutput: '1 2 3\n' },
      { input: '4 4 4', expectedOutput: '4\n' },
    ],
  },
  {
    id: 'js-11',
    title: 'Anagram Check',
    description:
      'Given two lowercase strings separated by a space, determine if they are anagrams.',
    topicId: 'strings-hashmap',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction areAnagrams(a, b) {\n  // Write your code here\n  return false;\n}\n\nrl.on("line", (line) => {\n  const [a,b] = line.trim().split(" ");\n  console.log(areAnagrams(a,b) ? "true" : "false");\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['string', 'hashmap'],
    acceptanceRate: 85,
    examples: [
      {
        input: 'listen silent',
        output: 'true',
        explanation: 'Same letters with same counts',
      },
      { input: 'rat car', output: 'false', explanation: 'Counts differ' },
    ],
    constraints: [
      { description: '1 <= |a|, |b| <= 10^5, lowercase letters only' },
    ],
    relatedConcepts: ['Hash Maps', 'Counting'],
    hints: [
      { level: 1, content: 'Lengths must match.' },
      {
        level: 2,
        content: 'Count characters in one and subtract using the other.',
      },
    ],
    walkthrough:
      'Use an array of size 26 or Map to count character frequencies.',
    commonMistakes: ['Sorting with O(n log n) when O(n) counting suffices.'],
    solutionCode: {
      javascript:
        'function areAnagrams(a,b){ if(a.length!==b.length) return false; const cnt=new Array(26).fill(0); for(const ch of a) cnt[ch.charCodeAt(0)-97]++; for(const ch of b){ const i=ch.charCodeAt(0)-97; if(--cnt[i]<0) return false; } return true; }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'listen silent', expectedOutput: 'true\n' },
      { input: 'rat car', expectedOutput: 'false\n' },
    ],
  },
  {
    id: 'js-12',
    title: 'Second Largest Element',
    description:
      "Find the second largest distinct number in a list. If it doesn't exist, print 'NA'.",
    topicId: 'arrays-selection',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction secondLargest(arr) {\n  // Write your code here\n  return null;\n}\n\nrl.on("line", (line) => {\n  const arr = line.trim().split(" ").map(Number);\n  const ans = secondLargest(arr);\n  console.log(ans===null ? "NA" : ans);\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['array', 'selection'],
    acceptanceRate: 84,
    examples: [
      {
        input: '1 3 2 4',
        output: '3',
        explanation: 'Distinct values: 1,2,3,4 -> second largest is 3',
      },
      { input: '5 5 5', output: 'NA', explanation: 'No second distinct value' },
    ],
    constraints: [{ description: '1 <= n <= 10^5' }],
    relatedConcepts: ['Scanning', 'Conditionals'],
    hints: [
      {
        level: 1,
        content: 'Track largest and second largest while iterating.',
      },
      { level: 2, content: 'Update carefully when encountering equal values.' },
    ],
    walkthrough: 'Maintain two variables: max and secondMax (distinct).',
    commonMistakes: ['Not handling duplicates properly.'],
    solutionCode: {
      javascript:
        'function secondLargest(arr){ let m1=-Infinity,m2=-Infinity; for(const x of arr){ if(x>m1){ m2=m1; m1=x; } else if(x<m1 && x>m2){ m2=x; } } return m2===-Infinity?null:m2; }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '1 3 2 4', expectedOutput: '3\n' },
      { input: '5 5 5', expectedOutput: 'NA\n' },
    ],
  },
  {
    id: 'js-13',
    title: 'Balanced Parentheses',
    description:
      "Given a string of parentheses '()[]{}', determine if it is valid (properly nested and closed).",
    topicId: 'stacks-parentheses',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction isValid(s) {\n  // Write your code here\n  return false;\n}\n\nrl.on("line", (line) => {\n  const s = line.trim();\n  console.log(isValid(s) ? "true" : "false");\n  rl.close();\n});',
    },
    difficulty: 'Medium',
    tags: ['stack', 'string'],
    acceptanceRate: 79,
    examples: [
      { input: '()[]{}', output: 'true', explanation: 'All pairs match' },
      { input: '(]', output: 'false', explanation: 'Mismatched' },
    ],
    constraints: [{ description: '0 <= |s| <= 10^5' }],
    relatedConcepts: ['Stacks', 'Hash Maps'],
    hints: [
      { level: 1, content: 'Push opening brackets onto a stack.' },
      { level: 2, content: 'When you see a closing bracket, check the top.' },
    ],
    walkthrough: 'Use a stack and a map of closing->opening brackets.',
    commonMistakes: ['Forgetting to check if stack is empty at the end.'],
    solutionCode: {
      javascript:
        "function isValid(s){ const st=[]; const m={')':'(',']':'[','}':'{'}; for(const ch of s){ if(ch==='('||ch==='['||ch==='{') st.push(ch); else { if(!st.length||st.pop()!==m[ch]) return false; } } return st.length===0; }",
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '()[]{}', expectedOutput: 'true\n' },
      { input: '(]', expectedOutput: 'false\n' },
    ],
  },
  {
    id: 'js-14',
    title: 'Capitalize Each Word',
    description:
      'Capitalize the first letter of every word in a sentence. Words are separated by spaces.',
    topicId: 'strings-formatting',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction titleCase(s) {\n  // Write your code here\n  return s;\n}\n\nrl.on("line", (line) => {\n  console.log(titleCase(line.trim()));\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['string', 'formatting'],
    acceptanceRate: 91,
    examples: [
      {
        input: 'hello world',
        output: 'Hello World',
        explanation: 'Capitalize each word',
      },
      {
        input: 'javaScript is fun',
        output: 'JavaScript Is Fun',
        explanation: 'Respect rest of the word',
      },
    ],
    constraints: [{ description: '0 <= |s| <= 10^5' }],
    relatedConcepts: ['Strings', 'Split/Join'],
    hints: [
      { level: 1, content: 'Split by spaces, map, then join.' },
      { level: 2, content: 'For empty words, keep as is.' },
    ],
    walkthrough:
      'Split on spaces; for each word, uppercase first char + remainder.',
    commonMistakes: ['Not handling multiple spaces.'],
    solutionCode: {
      javascript:
        "function titleCase(s){ return s.split(' ').map(w=>w? w[0].toUpperCase()+w.slice(1): w).join(' '); }",
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: 'hello world', expectedOutput: 'Hello World\n' },
      { input: 'javaScript is fun', expectedOutput: 'JavaScript Is Fun\n' },
    ],
  },
  {
    id: 'js-15',
    title: 'Sum of Even Numbers',
    description: 'Return the sum of even integers from a space-separated list.',
    topicId: 'arrays-filter-reduce',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction sumEven(arr) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  const arr = line.trim().split(" ").map(Number);\n  console.log(sumEven(arr));\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['array', 'filter', 'reduce'],
    acceptanceRate: 92,
    examples: [
      { input: '1 2 3 4 5 6', output: '12', explanation: '2+4+6' },
      { input: '7 9', output: '0', explanation: 'No evens' },
    ],
    constraints: [{ description: '1 <= n <= 10^5, -10^9 <= ai <= 10^9' }],
    relatedConcepts: ['Filter', 'Reduce'],
    hints: [
      { level: 1, content: 'Filter evens first.' },
      { level: 2, content: 'Then reduce the filtered array.' },
    ],
    walkthrough: 'Use arr.filter(x => x % 2 === 0).reduce((a,b)=>a+b,0).',
    commonMistakes: ['Using x%2==1 which fails for negatives.'],
    solutionCode: {
      javascript:
        'function sumEven(arr){ return arr.filter(x=>x%2===0).reduce((a,b)=>a+b,0); }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '1 2 3 4 5 6', expectedOutput: '12\n' },
      { input: '7 9', expectedOutput: '0\n' },
    ],
  },
  {
    id: 'js-16',
    title: 'Longest Word Length',
    description: 'Given a sentence, return the length of its longest word.',
    topicId: 'strings-parsing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\nfunction longestWordLen(s) {\n  // Write your code here\n  return 0;\n}\n\nrl.on("line", (line) => {\n  console.log(longestWordLen(line.trim()));\n  rl.close();\n});',
    },
    difficulty: 'Easy',
    tags: ['string', 'parsing'],
    acceptanceRate: 90,
    examples: [
      {
        input: 'I love programming',
        output: '11',
        explanation: "'programming' has length 11",
      },
      { input: 'to be or not', output: '3', explanation: "'not' length 3" },
    ],
    constraints: [{ description: '0 <= |s| <= 10^5' }],
    relatedConcepts: ['Split', 'Iteration'],
    hints: [
      { level: 1, content: 'Split by spaces and track max length.' },
      { level: 2, content: 'Handle empty input.' },
    ],
    walkthrough: 'Split, map to lengths, take Math.max with 0 default.',
    commonMistakes: ['Not handling multiple spaces or empty string.'],
    solutionCode: {
      javascript:
        "function longestWordLen(s){ if(!s) return 0; let m=0; for(const w of s.split(' ')){ if(w.length>m) m=w.length; } return m; }",
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'I love programming', expectedOutput: '11\n' },
      { input: 'to be or not', expectedOutput: '3\n' },
    ],
  },
  {
    id: 'js-17',
    title: 'Array Rotation (Right by k)',
    description: 'Rotate an array to the right by k steps.',
    topicId: 'arrays-rotation',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript:
        'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\n// Input format: first line: array elements; second line: k\nfunction rotateRight(arr, k) {\n  // Write your code here\n  return arr;\n}\n\nlet lines=[];\nrl.on("line", (line)=>{ lines.push(line.trim()); if(lines.length===2){\n  const arr = lines[0].split(" ").map(Number);\n  const k = Number(lines[1]);\n  const res = rotateRight(arr, k);\n  console.log(res.join(" "));\n  rl.close();\n}});',
    },
    difficulty: 'Medium',
    tags: ['array', 'in-place'],
    acceptanceRate: 78,
    examples: [
      {
        input: '1 2 3 4 5\n2',
        output: '4 5 1 2 3',
        explanation: 'Rotate right by 2',
      },
      { input: '1 2\n3', output: '2 1', explanation: 'k mod n' },
    ],
    constraints: [{ description: '1 <= n <= 10^5, 0 <= k <= 10^9' }],
    relatedConcepts: ['Modular Arithmetic', 'Reverse'],
    hints: [
      { level: 1, content: 'Use k %= n.' },
      { level: 2, content: 'Consider reverse-then-reverse method.' },
    ],
    walkthrough: 'k %= n; reverse entire array; reverse first k; reverse rest.',
    commonMistakes: ['Not applying k modulo n.'],
    solutionCode: {
      javascript:
        'function rotateRight(arr,k){ const n=arr.length; if(n===0) return arr; k%=n; if(k===0) return arr; const rev=(a,l,r)=>{ while(l<r){ [a[l],a[r]]=[a[r],a[l]]; l++; r--; } }; rev(arr,0,n-1); rev(arr,0,k-1); rev(arr,k,n-1); return arr; }',
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '1 2 3 4 5\n2', expectedOutput: '4 5 1 2 3\n' },
      { input: '1 2\n3', expectedOutput: '2 1\n' },
    ],
  },
]
