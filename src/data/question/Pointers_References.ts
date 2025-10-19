export const pointersReferences = [
  {
    id: 'pointers-references-1',
    title: 'Valid Palindrome',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
    topicId: 'pointers-references',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isPalindrome(s) {
  // Write your code here
  return false;
}

rl.on("line", (line) => {
  const s = line.trim();
  const result = isPalindrome(s);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      python: `s = input()

def isPalindrome(s):
    # Write your code here
    pass

result = isPalindrome(s)
print("true" if result else "false")`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static boolean isPalindrome(String s) {
        // Write your code here
        return false;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine();
        
        boolean result = isPalindrome(s);
        System.out.println(result ? "true" : "false");
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    // Write your code here
    return false;
}

int main() {
    string s;
    getline(cin, s);
    
    bool result = isPalindrome(s);
    cout << (result ? "true" : "false") << endl;
    
    return 0;
}`
    },
    difficulty: 'Easy',
    tags: ['string', 'two-pointers'],
    acceptanceRate: 87,
    examples: [
      {
        input: '"A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: 'After removing non-alphanumeric characters: "amanaplanacanalpanama" which is a palindrome.'
      },
      {
        input: '"race a car"',
        output: 'false',
        explanation: 'After cleaning: "raceacar" which is not a palindrome.'
      },
      {
        input: '" "',
        output: 'true',
        explanation: 'Empty string after cleaning is considered a palindrome.'
      }
    ],
    constraints: [
      { description: '1 <= s.length <= 2 * 10^5' },
      { description: 's consists only of printable ASCII characters.' }
    ],
    relatedConcepts: ['Two Pointers', 'String Processing'],
    hints: [
      { level: 1, content: 'Use two pointers from both ends of the string.' },
      { level: 2, content: 'Skip non-alphanumeric characters while comparing.' },
      { level: 3, content: 'Compare characters in lowercase.' }
    ],
    walkthrough: 'Use two pointers starting from both ends. Skip non-alphanumeric characters and compare lowercase characters.',
    commonMistakes: [
      'Not handling non-alphanumeric characters properly.',
      'Case sensitivity issues.'
    ],
    solutionCode: {
      javascript: 'function isPalindrome(s) { let left = 0, right = s.length - 1; while (left < right) { while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++; while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--; if (s[left].toLowerCase() !== s[right].toLowerCase()) return false; left++; right--; } return true; }',
      python: 'def isPalindrome(s): left, right = 0, len(s) - 1; while left < right: while left < right and not s[left].isalnum(): left += 1; while left < right and not s[right].isalnum(): right -= 1; if s[left].lower() != s[right].lower(): return False; left += 1; right -= 1; return True',
      java: 'public static boolean isPalindrome(String s) { int left = 0, right = s.length() - 1; while (left < right) { while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++; while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--; if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false; left++; right--; } return true; }',
      cpp: 'bool isPalindrome(string s) { int left = 0, right = s.length() - 1; while (left < right) { while (left < right && !isalnum(s[left])) left++; while (left < right && !isalnum(s[right])) right--; if (tolower(s[left]) != tolower(s[right])) return false; left++; right--; } return true; }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true\n' },
      { input: '"race a car"', expectedOutput: 'false\n' },
      { input: '" "', expectedOutput: 'true\n' }
    ]
  },
  {
    id: 'pointers-references-2',
    title: 'Two Sum II - Input Array Is Sorted',
    description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.',
    topicId: 'pointers-references',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function twoSum(numbers, target) {
  // Write your code here
  return [];
}

rl.on("line", (line) => {
  const [numbersStr, targetStr] = line.split(" | ");
  const numbers = JSON.parse(numbersStr);
  const target = parseInt(targetStr);
  const result = twoSum(numbers, target);
  console.log(JSON.stringify(result));
  rl.close();
});`,
      python: `numbers, target = input().split(" | ")
numbers = eval(numbers)
target = int(target)

def twoSum(numbers, target):
    # Write your code here
    pass

result = twoSum(numbers, target)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int[] twoSum(int[] numbers, int target) {
        // Write your code here
        return new int[]{};
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String numbersStr = parts[0];
        int target = Integer.parseInt(parts[1]);
        
        numbersStr = numbersStr.replace("[", "").replace("]", "");
        String[] numStrings = numbersStr.split(",");
        int[] numbers = new int[numStrings.length];
        for (int i = 0; i < numStrings.length; i++) {
            numbers[i] = Integer.parseInt(numStrings[i].trim());
        }
        
        int[] result = twoSum(numbers, target);
        System.out.println(Arrays.toString(result));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

vector<int> twoSum(vector<int>& numbers, int target) {
    // Write your code here
    return {};
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string numbersStr = line.substr(0, pipePos);
    int target = stoi(line.substr(pipePos + 3));
    
    numbersStr = numbersStr.substr(1, numbersStr.length() - 2); // Remove [ and ]
    stringstream ss(numbersStr);
    vector<int> numbers;
    string token;
    while (getline(ss, token, ',')) {
        numbers.push_back(stoi(token));
    }
    
    vector<int> result = twoSum(numbers, target);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}`
    },
    difficulty: 'Easy',
    tags: ['array', 'two-pointers', 'binary-search'],
    acceptanceRate: 89,
    examples: [
      {
        input: '[2,7,11,15] | 9',
        output: '[1,2]',
        explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].'
      },
      {
        input: '[2,3,4] | 6',
        output: '[1,3]',
        explanation: 'The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].'
      },
      {
        input: '[-1,0] | -1',
        output: '[1,2]',
        explanation: 'The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].'
      }
    ],
    constraints: [
      { description: '2 <= numbers.length <= 3 * 10^4' },
      { description: '-1000 <= numbers[i] <= 1000' },
      { description: 'numbers is sorted in non-decreasing order.' },
      { description: '-1000 <= target <= 1000' },
      { description: 'The tests are generated such that there is exactly one solution.' }
    ],
    relatedConcepts: ['Two Pointers', 'Sorted Array'],
    hints: [
      { level: 1, content: 'Use two pointers: one at the beginning and one at the end.' },
      { level: 2, content: 'Move pointers based on whether the sum is greater or less than target.' },
      { level: 3, content: 'Since array is sorted, you can eliminate half the possibilities each time.' }
    ],
    walkthrough: 'Use two pointers from both ends. If sum is too large, move right pointer left. If too small, move left pointer right.',
    commonMistakes: [
      'Returning 0-based indices instead of 1-based.',
      'Not handling the sorted array property efficiently.'
    ],
    solutionCode: {
      javascript: 'function twoSum(numbers, target) { let left = 0, right = numbers.length - 1; while (left < right) { const sum = numbers[left] + numbers[right]; if (sum === target) return [left + 1, right + 1]; else if (sum < target) left++; else right--; } return []; }',
      python: 'def twoSum(numbers, target): left, right = 0, len(numbers) - 1; while left < right: sum_val = numbers[left] + numbers[right]; if sum_val == target: return [left + 1, right + 1]; elif sum_val < target: left += 1; else: right -= 1; return []',
      java: 'public static int[] twoSum(int[] numbers, int target) { int left = 0, right = numbers.length - 1; while (left < right) { int sum = numbers[left] + numbers[right]; if (sum == target) return new int[]{left + 1, right + 1}; else if (sum < target) left++; else right--; } return new int[]{}; }',
      cpp: 'vector<int> twoSum(vector<int>& numbers, int target) { int left = 0, right = numbers.size() - 1; while (left < right) { int sum = numbers[left] + numbers[right]; if (sum == target) return {left + 1, right + 1}; else if (sum < target) left++; else right--; } return {}; }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[2,7,11,15] | 9', expectedOutput: '[1,2]\n' },
      { input: '[2,3,4] | 6', expectedOutput: '[1,3]\n' },
      { input: '[-1,0] | -1', expectedOutput: '[1,2]\n' }
    ]
  },
  {
    id: 'pointers-references-3',
    title: '3Sum',
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
    topicId: 'pointers-references',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function threeSum(nums) {
  // Write your code here
  return [];
}

rl.on("line", (line) => {
  const nums = JSON.parse(line);
  const result = threeSum(nums);
  console.log(JSON.stringify(result));
  rl.close();
});`,
      python: `nums = eval(input())

def threeSum(nums):
    # Write your code here
    pass

result = threeSum(nums)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static List<List<Integer>> threeSum(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String numsStr = br.readLine();
        numsStr = numsStr.replace("[", "").replace("]", "");
        String[] numStrings = numsStr.split(",");
        int[] nums = new int[numStrings.length];
        for (int i = 0; i < numStrings.length; i++) {
            nums[i] = Integer.parseInt(numStrings[i].trim());
        }
        
        List<List<Integer>> result = threeSum(nums);
        System.out.println(result.toString());
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <string>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    // Write your code here
    return {};
}

int main() {
    string line;
    getline(cin, line);
    
    line = line.substr(1, line.length() - 2); // Remove [ and ]
    stringstream ss(line);
    vector<int> nums;
    string token;
    while (getline(ss, token, ',')) {
        nums.push_back(stoi(token));
    }
    
    vector<vector<int>> result = threeSum(nums);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << "[";
        for (int j = 0; j < result[i].size(); j++) {
            cout << result[i][j];
            if (j < result[i].size() - 1) cout << ",";
        }
        cout << "]";
        if (i < result.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['array', 'two-pointers', 'sorting'],
    acceptanceRate: 72,
    examples: [
      {
        input: '[-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'The distinct triplets that sum to zero are [-1,-1,2] and [-1,0,1].'
      },
      {
        input: '[0,1,1]',
        output: '[]',
        explanation: 'The only possible triplet does not sum up to 0.'
      },
      {
        input: '[0,0,0]',
        output: '[[0,0,0]]',
        explanation: 'The only possible triplet sums to 0.'
      }
    ],
    constraints: [
      { description: '3 <= nums.length <= 3000' },
      { description: '-10^5 <= nums[i] <= 10^5' }
    ],
    relatedConcepts: ['Two Pointers', 'Sorting', 'Duplicate Handling'],
    hints: [
      { level: 1, content: 'Sort the array first to enable two-pointer technique.' },
      { level: 2, content: 'Fix one element and use two pointers for the remaining two.' },
      { level: 3, content: 'Skip duplicates to avoid duplicate triplets.' }
    ],
    walkthrough: 'Sort array, fix first element, use two pointers for remaining elements. Skip duplicates.',
    commonMistakes: [
      'Not handling duplicates properly.',
      'Incorrect two-pointer logic.'
    ],
    solutionCode: {
      javascript: 'function threeSum(nums) { nums.sort((a, b) => a - b); const result = []; for (let i = 0; i < nums.length - 2; i++) { if (i > 0 && nums[i] === nums[i-1]) continue; let left = i + 1, right = nums.length - 1; while (left < right) { const sum = nums[i] + nums[left] + nums[right]; if (sum === 0) { result.push([nums[i], nums[left], nums[right]]); while (left < right && nums[left] === nums[left+1]) left++; while (left < right && nums[right] === nums[right-1]) right--; left++; right--; } else if (sum < 0) left++; else right--; } } return result; }',
      python: 'def threeSum(nums): nums.sort(); result = []; for i in range(len(nums) - 2): if i > 0 and nums[i] == nums[i-1]: continue; left, right = i + 1, len(nums) - 1; while left < right: sum_val = nums[i] + nums[left] + nums[right]; if sum_val == 0: result.append([nums[i], nums[left], nums[right]]); while left < right and nums[left] == nums[left+1]: left += 1; while left < right and nums[right] == nums[right-1]: right -= 1; left += 1; right -= 1; elif sum_val < 0: left += 1; else: right -= 1; return result',
      java: 'public static List<List<Integer>> threeSum(int[] nums) { Arrays.sort(nums); List<List<Integer>> result = new ArrayList<>(); for (int i = 0; i < nums.length - 2; i++) { if (i > 0 && nums[i] == nums[i-1]) continue; int left = i + 1, right = nums.length - 1; while (left < right) { int sum = nums[i] + nums[left] + nums[right]; if (sum == 0) { result.add(Arrays.asList(nums[i], nums[left], nums[right])); while (left < right && nums[left] == nums[left+1]) left++; while (left < right && nums[right] == nums[right-1]) right--; left++; right--; } else if (sum < 0) left++; else right--; } } return result; }',
      cpp: 'vector<vector<int>> threeSum(vector<int>& nums) { sort(nums.begin(), nums.end()); vector<vector<int>> result; for (int i = 0; i < nums.size() - 2; i++) { if (i > 0 && nums[i] == nums[i-1]) continue; int left = i + 1, right = nums.size() - 1; while (left < right) { int sum = nums[i] + nums[left] + nums[right]; if (sum == 0) { result.push_back({nums[i], nums[left], nums[right]}); while (left < right && nums[left] == nums[left+1]) left++; while (left < right && nums[right] == nums[right-1]) right--; left++; right--; } else if (sum < 0) left++; else right--; } } return result; }'
    },
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]\n' },
      { input: '[0,1,1]', expectedOutput: '[]\n' },
      { input: '[0,0,0]', expectedOutput: '[[0,0,0]]\n' }
    ]
  },
  {
    id: 'pointers-references-4',
    title: 'Container With Most Water',
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    topicId: 'pointers-references',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function maxArea(height) {
  // Write your code here
  return 0;
}

rl.on("line", (line) => {
  const height = JSON.parse(line);
  const result = maxArea(height);
  console.log(result);
  rl.close();
});`,
      python: `height = eval(input())

def maxArea(height):
    # Write your code here
    pass

result = maxArea(height)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int maxArea(int[] height) {
        // Write your code here
        return 0;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String heightStr = br.readLine();
        heightStr = heightStr.replace("[", "").replace("]", "");
        String[] heightStrings = heightStr.split(",");
        int[] height = new int[heightStrings.length];
        for (int i = 0; i < heightStrings.length; i++) {
            height[i] = Integer.parseInt(heightStrings[i].trim());
        }
        
        int result = maxArea(height);
        System.out.println(result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

int maxArea(vector<int>& height) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    getline(cin, line);
    
    line = line.substr(1, line.length() - 2); // Remove [ and ]
    stringstream ss(line);
    vector<int> height;
    string token;
    while (getline(ss, token, ',')) {
        height.push_back(stoi(token));
    }
    
    int result = maxArea(height);
    cout << result << endl;
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['array', 'two-pointers', 'greedy'],
    acceptanceRate: 78,
    examples: [
      {
        input: '[1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.'
      },
      {
        input: '[1,1]',
        output: '1',
        explanation: 'The max area is 1 (height 1, width 1).'
      }
    ],
    constraints: [
      { description: 'n == height.length' },
      { description: '2 <= n <= 10^5' },
      { description: '0 <= height[i] <= 10^4' }
    ],
    relatedConcepts: ['Two Pointers', 'Greedy Algorithm'],
    hints: [
      { level: 1, content: 'Use two pointers from both ends.' },
      { level: 2, content: 'Move the pointer with smaller height.' },
      { level: 3, content: 'Calculate area as min(height[left], height[right]) * (right - left).' }
    ],
    walkthrough: 'Start with two pointers at both ends. Move the pointer with smaller height inward and track maximum area.',
    commonMistakes: [
      'Not moving the correct pointer.',
      'Incorrect area calculation.'
    ],
    solutionCode: {
      javascript: 'function maxArea(height) { let left = 0, right = height.length - 1, maxArea = 0; while (left < right) { const area = Math.min(height[left], height[right]) * (right - left); maxArea = Math.max(maxArea, area); if (height[left] < height[right]) left++; else right--; } return maxArea; }',
      python: 'def maxArea(height): left, right = 0, len(height) - 1; max_area = 0; while left < right: area = min(height[left], height[right]) * (right - left); max_area = max(max_area, area); if height[left] < height[right]: left += 1; else: right -= 1; return max_area',
      java: 'public static int maxArea(int[] height) { int left = 0, right = height.length - 1, maxArea = 0; while (left < right) { int area = Math.min(height[left], height[right]) * (right - left); maxArea = Math.max(maxArea, area); if (height[left] < height[right]) left++; else right--; } return maxArea; }',
      cpp: 'int maxArea(vector<int>& height) { int left = 0, right = height.size() - 1, maxArea = 0; while (left < right) { int area = min(height[left], height[right]) * (right - left); maxArea = max(maxArea, area); if (height[left] < height[right]) left++; else right--; } return maxArea; }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49\n' },
      { input: '[1,1]', expectedOutput: '1\n' },
      { input: '[4,3,2,1,4]', expectedOutput: '16\n' }
    ]
  },
  {
    id: 'pointers-references-5',
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    topicId: 'pointers-references',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function trap(height) {
  // Write your code here
  return 0;
}

rl.on("line", (line) => {
  const height = JSON.parse(line);
  const result = trap(height);
  console.log(result);
  rl.close();
});`,
      python: `height = eval(input())

def trap(height):
    # Write your code here
    pass

result = trap(height)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int trap(int[] height) {
        // Write your code here
        return 0;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String heightStr = br.readLine();
        heightStr = heightStr.replace("[", "").replace("]", "");
        String[] heightStrings = heightStr.split(",");
        int[] height = new int[heightStrings.length];
        for (int i = 0; i < heightStrings.length; i++) {
            height[i] = Integer.parseInt(heightStrings[i].trim());
        }
        
        int result = trap(height);
        System.out.println(result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

int trap(vector<int>& height) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    getline(cin, line);
    
    line = line.substr(1, line.length() - 2); // Remove [ and ]
    stringstream ss(line);
    vector<int> height;
    string token;
    while (getline(ss, token, ',')) {
        height.push_back(stoi(token));
    }
    
    int result = trap(height);
    cout << result << endl;
    
    return 0;
}`
    },
    difficulty: 'Hard',
    tags: ['array', 'two-pointers', 'dynamic-programming', 'stack'],
    acceptanceRate: 67,
    examples: [
      {
        input: '[0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.'
      },
      {
        input: '[4,2,0,3,2,5]',
        output: '9',
        explanation: '9 units of rain water are trapped.'
      }
    ],
    constraints: [
      { description: 'n == height.length' },
      { description: '1 <= n <= 2 * 10^4' },
      { description: '0 <= height[i] <= 10^5' }
    ],
    relatedConcepts: ['Two Pointers', 'Dynamic Programming', 'Stack'],
    hints: [
      { level: 1, content: 'Water trapped at position i = min(max_left, max_right) - height[i].' },
      { level: 2, content: 'Use two pointers to track max left and max right heights.' },
      { level: 3, content: 'Move the pointer with smaller max height.' }
    ],
    walkthrough: 'Use two pointers to track maximum heights from left and right. Calculate trapped water at each position.',
    commonMistakes: [
      'Not handling edge cases properly.',
      'Incorrect water calculation formula.'
    ],
    solutionCode: {
      javascript: 'function trap(height) { if (height.length < 3) return 0; let left = 0, right = height.length - 1; let maxLeft = height[left], maxRight = height[right]; let water = 0; while (left < right) { if (maxLeft <= maxRight) { left++; maxLeft = Math.max(maxLeft, height[left]); water += maxLeft - height[left]; } else { right--; maxRight = Math.max(maxRight, height[right]); water += maxRight - height[right]; } } return water; }',
      python: 'def trap(height): if len(height) < 3: return 0; left, right = 0, len(height) - 1; max_left, max_right = height[left], height[right]; water = 0; while left < right: if max_left <= max_right: left += 1; max_left = max(max_left, height[left]); water += max_left - height[left]; else: right -= 1; max_right = max(max_right, height[right]); water += max_right - height[right]; return water',
      java: 'public static int trap(int[] height) { if (height.length < 3) return 0; int left = 0, right = height.length - 1; int maxLeft = height[left], maxRight = height[right]; int water = 0; while (left < right) { if (maxLeft <= maxRight) { left++; maxLeft = Math.max(maxLeft, height[left]); water += maxLeft - height[left]; } else { right--; maxRight = Math.max(maxRight, height[right]); water += maxRight - height[right]; } } return water; }',
      cpp: 'int trap(vector<int>& height) { if (height.size() < 3) return 0; int left = 0, right = height.size() - 1; int maxLeft = height[left], maxRight = height[right]; int water = 0; while (left < right) { if (maxLeft <= maxRight) { left++; maxLeft = max(maxLeft, height[left]); water += maxLeft - height[left]; } else { right--; maxRight = max(maxRight, height[right]); water += maxRight - height[right]; } } return water; }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6\n' },
      { input: '[4,2,0,3,2,5]', expectedOutput: '9\n' },
      { input: '[3,0,2,0,4]', expectedOutput: '7\n' }
    ]
  }
];
