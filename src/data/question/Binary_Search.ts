export const binarySearch = [
  {
    id: 'binary-search-1',
    title: 'Binary Search',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
    topicId: 'binary-search',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function search(nums, target) {
  // Write your code here
  return -1;
}

rl.on("line", (line) => {
  const [numsStr, targetStr] = line.split(" | ");
  const nums = JSON.parse(numsStr);
  const target = parseInt(targetStr);
  const result = search(nums, target);
  console.log(result);
  rl.close();
});`,
      python: `nums, target = input().split(" | ")
nums = eval(nums)
target = int(target)

def search(nums, target):
    # Write your code here
    pass

result = search(nums, target)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String numsStr = parts[0];
        int target = Integer.parseInt(parts[1]);
        
        numsStr = numsStr.replace("[", "").replace("]", "");
        String[] numStrings = numsStr.split(",");
        int[] nums = new int[numStrings.length];
        for (int i = 0; i < numStrings.length; i++) {
            nums[i] = Integer.parseInt(numStrings[i].trim());
        }
        
        int result = search(nums, target);
        System.out.println(result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your code here
    return -1;
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string numsStr = line.substr(0, pipePos);
    int target = stoi(line.substr(pipePos + 3));
    
    numsStr = numsStr.substr(1, numsStr.length() - 2); // Remove [ and ]
    stringstream ss(numsStr);
    vector<int> nums;
    string token;
    while (getline(ss, token, ',')) {
        nums.push_back(stoi(token));
    }
    
    int result = search(nums, target);
    cout << result << endl;
    
    return 0;
}`
    },
    difficulty: 'Easy',
    tags: ['array', 'binary-search'],
    acceptanceRate: 94,
    examples: [
      {
        input: '[-1,0,3,5,9,12] | 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      },
      {
        input: '[-1,0,3,5,9,12] | 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1'
      }
    ],
    constraints: [
      { description: '1 <= nums.length <= 10^4' },
      { description: '-10^4 < nums[i], target < 10^4' },
      { description: 'All the integers in nums are unique.' },
      { description: 'nums is sorted in ascending order.' }
    ],
    relatedConcepts: ['Binary Search', 'Array'],
    hints: [
      { level: 1, content: 'Use two pointers: left and right.' },
      { level: 2, content: 'Calculate middle index and compare with target.' },
      { level: 3, content: 'Adjust left or right based on comparison.' }
    ],
    walkthrough: 'Use binary search: compare middle element with target, adjust search range accordingly.',
    commonMistakes: [
      'Incorrect boundary conditions (off-by-one errors).',
      'Not handling the case when target is not found.'
    ],
    solutionCode: {
      javascript: 'function search(nums, target) { let left = 0, right = nums.length - 1; while (left <= right) { const mid = Math.floor((left + right) / 2); if (nums[mid] === target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }',
      python: 'def search(nums, target): left, right = 0, len(nums) - 1; while left <= right: mid = (left + right) // 2; if nums[mid] == target: return mid; elif nums[mid] < target: left = mid + 1; else: right = mid - 1; return -1',
      java: 'public static int search(int[] nums, int target) { int left = 0, right = nums.length - 1; while (left <= right) { int mid = left + (right - left) / 2; if (nums[mid] == target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }',
      cpp: 'int search(vector<int>& nums, int target) { int left = 0, right = nums.size() - 1; while (left <= right) { int mid = left + (right - left) / 2; if (nums[mid] == target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }'
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[-1,0,3,5,9,12] | 9', expectedOutput: '4\n' },
      { input: '[-1,0,3,5,9,12] | 2', expectedOutput: '-1\n' },
      { input: '[5] | 5', expectedOutput: '0\n' }
    ]
  },
  {
    id: 'binary-search-2',
    title: 'Search Insert Position',
    description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
    topicId: 'binary-search',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function searchInsert(nums, target) {
  // Write your code here
  return 0;
}

rl.on("line", (line) => {
  const [numsStr, targetStr] = line.split(" | ");
  const nums = JSON.parse(numsStr);
  const target = parseInt(targetStr);
  const result = searchInsert(nums, target);
  console.log(result);
  rl.close();
});`,
      python: `nums, target = input().split(" | ")
nums = eval(nums)
target = int(target)

def searchInsert(nums, target):
    # Write your code here
    pass

result = searchInsert(nums, target)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int searchInsert(int[] nums, int target) {
        // Write your code here
        return 0;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String numsStr = parts[0];
        int target = Integer.parseInt(parts[1]);
        
        numsStr = numsStr.replace("[", "").replace("]", "");
        String[] numStrings = numsStr.split(",");
        int[] nums = new int[numStrings.length];
        for (int i = 0; i < numStrings.length; i++) {
            nums[i] = Integer.parseInt(numStrings[i].trim());
        }
        
        int result = searchInsert(nums, target);
        System.out.println(result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

int searchInsert(vector<int>& nums, int target) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string numsStr = line.substr(0, pipePos);
    int target = stoi(line.substr(pipePos + 3));
    
    numsStr = numsStr.substr(1, numsStr.length() - 2); // Remove [ and ]
    stringstream ss(numsStr);
    vector<int> nums;
    string token;
    while (getline(ss, token, ',')) {
        nums.push_back(stoi(token));
    }
    
    int result = searchInsert(nums, target);
    cout << result << endl;
    
    return 0;
}`
    },
    difficulty: 'Easy',
    tags: ['array', 'binary-search'],
    acceptanceRate: 91,
    examples: [
      {
        input: '[1,3,5,6] | 5',
        output: '2',
        explanation: 'Target 5 is found at index 2.'
      },
      {
        input: '[1,3,5,6] | 2',
        output: '1',
        explanation: 'Target 2 would be inserted at index 1.'
      },
      {
        input: '[1,3,5,6] | 7',
        output: '4',
        explanation: 'Target 7 would be inserted at index 4.'
      }
    ],
    constraints: [
      { description: '1 <= nums.length <= 10^4' },
      { description: '-10^4 <= nums[i] <= 10^4' },
      { description: 'nums contains distinct values sorted in ascending order.' },
      { description: '-10^4 <= target <= 10^4' }
    ],
    relatedConcepts: ['Binary Search', 'Insert Position'],
    hints: [
      { level: 1, content: 'Use binary search to find the position.' },
      { level: 2, content: 'When target is not found, left pointer will be at the insertion position.' },
      { level: 3, content: 'Return left pointer when the loop ends.' }
    ],
    walkthrough: 'Use binary search. When target is not found, the left pointer will be at the correct insertion position.',
    commonMistakes: [
      'Returning right pointer instead of left.',
      'Not handling edge cases like inserting at the beginning or end.'
    ],
    solutionCode: {
      javascript: 'function searchInsert(nums, target) { let left = 0, right = nums.length - 1; while (left <= right) { const mid = Math.floor((left + right) / 2); if (nums[mid] === target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1; } return left; }',
      python: 'def searchInsert(nums, target): left, right = 0, len(nums) - 1; while left <= right: mid = (left + right) // 2; if nums[mid] == target: return mid; elif nums[mid] < target: left = mid + 1; else: right = mid - 1; return left',
      java: 'public static int searchInsert(int[] nums, int target) { int left = 0, right = nums.length - 1; while (left <= right) { int mid = left + (right - left) / 2; if (nums[mid] == target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1; } return left; }',
      cpp: 'int searchInsert(vector<int>& nums, int target) { int left = 0, right = nums.size() - 1; while (left <= right) { int mid = left + (right - left) / 2; if (nums[mid] == target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1; } return left; }'
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[1,3,5,6] | 5', expectedOutput: '2\n' },
      { input: '[1,3,5,6] | 2', expectedOutput: '1\n' },
      { input: '[1,3,5,6] | 7', expectedOutput: '4\n' }
    ]
  },
  {
    id: 'binary-search-3',
    title: 'Search in Rotated Sorted Array',
    description: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
    topicId: 'binary-search',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function search(nums, target) {
  // Write your code here
  return -1;
}

rl.on("line", (line) => {
  const [numsStr, targetStr] = line.split(" | ");
  const nums = JSON.parse(numsStr);
  const target = parseInt(targetStr);
  const result = search(nums, target);
  console.log(result);
  rl.close();
});`,
      python: `nums, target = input().split(" | ")
nums = eval(nums)
target = int(target)

def search(nums, target):
    # Write your code here
    pass

result = search(nums, target)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String numsStr = parts[0];
        int target = Integer.parseInt(parts[1]);
        
        numsStr = numsStr.replace("[", "").replace("]", "");
        String[] numStrings = numsStr.split(",");
        int[] nums = new int[numStrings.length];
        for (int i = 0; i < numStrings.length; i++) {
            nums[i] = Integer.parseInt(numStrings[i].trim());
        }
        
        int result = search(nums, target);
        System.out.println(result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your code here
    return -1;
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string numsStr = line.substr(0, pipePos);
    int target = stoi(line.substr(pipePos + 3));
    
    numsStr = numsStr.substr(1, numsStr.length() - 2); // Remove [ and ]
    stringstream ss(numsStr);
    vector<int> nums;
    string token;
    while (getline(ss, token, ',')) {
        nums.push_back(stoi(token));
    }
    
    int result = search(nums, target);
    cout << result << endl;
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['array', 'binary-search'],
    acceptanceRate: 76,
    examples: [
      {
        input: '[4,5,6,7,0,1,2] | 0',
        output: '4',
        explanation: 'Target 0 is found at index 4 in the rotated array.'
      },
      {
        input: '[4,5,6,7,0,1,2] | 3',
        output: '-1',
        explanation: 'Target 3 is not found in the array.'
      },
      {
        input: '[1] | 0',
        output: '-1',
        explanation: 'Target 0 is not found in the single-element array.'
      }
    ],
    constraints: [
      { description: '1 <= nums.length <= 5000' },
      { description: '-10^4 <= nums[i] <= 10^4' },
      { description: 'All values of nums are unique.' },
      { description: 'nums is an ascending array that is possibly rotated.' },
      { description: '-10^4 <= target <= 10^4' }
    ],
    relatedConcepts: ['Binary Search', 'Rotated Array'],
    hints: [
      { level: 1, content: 'Find which half of the array is sorted.' },
      { level: 2, content: 'Check if target is in the sorted half.' },
      { level: 3, content: 'If not, search in the other half.' }
    ],
    walkthrough: 'Modified binary search: determine which half is sorted, then check if target is in that sorted half.',
    commonMistakes: [
      'Not handling the rotated array property correctly.',
      'Incorrect boundary conditions for the rotated array.'
    ],
    solutionCode: {
      javascript: 'function search(nums, target) { let left = 0, right = nums.length - 1; while (left <= right) { const mid = Math.floor((left + right) / 2); if (nums[mid] === target) return mid; if (nums[left] <= nums[mid]) { if (target >= nums[left] && target < nums[mid]) right = mid - 1; else left = mid + 1; } else { if (target > nums[mid] && target <= nums[right]) left = mid + 1; else right = mid - 1; } } return -1; }',
      python: 'def search(nums, target): left, right = 0, len(nums) - 1; while left <= right: mid = (left + right) // 2; if nums[mid] == target: return mid; if nums[left] <= nums[mid]: if nums[left] <= target < nums[mid]: right = mid - 1; else: left = mid + 1; else: if nums[mid] < target <= nums[right]: left = mid + 1; else: right = mid - 1; return -1',
      java: 'public static int search(int[] nums, int target) { int left = 0, right = nums.length - 1; while (left <= right) { int mid = left + (right - left) / 2; if (nums[mid] == target) return mid; if (nums[left] <= nums[mid]) { if (target >= nums[left] && target < nums[mid]) right = mid - 1; else left = mid + 1; } else { if (target > nums[mid] && target <= nums[right]) left = mid + 1; else right = mid - 1; } } return -1; }',
      cpp: 'int search(vector<int>& nums, int target) { int left = 0, right = nums.size() - 1; while (left <= right) { int mid = left + (right - left) / 2; if (nums[mid] == target) return mid; if (nums[left] <= nums[mid]) { if (target >= nums[left] && target < nums[mid]) right = mid - 1; else left = mid + 1; } else { if (target > nums[mid] && target <= nums[right]) left = mid + 1; else right = mid - 1; } } return -1; }'
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[4,5,6,7,0,1,2] | 0', expectedOutput: '4\n' },
      { input: '[4,5,6,7,0,1,2] | 3', expectedOutput: '-1\n' },
      { input: '[1] | 0', expectedOutput: '-1\n' }
    ]
  },
  {
    id: 'binary-search-4',
    title: 'Find Minimum in Rotated Sorted Array',
    description: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.',
    topicId: 'binary-search',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function findMin(nums) {
  // Write your code here
  return 0;
}

rl.on("line", (line) => {
  const nums = JSON.parse(line);
  const result = findMin(nums);
  console.log(result);
  rl.close();
});`,
      python: `nums = eval(input())

def findMin(nums):
    # Write your code here
    pass

result = findMin(nums)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int findMin(int[] nums) {
        // Write your code here
        return 0;
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
        
        int result = findMin(nums);
        System.out.println(result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

int findMin(vector<int>& nums) {
    // Write your code here
    return 0;
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
    
    int result = findMin(nums);
    cout << result << endl;
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['array', 'binary-search'],
    acceptanceRate: 73,
    examples: [
      {
        input: '[3,4,5,1,2]',
        output: '1',
        explanation: 'The original array was [1,2,3,4,5] rotated 3 times.'
      },
      {
        input: '[4,5,6,7,0,1,2]',
        output: '0',
        explanation: 'The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.'
      },
      {
        input: '[11,13,15,17]',
        output: '11',
        explanation: 'The array is not rotated, so the minimum is the first element.'
      }
    ],
    constraints: [
      { description: 'n == nums.length' },
      { description: '1 <= n <= 5000' },
      { description: '-5000 <= nums[i] <= 5000' },
      { description: 'All the integers of nums are unique.' },
      { description: 'nums is sorted and rotated between 1 and n times.' }
    ],
    relatedConcepts: ['Binary Search', 'Rotated Array'],
    hints: [
      { level: 1, content: 'The minimum element is at the pivot point.' },
      { level: 2, content: 'Compare middle element with the rightmost element.' },
      { level: 3, content: 'If mid > right, minimum is in right half; otherwise in left half.' }
    ],
    walkthrough: 'Use binary search to find the pivot point where the array is rotated.',
    commonMistakes: [
      'Not handling the case when array is not rotated.',
      'Incorrect comparison logic for finding the minimum.'
    ],
    solutionCode: {
      javascript: 'function findMin(nums) { let left = 0, right = nums.length - 1; while (left < right) { const mid = Math.floor((left + right) / 2); if (nums[mid] > nums[right]) left = mid + 1; else right = mid; } return nums[left]; }',
      python: 'def findMin(nums): left, right = 0, len(nums) - 1; while left < right: mid = (left + right) // 2; if nums[mid] > nums[right]: left = mid + 1; else: right = mid; return nums[left]',
      java: 'public static int findMin(int[] nums) { int left = 0, right = nums.length - 1; while (left < right) { int mid = left + (right - left) / 2; if (nums[mid] > nums[right]) left = mid + 1; else right = mid; } return nums[left]; }',
      cpp: 'int findMin(vector<int>& nums) { int left = 0, right = nums.size() - 1; while (left < right) { int mid = left + (right - left) / 2; if (nums[mid] > nums[right]) left = mid + 1; else right = mid; } return nums[left]; }'
    },
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[3,4,5,1,2]', expectedOutput: '1\n' },
      { input: '[4,5,6,7,0,1,2]', expectedOutput: '0\n' },
      { input: '[11,13,15,17]', expectedOutput: '11\n' }
    ]
  },
  {
    id: 'binary-search-5',
    title: 'Search a 2D Matrix',
    description: 'Write an efficient algorithm that searches for a value target in an m x n integer matrix. This matrix has the following properties: Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row.',
    topicId: 'binary-search',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function searchMatrix(matrix, target) {
  // Write your code here
  return false;
}

rl.on("line", (line) => {
  const [matrixStr, targetStr] = line.split(" | ");
  const matrix = JSON.parse(matrixStr);
  const target = parseInt(targetStr);
  const result = searchMatrix(matrix, target);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      python: `matrix, target = input().split(" | ")
matrix = eval(matrix)
target = int(target)

def searchMatrix(matrix, target):
    # Write your code here
    pass

result = searchMatrix(matrix, target)
print("true" if result else "false")`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static boolean searchMatrix(int[][] matrix, int target) {
        // Write your code here
        return false;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String matrixStr = parts[0];
        int target = Integer.parseInt(parts[1]);
        
        // Parse matrix - simplified parsing
        // In practice, you'd need more robust parsing for 2D arrays
        boolean result = searchMatrix(new int[][]{}, target);
        System.out.println(result ? "true" : "false");
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

bool searchMatrix(vector<vector<int>>& matrix, int target) {
    // Write your code here
    return false;
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string matrixStr = line.substr(0, pipePos);
    int target = stoi(line.substr(pipePos + 3));
    
    // Simplified parsing - in practice you'd need more robust parsing
    bool result = searchMatrix(vector<vector<int>>{}, target);
    cout << (result ? "true" : "false") << endl;
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['array', 'binary-search', 'matrix'],
    acceptanceRate: 69,
    examples: [
      {
        input: '[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]] | 5',
        output: 'true',
        explanation: 'Target 5 is found in the matrix.'
      },
      {
        input: '[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]] | 13',
        output: 'true',
        explanation: 'Target 13 is found in the matrix.'
      }
    ],
    constraints: [
      { description: 'm == matrix.length' },
      { description: 'n == matrix[i].length' },
      { description: '1 <= m, n <= 100' },
      { description: '-10^4 <= matrix[i][j], target <= 10^4' }
    ],
    relatedConcepts: ['Binary Search', '2D Matrix'],
    hints: [
      { level: 1, content: 'Treat the 2D matrix as a 1D sorted array.' },
      { level: 2, content: 'Use binary search with row and column calculations.' },
      { level: 3, content: 'Convert 1D index to 2D coordinates: row = mid/n, col = mid%n.' }
    ],
    walkthrough: 'Treat the 2D matrix as a 1D array and use binary search. Convert 1D index to 2D coordinates.',
    commonMistakes: [
      'Not handling the matrix bounds correctly.',
      'Incorrect conversion between 1D and 2D indices.'
    ],
    solutionCode: {
      javascript: 'function searchMatrix(matrix, target) { if (!matrix.length || !matrix[0].length) return false; const m = matrix.length, n = matrix[0].length; let left = 0, right = m * n - 1; while (left <= right) { const mid = Math.floor((left + right) / 2); const midVal = matrix[Math.floor(mid / n)][mid % n]; if (midVal === target) return true; else if (midVal < target) left = mid + 1; else right = mid - 1; } return false; }',
      python: 'def searchMatrix(matrix, target): if not matrix or not matrix[0]: return False; m, n = len(matrix), len(matrix[0]); left, right = 0, m * n - 1; while left <= right: mid = (left + right) // 2; mid_val = matrix[mid // n][mid % n]; if mid_val == target: return True; elif mid_val < target: left = mid + 1; else: right = mid - 1; return False',
      java: 'public static boolean searchMatrix(int[][] matrix, int target) { if (matrix.length == 0 || matrix[0].length == 0) return false; int m = matrix.length, n = matrix[0].length; int left = 0, right = m * n - 1; while (left <= right) { int mid = left + (right - left) / 2; int midVal = matrix[mid / n][mid % n]; if (midVal == target) return true; else if (midVal < target) left = mid + 1; else right = mid - 1; } return false; }',
      cpp: 'bool searchMatrix(vector<vector<int>>& matrix, int target) { if (matrix.empty() || matrix[0].empty()) return false; int m = matrix.size(), n = matrix[0].size(); int left = 0, right = m * n - 1; while (left <= right) { int mid = left + (right - left) / 2; int midVal = matrix[mid / n][mid % n]; if (midVal == target) return true; else if (midVal < target) left = mid + 1; else right = mid - 1; } return false; }'
    },
    timeComplexity: 'O(log(m*n))',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]] | 5', expectedOutput: 'true\n' },
      { input: '[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]] | 13', expectedOutput: 'true\n' },
      { input: '[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]] | 20', expectedOutput: 'false\n' }
    ]
  },
  {
    id: 'binary-search-6',
    title: 'Median of Two Sorted Arrays',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    topicId: 'binary-search',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function findMedianSortedArrays(nums1, nums2) {
  // Write your code here
  return 0.0;
}

rl.on("line", (line) => {
  const [nums1Str, nums2Str] = line.split(" | ");
  const nums1 = JSON.parse(nums1Str);
  const nums2 = JSON.parse(nums2Str);
  const result = findMedianSortedArrays(nums1, nums2);
  console.log(result);
  rl.close();
});`,
      python: `nums1, nums2 = input().split(" | ")
nums1 = eval(nums1)
nums2 = eval(nums2)

def findMedianSortedArrays(nums1, nums2):
    # Write your code here
    pass

result = findMedianSortedArrays(nums1, nums2)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
        return 0.0;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String nums1Str = parts[0];
        String nums2Str = parts[1];
        
        // Parse arrays
        nums1Str = nums1Str.replace("[", "").replace("]", "");
        String[] num1Strings = nums1Str.split(",");
        int[] nums1 = new int[num1Strings.length];
        for (int i = 0; i < num1Strings.length; i++) {
            nums1[i] = Integer.parseInt(num1Strings[i].trim());
        }
        
        nums2Str = nums2Str.replace("[", "").replace("]", "");
        String[] num2Strings = nums2Str.split(",");
        int[] nums2 = new int[num2Strings.length];
        for (int i = 0; i < num2Strings.length; i++) {
            nums2[i] = Integer.parseInt(num2Strings[i].trim());
        }
        
        double result = findMedianSortedArrays(nums1, nums2);
        System.out.println(result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
#include <algorithm>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Write your code here
    return 0.0;
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string nums1Str = line.substr(0, pipePos);
    string nums2Str = line.substr(pipePos + 3);
    
    // Parse nums1
    nums1Str = nums1Str.substr(1, nums1Str.length() - 2); // Remove [ and ]
    stringstream ss1(nums1Str);
    vector<int> nums1;
    string token;
    while (getline(ss1, token, ',')) {
        nums1.push_back(stoi(token));
    }
    
    // Parse nums2
    nums2Str = nums2Str.substr(1, nums2Str.length() - 2); // Remove [ and ]
    stringstream ss2(nums2Str);
    vector<int> nums2;
    while (getline(ss2, token, ',')) {
        nums2.push_back(stoi(token));
    }
    
    double result = findMedianSortedArrays(nums1, nums2);
    cout << result << endl;
    
    return 0;
}`
    },
    difficulty: 'Hard',
    tags: ['array', 'binary-search', 'divide-and-conquer'],
    acceptanceRate: 65,
    examples: [
      {
        input: '[1,3] | [2]',
        output: '2.0',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: '[1,2] | [3,4]',
        output: '2.5',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    constraints: [
      { description: 'nums1.length == m' },
      { description: 'nums2.length == n' },
      { description: '0 <= m <= 1000' },
      { description: '0 <= n <= 1000' },
      { description: '1 <= m + n <= 2000' },
      { description: '-10^6 <= nums1[i], nums2[i] <= 10^6' }
    ],
    relatedConcepts: ['Binary Search', 'Merge Sort'],
    hints: [
      { level: 1, content: 'Use binary search to partition the arrays.' },
      { level: 2, content: 'Find the correct partition point where all left elements <= all right elements.' },
      { level: 3, content: 'Handle edge cases for empty arrays and single elements.' }
    ],
    walkthrough: 'Use binary search to find the partition point where the median lies. Ensure left partition elements are <= right partition elements.',
    commonMistakes: [
      'Not handling the case when one array is empty.',
      'Incorrect boundary conditions for binary search.'
    ],
    solutionCode: {
      javascript: 'function findMedianSortedArrays(nums1, nums2) { if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1); const m = nums1.length, n = nums2.length; let left = 0, right = m; while (left <= right) { const partitionX = Math.floor((left + right) / 2); const partitionY = Math.floor((m + n + 1) / 2) - partitionX; const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1]; const minRightX = partitionX === m ? Infinity : nums1[partitionX]; const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1]; const minRightY = partitionY === n ? Infinity : nums2[partitionY]; if (maxLeftX <= minRightY && maxLeftY <= minRightX) { if ((m + n) % 2 === 0) return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2; else return Math.max(maxLeftX, maxLeftY); } else if (maxLeftX > minRightY) right = partitionX - 1; else left = partitionX + 1; } return 0; }',
      python: 'def findMedianSortedArrays(nums1, nums2): if len(nums1) > len(nums2): return findMedianSortedArrays(nums2, nums1); m, n = len(nums1), len(nums2); left, right = 0, m; while left <= right: partition_x = (left + right) // 2; partition_y = (m + n + 1) // 2 - partition_x; max_left_x = float("-inf") if partition_x == 0 else nums1[partition_x - 1]; min_right_x = float("inf") if partition_x == m else nums1[partition_x]; max_left_y = float("-inf") if partition_y == 0 else nums2[partition_y - 1]; min_right_y = float("inf") if partition_y == n else nums2[partition_y]; if max_left_x <= min_right_y and max_left_y <= min_right_x: if (m + n) % 2 == 0: return (max(max_left_x, max_left_y) + min(min_right_x, min_right_y)) / 2; else: return max(max_left_x, max_left_y); elif max_left_x > min_right_y: right = partition_x - 1; else: left = partition_x + 1; return 0',
      java: 'public static double findMedianSortedArrays(int[] nums1, int[] nums2) { if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1); int m = nums1.length, n = nums2.length; int left = 0, right = m; while (left <= right) { int partitionX = left + (right - left) / 2; int partitionY = (m + n + 1) / 2 - partitionX; int maxLeftX = partitionX == 0 ? Integer.MIN_VALUE : nums1[partitionX - 1]; int minRightX = partitionX == m ? Integer.MAX_VALUE : nums1[partitionX]; int maxLeftY = partitionY == 0 ? Integer.MIN_VALUE : nums2[partitionY - 1]; int minRightY = partitionY == n ? Integer.MAX_VALUE : nums2[partitionY]; if (maxLeftX <= minRightY && maxLeftY <= minRightX) { if ((m + n) % 2 == 0) return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2.0; else return Math.max(maxLeftX, maxLeftY); } else if (maxLeftX > minRightY) right = partitionX - 1; else left = partitionX + 1; } return 0.0; }',
      cpp: 'double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) { if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1); int m = nums1.size(), n = nums2.size(); int left = 0, right = m; while (left <= right) { int partitionX = left + (right - left) / 2; int partitionY = (m + n + 1) / 2 - partitionX; int maxLeftX = partitionX == 0 ? INT_MIN : nums1[partitionX - 1]; int minRightX = partitionX == m ? INT_MAX : nums1[partitionX]; int maxLeftY = partitionY == 0 ? INT_MIN : nums2[partitionY - 1]; int minRightY = partitionY == n ? INT_MAX : nums2[partitionY]; if (maxLeftX <= minRightY && maxLeftY <= minRightX) { if ((m + n) % 2 == 0) return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0; else return max(maxLeftX, maxLeftY); } else if (maxLeftX > minRightY) right = partitionX - 1; else left = partitionX + 1; } return 0.0; }'
    },
    timeComplexity: 'O(log(min(m,n)))',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[1,3] | [2]', expectedOutput: '2\n' },
      { input: '[1,2] | [3,4]', expectedOutput: '2.5\n' },
      { input: '[0,0] | [0,0]', expectedOutput: '0\n' }
    ]
  }
];
