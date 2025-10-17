export const arraysHashing = [
  {
    id: 'arrays-hashing-1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    topicId: 'arrays-hashing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function twoSum(nums, target) {
  // Write your code here
  return [];
}

rl.on("line", (line) => {
  const [numsStr, targetStr] = line.split(" | ");
  const nums = JSON.parse(numsStr);
  const target = parseInt(targetStr);
  const result = twoSum(nums, target);
  console.log(JSON.stringify(result));
  rl.close();
});`,
      python: `nums = eval(input().split(" | ")[0])
target = int(input().split(" | ")[1])

def twoSum(nums, target):
    # Write your code here
    pass

result = twoSum(nums, target)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String numsStr = parts[0];
        int target = Integer.parseInt(parts[1]);
        
        // Parse array
        numsStr = numsStr.replace("[", "").replace("]", "");
        String[] numStrings = numsStr.split(",");
        int[] nums = new int[numStrings.length];
        for (int i = 0; i < numStrings.length; i++) {
            nums[i] = Integer.parseInt(numStrings[i].trim());
        }
        
        int[] result = twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <sstream>
#include <string>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string numsStr = line.substr(0, pipePos);
    int target = stoi(line.substr(pipePos + 3));
    
    // Parse nums array
    numsStr = numsStr.substr(1, numsStr.length() - 2); // Remove [ and ]
    stringstream ss(numsStr);
    vector<int> nums;
    string token;
    while (getline(ss, token, ',')) {
        nums.push_back(stoi(token));
    }
    
    vector<int> result = twoSum(nums, target);
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
    tags: ['array', 'hash-table'],
    acceptanceRate: 92,
    examples: [
      {
        input: '[2,7,11,15] | 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: '[3,2,4] | 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      { description: '2 <= nums.length <= 10^4' },
      { description: '-10^9 <= nums[i] <= 10^9' },
      { description: '-10^9 <= target <= 10^9' },
      { description: 'Only one valid answer exists.' }
    ],
    relatedConcepts: ['Hash Table', 'Array'],
    hints: [
      { level: 1, content: 'Use a hash map to store numbers and their indices.' },
      { level: 2, content: 'For each number, check if target - number exists in the map.' },
      { level: 3, content: 'If found, return the indices; otherwise, store the current number and its index.' }
    ],
    walkthrough: 'Use a hash map to store each number and its index. For each number, check if the complement (target - number) exists in the map.',
    commonMistakes: [
      'Not handling the case where the same element is used twice.',
      'Returning the numbers instead of indices.'
    ],
    solutionCode: {
      javascript: 'function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map.has(complement)) return [map.get(complement), i]; map.set(nums[i], i); } return []; }',
      python: 'def twoSum(nums, target): hashmap = {} for i, num in enumerate(nums): complement = target - num if complement in hashmap: return [hashmap[complement], i] hashmap[num] = i return []',
      java: 'public static int[] twoSum(int[] nums, int target) { Map<Integer, Integer> map = new HashMap<>(); for (int i = 0; i < nums.length; i++) { int complement = target - nums[i]; if (map.containsKey(complement)) return new int[]{map.get(complement), i}; map.put(nums[i], i); } return new int[]{}; }',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) { unordered_map<int, int> map; for (int i = 0; i < nums.size(); i++) { int complement = target - nums[i]; if (map.find(complement) != map.end()) return {map[complement], i}; map[nums[i]] = i; } return {}; }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '[2,7,11,15] | 9', expectedOutput: '[0,1]\n' },
      { input: '[3,2,4] | 6', expectedOutput: '[1,2]\n' },
      { input: '[3,3] | 6', expectedOutput: '[0,1]\n' }
    ]
  },
  {
    id: 'arrays-hashing-2',
    title: 'Contains Duplicate',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    topicId: 'arrays-hashing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function containsDuplicate(nums) {
  // Write your code here
  return false;
}

rl.on("line", (line) => {
  const nums = JSON.parse(line);
  const result = containsDuplicate(nums);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      python: `nums = eval(input())

def containsDuplicate(nums):
    # Write your code here
    pass

result = containsDuplicate(nums)
print("true" if result else "false")`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static boolean containsDuplicate(int[] nums) {
        // Write your code here
        return false;
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
        
        boolean result = containsDuplicate(nums);
        System.out.println(result ? "true" : "false");
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
#include <sstream>
#include <string>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    // Write your code here
    return false;
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
    
    bool result = containsDuplicate(nums);
    cout << (result ? "true" : "false") << endl;
    
    return 0;
}`
    },
    difficulty: 'Easy',
    tags: ['array', 'hash-table', 'sorting'],
    acceptanceRate: 95,
    examples: [
      {
        input: '[1,2,3,1]',
        output: 'true',
        explanation: 'The array contains duplicate value 1.'
      },
      {
        input: '[1,2,3,4]',
        output: 'false',
        explanation: 'All elements are distinct.'
      }
    ],
    constraints: [
      { description: '1 <= nums.length <= 10^5' },
      { description: '-10^9 <= nums[i] <= 10^9' }
    ],
    relatedConcepts: ['Hash Set', 'Array'],
    hints: [
      { level: 1, content: 'Use a hash set to track seen numbers.' },
      { level: 2, content: 'If a number is already in the set, return true.' },
      { level: 3, content: 'Alternative: Sort the array and check adjacent elements.' }
    ],
    walkthrough: 'Use a hash set to store numbers as we iterate. If we encounter a number that already exists in the set, return true.',
    commonMistakes: [
      'Using array instead of hash set for checking existence.',
      'Not considering edge cases like single element array.'
    ],
    solutionCode: {
      javascript: 'function containsDuplicate(nums) { return new Set(nums).size !== nums.length; }',
      python: 'def containsDuplicate(nums): return len(set(nums)) != len(nums)',
      java: 'public static boolean containsDuplicate(int[] nums) { Set<Integer> set = new HashSet<>(); for (int num : nums) { if (!set.add(num)) return true; } return false; }',
      cpp: 'bool containsDuplicate(vector<int>& nums) { unordered_set<int> set(nums.begin(), nums.end()); return set.size() != nums.size(); }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '[1,2,3,1]', expectedOutput: 'true\n' },
      { input: '[1,2,3,4]', expectedOutput: 'false\n' },
      { input: '[1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true\n' }
    ]
  },
  {
    id: 'arrays-hashing-3',
    title: 'Valid Anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    topicId: 'arrays-hashing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isAnagram(s, t) {
  // Write your code here
  return false;
}

rl.on("line", (line) => {
  const [s, t] = line.split(" | ");
  const result = isAnagram(s, t);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      python: `s, t = input().split(" | ")

def isAnagram(s, t):
    # Write your code here
    pass

result = isAnagram(s, t)
print("true" if result else "false")`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static boolean isAnagram(String s, String t) {
        // Write your code here
        return false;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String s = parts[0];
        String t = parts[1];
        
        boolean result = isAnagram(s, t);
        System.out.println(result ? "true" : "false");
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

bool isAnagram(string s, string t) {
    // Write your code here
    return false;
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string s = line.substr(0, pipePos);
    string t = line.substr(pipePos + 3);
    
    bool result = isAnagram(s, t);
    cout << (result ? "true" : "false") << endl;
    
    return 0;
}`
    },
    difficulty: 'Easy',
    tags: ['string', 'hash-table', 'sorting'],
    acceptanceRate: 89,
    examples: [
      {
        input: 'anagram | nagaram',
        output: 'true',
        explanation: 'Both strings contain the same characters with same frequencies.'
      },
      {
        input: 'rat | car',
        output: 'false',
        explanation: 'Different characters and frequencies.'
      }
    ],
    constraints: [
      { description: '1 <= s.length, t.length <= 5 * 10^4' },
      { description: 's and t consist of lowercase English letters only.' }
    ],
    relatedConcepts: ['Hash Map', 'Character Counting'],
    hints: [
      { level: 1, content: 'Anagrams have the same characters with same frequencies.' },
      { level: 2, content: 'Use a character frequency map or sort both strings.' },
      { level: 3, content: 'Compare character counts or sorted strings.' }
    ],
    walkthrough: 'Two approaches: 1) Sort both strings and compare, 2) Count character frequencies in both strings and compare.',
    commonMistakes: [
      'Not handling different string lengths.',
      'Case sensitivity issues.'
    ],
    solutionCode: {
      javascript: 'function isAnagram(s, t) { if (s.length !== t.length) return false; return s.split("").sort().join("") === t.split("").sort().join(""); }',
      python: 'def isAnagram(s, t): return sorted(s) == sorted(t)',
      java: 'public static boolean isAnagram(String s, String t) { if (s.length() != t.length()) return false; char[] sArr = s.toCharArray(); char[] tArr = t.toCharArray(); Arrays.sort(sArr); Arrays.sort(tArr); return Arrays.equals(sArr, tArr); }',
      cpp: 'bool isAnagram(string s, string t) { sort(s.begin(), s.end()); sort(t.begin(), t.end()); return s == t; }'
    },
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: 'anagram | nagaram', expectedOutput: 'true\n' },
      { input: 'rat | car', expectedOutput: 'false\n' },
      { input: 'listen | silent', expectedOutput: 'true\n' }
    ]
  },
  {
    id: 'arrays-hashing-4',
    title: 'Group Anagrams',
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    topicId: 'arrays-hashing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function groupAnagrams(strs) {
  // Write your code here
  return [];
}

rl.on("line", (line) => {
  const strs = JSON.parse(line);
  const result = groupAnagrams(strs);
  console.log(JSON.stringify(result));
  rl.close();
});`,
      python: `strs = eval(input())

def groupAnagrams(strs):
    # Write your code here
    pass

result = groupAnagrams(strs)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static List<List<String>> groupAnagrams(String[] strs) {
        // Write your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String strsStr = br.readLine();
        strsStr = strsStr.replace("[", "").replace("]", "");
        String[] strs = strsStr.split(",");
        for (int i = 0; i < strs.length; i++) {
            strs[i] = strs[i].replace("\"", "").trim();
        }
        
        List<List<String>> result = groupAnagrams(strs);
        System.out.println(result.toString());
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
#include <sstream>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    // Write your code here
    return {};
}

int main() {
    string line;
    getline(cin, line);
    
    line = line.substr(1, line.length() - 2); // Remove [ and ]
    stringstream ss(line);
    vector<string> strs;
    string token;
    while (getline(ss, token, ',')) {
        token = token.substr(token.find('"') + 1, token.rfind('"') - token.find('"') - 1);
        strs.push_back(token);
    }
    
    vector<vector<string>> result = groupAnagrams(strs);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << "[";
        for (int j = 0; j < result[i].size(); j++) {
            cout << "\"" << result[i][j] << "\"";
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
    tags: ['string', 'hash-table', 'sorting'],
    acceptanceRate: 82,
    examples: [
      {
        input: '["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: 'Group strings that are anagrams of each other.'
      },
      {
        input: '["a"]',
        output: '[["a"]]',
        explanation: 'Single string forms its own group.'
      }
    ],
    constraints: [
      { description: '1 <= strs.length <= 10^4' },
      { description: '0 <= strs[i].length <= 100' },
      { description: 'strs[i] consists of lowercase English letters only.' }
    ],
    relatedConcepts: ['Hash Map', 'String Sorting'],
    hints: [
      { level: 1, content: 'Use sorted string as key to group anagrams.' },
      { level: 2, content: 'Create a map where key is sorted string and value is list of original strings.' },
      { level: 3, content: 'Return all values from the map as the result.' }
    ],
    walkthrough: 'Sort each string and use the sorted version as a key in a hash map. Group original strings by their sorted versions.',
    commonMistakes: [
      'Not handling empty strings properly.',
      'Incorrect parsing of input format.'
    ],
    solutionCode: {
      javascript: 'function groupAnagrams(strs) { const map = new Map(); for (const str of strs) { const sorted = str.split("").sort().join(""); if (!map.has(sorted)) map.set(sorted, []); map.get(sorted).push(str); } return Array.from(map.values()); }',
      python: 'def groupAnagrams(strs): from collections import defaultdict; groups = defaultdict(list); for s in strs: groups["".join(sorted(s))].append(s); return list(groups.values())',
      java: 'public static List<List<String>> groupAnagrams(String[] strs) { Map<String, List<String>> map = new HashMap<>(); for (String str : strs) { char[] chars = str.toCharArray(); Arrays.sort(chars); String key = new String(chars); map.computeIfAbsent(key, k -> new ArrayList<>()).add(str); } return new ArrayList<>(map.values()); }',
      cpp: 'vector<vector<string>> groupAnagrams(vector<string>& strs) { unordered_map<string, vector<string>> map; for (string& str : strs) { string sorted = str; sort(sorted.begin(), sorted.end()); map[sorted].push_back(str); } vector<vector<string>> result; for (auto& pair : map) result.push_back(pair.second); return result; }'
    },
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]\n' },
      { input: '["a"]', expectedOutput: '[["a"]]\n' },
      { input: '[""]', expectedOutput: '[[""]]\n' }
    ]
  },
  {
    id: 'arrays-hashing-5',
    title: 'Top K Frequent Elements',
    description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
    topicId: 'arrays-hashing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function topKFrequent(nums, k) {
  // Write your code here
  return [];
}

rl.on("line", (line) => {
  const [numsStr, kStr] = line.split(" | ");
  const nums = JSON.parse(numsStr);
  const k = parseInt(kStr);
  const result = topKFrequent(nums, k);
  console.log(JSON.stringify(result));
  rl.close();
});`,
      python: `nums, k = input().split(" | ")
nums = eval(nums)
k = int(k)

def topKFrequent(nums, k):
    # Write your code here
    pass

result = topKFrequent(nums, k)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int[] topKFrequent(int[] nums, int k) {
        // Write your code here
        return new int[]{};
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String numsStr = parts[0];
        int k = Integer.parseInt(parts[1]);
        
        numsStr = numsStr.replace("[", "").replace("]", "");
        String[] numStrings = numsStr.split(",");
        int[] nums = new int[numStrings.length];
        for (int i = 0; i < numStrings.length; i++) {
            nums[i] = Integer.parseInt(numStrings[i].trim());
        }
        
        int[] result = topKFrequent(nums, k);
        System.out.println(Arrays.toString(result));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <priority_queue>
#include <sstream>
#include <string>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    // Write your code here
    return {};
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string numsStr = line.substr(0, pipePos);
    int k = stoi(line.substr(pipePos + 3));
    
    numsStr = numsStr.substr(1, numsStr.length() - 2); // Remove [ and ]
    stringstream ss(numsStr);
    vector<int> nums;
    string token;
    while (getline(ss, token, ',')) {
        nums.push_back(stoi(token));
    }
    
    vector<int> result = topKFrequent(nums, k);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['array', 'hash-table', 'heap'],
    acceptanceRate: 78,
    examples: [
      {
        input: '[1,1,1,2,2,3] | 2',
        output: '[1,2]',
        explanation: 'The two most frequent elements are 1 (frequency 3) and 2 (frequency 2).'
      },
      {
        input: '[1] | 1',
        output: '[1]',
        explanation: 'The most frequent element is 1.'
      }
    ],
    constraints: [
      { description: '1 <= nums.length <= 10^5' },
      { description: 'k is in the range [1, the number of unique elements in the array].' },
      { description: 'It is guaranteed that the answer is unique.' }
    ],
    relatedConcepts: ['Hash Map', 'Heap', 'Bucket Sort'],
    hints: [
      { level: 1, content: 'Count frequency of each element using a hash map.' },
      { level: 2, content: 'Use a min-heap to keep track of top k frequent elements.' },
      { level: 3, content: 'Alternative: Use bucket sort based on frequency.' }
    ],
    walkthrough: 'Count frequencies, then use a heap or bucket sort to find the k most frequent elements.',
    commonMistakes: [
      'Using max-heap instead of min-heap for efficiency.',
      'Not handling edge cases like k equals array length.'
    ],
    solutionCode: {
      javascript: 'function topKFrequent(nums, k) { const freq = new Map(); for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1); return Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, k).map(([num]) => num); }',
      python: 'def topKFrequent(nums, k): from collections import Counter; return [num for num, _ in Counter(nums).most_common(k)]',
      java: 'public static int[] topKFrequent(int[] nums, int k) { Map<Integer, Integer> freq = new HashMap<>(); for (int num : nums) freq.put(num, freq.getOrDefault(num, 0) + 1); PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> freq.get(b) - freq.get(a)); heap.addAll(freq.keySet()); int[] result = new int[k]; for (int i = 0; i < k; i++) result[i] = heap.poll(); return result; }',
      cpp: 'vector<int> topKFrequent(vector<int>& nums, int k) { unordered_map<int, int> freq; for (int num : nums) freq[num]++; priority_queue<pair<int, int>> heap; for (auto& pair : freq) heap.push({pair.second, pair.first}); vector<int> result; for (int i = 0; i < k; i++) { result.push_back(heap.top().second); heap.pop(); } return result; }'
    },
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '[1,1,1,2,2,3] | 2', expectedOutput: '[1,2]\n' },
      { input: '[1] | 1', expectedOutput: '[1]\n' },
      { input: '[4,1,-1,2,-1,2,3] | 2', expectedOutput: '[-1,2]\n' }
    ]
  },
  {
    id: 'arrays-hashing-6',
    title: 'Product of Array Except Self',
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
    topicId: 'arrays-hashing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function productExceptSelf(nums) {
  // Write your code here
  return [];
}

rl.on("line", (line) => {
  const nums = JSON.parse(line);
  const result = productExceptSelf(nums);
  console.log(JSON.stringify(result));
  rl.close();
});`,
      python: `nums = eval(input())

def productExceptSelf(nums):
    # Write your code here
    pass

result = productExceptSelf(nums)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int[] productExceptSelf(int[] nums) {
        // Write your code here
        return new int[]{};
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
        
        int[] result = productExceptSelf(nums);
        System.out.println(Arrays.toString(result));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <string>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
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
    
    vector<int> result = productExceptSelf(nums);
    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['array', 'prefix-sum'],
    acceptanceRate: 75,
    examples: [
      {
        input: '[1,2,3,4]',
        output: '[24,12,8,6]',
        explanation: 'answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, etc.'
      },
      {
        input: '[-1,1,0,-3,3]',
        output: '[0,0,9,0,0]',
        explanation: 'answer[2] = -1*1*-3*3 = 9, others are 0 due to zero in input.'
      }
    ],
    constraints: [
      { description: '2 <= nums.length <= 10^5' },
      { description: '-30 <= nums[i] <= 30' },
      { description: 'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.' }
    ],
    relatedConcepts: ['Prefix Product', 'Array'],
    hints: [
      { level: 1, content: 'Use two passes: left products and right products.' },
      { level: 2, content: 'First pass: calculate products of all elements to the left.' },
      { level: 3, content: 'Second pass: multiply by products of all elements to the right.' }
    ],
    walkthrough: 'Use prefix and suffix products. First pass calculates left products, second pass multiplies by right products.',
    commonMistakes: [
      'Using division which fails with zeros.',
      'Not handling the O(1) space requirement properly.'
    ],
    solutionCode: {
      javascript: 'function productExceptSelf(nums) { const result = new Array(nums.length).fill(1); for (let i = 1; i < nums.length; i++) result[i] = result[i-1] * nums[i-1]; let right = 1; for (let i = nums.length - 1; i >= 0; i--) { result[i] *= right; right *= nums[i]; } return result; }',
      python: 'def productExceptSelf(nums): result = [1] * len(nums); for i in range(1, len(nums)): result[i] = result[i-1] * nums[i-1]; right = 1; for i in range(len(nums)-1, -1, -1): result[i] *= right; right *= nums[i]; return result',
      java: 'public static int[] productExceptSelf(int[] nums) { int[] result = new int[nums.length]; result[0] = 1; for (int i = 1; i < nums.length; i++) result[i] = result[i-1] * nums[i-1]; int right = 1; for (int i = nums.length - 1; i >= 0; i--) { result[i] *= right; right *= nums[i]; } return result; }',
      cpp: 'vector<int> productExceptSelf(vector<int>& nums) { vector<int> result(nums.size(), 1); for (int i = 1; i < nums.size(); i++) result[i] = result[i-1] * nums[i-1]; int right = 1; for (int i = nums.size() - 1; i >= 0; i--) { result[i] *= right; right *= nums[i]; } return result; }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]\n' },
      { input: '[-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]\n' },
      { input: '[2,3,4,5]', expectedOutput: '[60,40,30,24]\n' }
    ]
  },
  {
    id: 'arrays-hashing-7',
    title: 'Valid Sudoku',
    description: 'Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated.',
    topicId: 'arrays-hashing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isValidSudoku(board) {
  // Write your code here
  return false;
}

rl.on("line", (line) => {
  const board = JSON.parse(line);
  const result = isValidSudoku(board);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      python: `board = eval(input())

def isValidSudoku(board):
    # Write your code here
    pass

result = isValidSudoku(board)
print("true" if result else "false")`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static boolean isValidSudoku(char[][] board) {
        // Write your code here
        return false;
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String boardStr = br.readLine();
        boardStr = boardStr.replace("[", "").replace("]", "");
        String[] rows = boardStr.split("],\\[");
        char[][] board = new char[9][9];
        for (int i = 0; i < 9; i++) {
            String row = rows[i].replace("\"", "").replace(",", "");
            for (int j = 0; j < 9; j++) {
                board[i][j] = row.charAt(j);
            }
        }
        
        boolean result = isValidSudoku(board);
        System.out.println(result ? "true" : "false");
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
#include <sstream>
#include <string>
using namespace std;

bool isValidSudoku(vector<vector<char>>& board) {
    // Write your code here
    return false;
}

int main() {
    string line;
    getline(cin, line);
    
    // Parse board - simplified parsing for this example
    vector<vector<char>> board(9, vector<char>(9));
    // Note: This is a simplified parser - in practice you'd need more robust parsing
    // For now, assume input format is handled correctly
    
    bool result = isValidSudoku(board);
    cout << (result ? "true" : "false") << endl;
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['array', 'hash-table', 'matrix'],
    acceptanceRate: 71,
    examples: [
      {
        input: '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
        output: 'true',
        explanation: 'The Sudoku board is valid as no duplicates in rows, columns, or 3x3 boxes.'
      }
    ],
    constraints: [
      { description: 'board.length == 9' },
      { description: 'board[i].length == 9' },
      { description: 'board[i][j] is a digit 1-9 or \'.\'.' }
    ],
    relatedConcepts: ['Hash Set', 'Matrix Validation'],
    hints: [
      { level: 1, content: 'Check each row, column, and 3x3 box for duplicates.' },
      { level: 2, content: 'Use hash sets to track seen numbers in each category.' },
      { level: 3, content: 'Calculate 3x3 box index using (row/3)*3 + col/3.' }
    ],
    walkthrough: 'Use three sets for each row, column, and 3x3 box. Check for duplicates in each category.',
    commonMistakes: [
      'Not handling empty cells (dots) properly.',
      'Incorrect 3x3 box indexing.'
    ],
    solutionCode: {
      javascript: 'function isValidSudoku(board) { const rows = Array(9).fill().map(() => new Set()); const cols = Array(9).fill().map(() => new Set()); const boxes = Array(9).fill().map(() => new Set()); for (let i = 0; i < 9; i++) { for (let j = 0; j < 9; j++) { const num = board[i][j]; if (num === \'.\') continue; const boxIndex = Math.floor(i/3) * 3 + Math.floor(j/3); if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) return false; rows[i].add(num); cols[j].add(num); boxes[boxIndex].add(num); } } return true; }',
      python: 'def isValidSudoku(board): rows = [set() for _ in range(9)]; cols = [set() for _ in range(9)]; boxes = [set() for _ in range(9)]; for i in range(9): for j in range(9): num = board[i][j]; if num == \'.\': continue; box_index = (i//3)*3 + j//3; if num in rows[i] or num in cols[j] or num in boxes[box_index]: return False; rows[i].add(num); cols[j].add(num); boxes[box_index].add(num); return True',
      java: 'public static boolean isValidSudoku(char[][] board) { Set<String> seen = new HashSet<>(); for (int i = 0; i < 9; i++) { for (int j = 0; j < 9; j++) { char num = board[i][j]; if (num != \'.\') { if (!seen.add(num + " in row " + i) || !seen.add(num + " in column " + j) || !seen.add(num + " in box " + i/3 + "-" + j/3)) return false; } } } return true; }',
      cpp: 'bool isValidSudoku(vector<vector<char>>& board) { unordered_set<string> seen; for (int i = 0; i < 9; i++) { for (int j = 0; j < 9; j++) { char num = board[i][j]; if (num != \'.\') { string row = "row " + to_string(i) + " " + num; string col = "col " + to_string(j) + " " + num; string box = "box " + to_string(i/3) + "-" + to_string(j/3) + " " + num; if (!seen.insert(row).second || !seen.insert(col).second || !seen.insert(box).second) return false; } } } return true; }'
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', expectedOutput: 'true\n' }
    ]
  },
  {
    id: 'arrays-hashing-8',
    title: 'Longest Consecutive Sequence',
    description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.',
    topicId: 'arrays-hashing',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function longestConsecutive(nums) {
  // Write your code here
  return 0;
}

rl.on("line", (line) => {
  const nums = JSON.parse(line);
  const result = longestConsecutive(nums);
  console.log(result);
  rl.close();
});`,
      python: `nums = eval(input())

def longestConsecutive(nums):
    # Write your code here
    pass

result = longestConsecutive(nums)
print(result)`,
      java: `import java.util.*;
import java.io.*;

public class Main {
    public static int longestConsecutive(int[] nums) {
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
        
        int result = longestConsecutive(nums);
        System.out.println(result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
#include <sstream>
#include <string>
using namespace std;

int longestConsecutive(vector<int>& nums) {
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
    
    int result = longestConsecutive(nums);
    cout << result << endl;
    
    return 0;
}`
    },
    difficulty: 'Hard',
    tags: ['array', 'hash-table', 'union-find'],
    acceptanceRate: 68,
    examples: [
      {
        input: '[100,4,200,1,3,2]',
        output: '4',
        explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.'
      },
      {
        input: '[0,3,7,2,5,8,4,6,0,1]',
        output: '9',
        explanation: 'The longest consecutive elements sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8].'
      }
    ],
    constraints: [
      { description: '0 <= nums.length <= 10^5' },
      { description: '-10^9 <= nums[i] <= 10^9' }
    ],
    relatedConcepts: ['Hash Set', 'Union Find'],
    hints: [
      { level: 1, content: 'Use a hash set to store all numbers for O(1) lookup.' },
      { level: 2, content: 'For each number, check if it\'s the start of a sequence.' },
      { level: 3, content: 'Only start counting from numbers that don\'t have num-1 in the set.' }
    ],
    walkthrough: 'Use hash set for O(1) lookup. For each number, if num-1 doesn\'t exist, start counting consecutive sequence.',
    commonMistakes: [
      'Sorting the array which gives O(n log n) time complexity.',
      'Not handling empty array or single element array.'
    ],
    solutionCode: {
      javascript: 'function longestConsecutive(nums) { const numSet = new Set(nums); let longest = 0; for (const num of numSet) { if (!numSet.has(num - 1)) { let current = num; let streak = 1; while (numSet.has(current + 1)) { current++; streak++; } longest = Math.max(longest, streak); } } return longest; }',
      python: 'def longestConsecutive(nums): num_set = set(nums); longest = 0; for num in num_set: if num - 1 not in num_set: current = num; streak = 1; while current + 1 in num_set: current += 1; streak += 1; longest = max(longest, streak); return longest',
      java: 'public static int longestConsecutive(int[] nums) { Set<Integer> numSet = new HashSet<>(); for (int num : nums) numSet.add(num); int longest = 0; for (int num : numSet) { if (!numSet.contains(num - 1)) { int current = num; int streak = 1; while (numSet.contains(current + 1)) { current++; streak++; } longest = Math.max(longest, streak); } } return longest; }',
      cpp: 'int longestConsecutive(vector<int>& nums) { unordered_set<int> numSet(nums.begin(), nums.end()); int longest = 0; for (int num : numSet) { if (numSet.find(num - 1) == numSet.end()) { int current = num; int streak = 1; while (numSet.find(current + 1) != numSet.end()) { current++; streak++; } longest = max(longest, streak); } } return longest; }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '[100,4,200,1,3,2]', expectedOutput: '4\n' },
      { input: '[0,3,7,2,5,8,4,6,0,1]', expectedOutput: '9\n' },
      { input: '[]', expectedOutput: '0\n' }
    ]
  }
];
