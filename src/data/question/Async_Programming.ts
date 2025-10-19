export const asyncProgramming = [
  {
    id: 'async-programming-1',
    title: 'Promise Basics',
    description: 'Create a function that returns a Promise that resolves with a given value after a specified delay. Handle both success and error cases.',
    topicId: 'async-programming',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createDelayedPromise(value, delay) {
  // Write your code here
  return new Promise((resolve, reject) => {
    // Implement promise logic
  });
}

function handlePromise(value, delay) {
  // Write your code here to handle the promise
  return createDelayedPromise(value, delay)
    .then(result => {
      console.log("Success:", result);
      return result;
    })
    .catch(error => {
      console.log("Error:", error);
      throw error;
    });
}

rl.on("line", (line) => {
  const [value, delayStr] = line.split(" | ");
  const delay = parseInt(delayStr);
  
  handlePromise(value, delay)
    .then(() => rl.close())
    .catch(() => rl.close());
});`,
      python: `import asyncio
import sys

async def create_delayed_promise(value, delay):
    # Write your code here
    pass

async def handle_promise(value, delay):
    # Write your code here to handle the promise
    pass

async def main():
    line = input()
    value, delay_str = line.split(" | ")
    delay = int(delay_str)
    
    try:
        await handle_promise(value, delay)
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(main())`,
      java: `import java.util.*;
import java.util.concurrent.*;
import java.io.*;

public class Main {
    public static CompletableFuture<String> createDelayedPromise(String value, int delay) {
        // Write your code here
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(delay);
                return value;
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        String value = parts[0];
        int delay = Integer.parseInt(parts[1]);
        
        createDelayedPromise(value, delay)
            .thenAccept(result -> System.out.println("Success: " + result))
            .exceptionally(error -> {
                System.out.println("Error: " + error.getMessage());
                return null;
            })
            .join();
    }
}`,
      cpp: `#include <iostream>
#include <future>
#include <thread>
#include <chrono>
#include <string>
using namespace std;

future<string> createDelayedPromise(string value, int delay) {
    // Write your code here
    return async(launch::async, [value, delay]() {
        this_thread::sleep_for(chrono::milliseconds(delay));
        return value;
    });
}

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    string value = line.substr(0, pipePos);
    int delay = stoi(line.substr(pipePos + 3));
    
    auto future = createDelayedPromise(value, delay);
    try {
        string result = future.get();
        cout << "Success: " << result << endl;
    } catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    return 0;
}`
    },
    difficulty: 'Easy',
    tags: ['promise', 'async', 'javascript'],
    acceptanceRate: 88,
    examples: [
      {
        input: '"Hello" | 1000',
        output: 'Success: Hello',
        explanation: 'Promise resolves with "Hello" after 1 second delay.'
      },
      {
        input: '"Error" | 500',
        output: 'Success: Error',
        explanation: 'Promise resolves with "Error" after 0.5 second delay.'
      }
    ],
    constraints: [
      { description: '0 <= delay <= 5000 (milliseconds)' },
      { description: 'Value can be any string' }
    ],
    relatedConcepts: ['Promises', 'Async/Await', 'Error Handling'],
    hints: [
      { level: 1, content: 'Use setTimeout in JavaScript or similar delay mechanisms.' },
      { level: 2, content: 'Handle both resolve and reject cases in the Promise constructor.' },
      { level: 3, content: 'Use .then() and .catch() for promise handling.' }
    ],
    walkthrough: 'Create a Promise that uses setTimeout to delay resolution. Handle both success and error cases.',
    commonMistakes: [
      'Not properly handling promise rejection.',
      'Incorrect delay implementation.'
    ],
    solutionCode: {
      javascript: 'function createDelayedPromise(value, delay) { return new Promise((resolve, reject) => { setTimeout(() => { if (value === "error") reject(new Error("Intentional error")); else resolve(value); }, delay); }); }',
      python: 'async def create_delayed_promise(value, delay): await asyncio.sleep(delay / 1000); if value == "error": raise Exception("Intentional error"); return value',
      java: 'public static CompletableFuture<String> createDelayedPromise(String value, int delay) { return CompletableFuture.supplyAsync(() -> { try { Thread.sleep(delay); if ("error".equals(value)) throw new RuntimeException("Intentional error"); return value; } catch (InterruptedException e) { throw new RuntimeException(e); } }); }',
      cpp: 'future<string> createDelayedPromise(string value, int delay) { return async(launch::async, [value, delay]() { this_thread::sleep_for(chrono::milliseconds(delay)); if (value == "error") throw runtime_error("Intentional error"); return value; }); }'
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    testCases: [
      { input: '"Hello" | 100', expectedOutput: 'Success: Hello\n' },
      { input: '"World" | 200', expectedOutput: 'Success: World\n' },
      { input: '"error" | 100', expectedOutput: 'Error: Intentional error\n' }
    ]
  },
  {
    id: 'async-programming-2',
    title: 'Async/Await Pattern',
    description: 'Implement a function that uses async/await to handle multiple asynchronous operations sequentially and return the combined result.',
    topicId: 'async-programming',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processSequentially(operations) {
  // Write your code here using async/await
  const results = [];
  
  // Process each operation sequentially
  for (const operation of operations) {
    // Implement sequential processing
  }
  
  return results;
}

rl.on("line", async (line) => {
  const operations = JSON.parse(line);
  
  try {
    const results = await processSequentially(operations);
    console.log(JSON.stringify(results));
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    rl.close();
  }
});`,
      python: `import asyncio
import json
import sys

async def delay(ms):
    await asyncio.sleep(ms / 1000)

async def process_sequentially(operations):
    # Write your code here using async/await
    results = []
    
    # Process each operation sequentially
    for operation in operations:
        # Implement sequential processing
        pass
    
    return results

async def main():
    line = input()
    operations = json.loads(line)
    
    try:
        results = await process_sequentially(operations)
        print(json.dumps(results))
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(main())`,
      java: `import java.util.*;
import java.util.concurrent.*;
import java.io.*;

public class Main {
    public static CompletableFuture<Void> delay(int ms) {
        return CompletableFuture.runAsync(() -> {
            try {
                Thread.sleep(ms);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
    }
    
    public static CompletableFuture<List<String>> processSequentially(List<String> operations) {
        // Write your code here using async/await pattern
        return CompletableFuture.supplyAsync(() -> {
            List<String> results = new ArrayList<>();
            
            // Process each operation sequentially
            for (String operation : operations) {
                // Implement sequential processing
            }
            
            return results;
        });
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String operationsStr = br.readLine();
        
        // Parse operations list (simplified)
        List<String> operations = Arrays.asList(operationsStr.replace("[", "").replace("]", "").split(","));
        
        processSequentially(operations)
            .thenAccept(results -> System.out.println(results.toString()))
            .exceptionally(error -> {
                System.out.println("Error: " + error.getMessage());
                return null;
            })
            .join();
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <future>
#include <thread>
#include <chrono>
using namespace std;

future<void> delay(int ms) {
    return async(launch::async, [ms]() {
        this_thread::sleep_for(chrono::milliseconds(ms));
    });
}

future<vector<string>> processSequentially(const vector<string>& operations) {
    // Write your code here using async pattern
    return async(launch::async, [operations]() {
        vector<string> results;
        
        // Process each operation sequentially
        for (const auto& operation : operations) {
            // Implement sequential processing
        }
        
        return results;
    });
}

int main() {
    string line;
    getline(cin, line);
    
    // Simplified parsing - in practice you'd need more robust parsing
    vector<string> operations;
    // Parse operations from input
    
    try {
        auto future = processSequentially(operations);
        auto results = future.get();
        
        cout << "[";
        for (size_t i = 0; i < results.size(); i++) {
            cout << "\"" << results[i] << "\"";
            if (i < results.size() - 1) cout << ",";
        }
        cout << "]" << endl;
    } catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    return 0;
}`
    },
    difficulty: 'Easy',
    tags: ['async', 'await', 'sequential-processing'],
    acceptanceRate: 85,
    examples: [
      {
        input: '["op1", "op2", "op3"]',
        output: '["processed_op1", "processed_op2", "processed_op3"]',
        explanation: 'Process each operation sequentially with a delay between them.'
      },
      {
        input: '["task1", "task2"]',
        output: '["processed_task1", "processed_task2"]',
        explanation: 'Process two tasks sequentially.'
      }
    ],
    constraints: [
      { description: '1 <= operations.length <= 10' },
      { description: 'Each operation takes 100ms to process' }
    ],
    relatedConcepts: ['Async/Await', 'Sequential Processing', 'Promise Chaining'],
    hints: [
      { level: 1, content: 'Use async/await with a for loop for sequential processing.' },
      { level: 2, content: 'Add a delay between each operation.' },
      { level: 3, content: 'Handle errors properly with try-catch.' }
    ],
    walkthrough: 'Use async/await in a loop to process operations one by one, adding delays between them.',
    commonMistakes: [
      'Using Promise.all() instead of sequential processing.',
      'Not properly awaiting each operation.'
    ],
    solutionCode: {
      javascript: 'async function processSequentially(operations) { const results = []; for (const operation of operations) { await delay(100); results.push(`processed_${operation}`); } return results; }',
      python: 'async def process_sequentially(operations): results = []; for operation in operations: await delay(100); results.append(f"processed_{operation}"); return results',
      java: 'public static CompletableFuture<List<String>> processSequentially(List<String> operations) { return CompletableFuture.supplyAsync(() -> { List<String> results = new ArrayList<>(); for (String operation : operations) { try { Thread.sleep(100); results.add("processed_" + operation); } catch (InterruptedException e) { throw new RuntimeException(e); } } return results; }); }',
      cpp: 'future<vector<string>> processSequentially(const vector<string>& operations) { return async(launch::async, [operations]() { vector<string> results; for (const auto& operation : operations) { this_thread::sleep_for(chrono::milliseconds(100)); results.push_back("processed_" + operation); } return results; }); }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '["op1", "op2", "op3"]', expectedOutput: '["processed_op1","processed_op2","processed_op3"]\n' },
      { input: '["task1", "task2"]', expectedOutput: '["processed_task1","processed_task2"]\n' },
      { input: '["single"]', expectedOutput: '["processed_single"]\n' }
    ]
  },
  {
    id: 'async-programming-3',
    title: 'Promise.all Implementation',
    description: 'Implement a function that waits for multiple promises to resolve and returns their results. Handle both success and failure cases.',
    topicId: 'async-programming',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

function createPromises(operations) {
  // Write your code here to create promises from operations
  return [];
}

async function waitForAll(promises) {
  // Write your code here to implement Promise.all behavior
  const results = [];
  let completedCount = 0;
  
  return new Promise((resolve, reject) => {
    // Implement Promise.all logic
  });
}

rl.on("line", async (line) => {
  const operations = JSON.parse(line);
  
  try {
    const promises = createPromises(operations);
    const results = await waitForAll(promises);
    console.log(JSON.stringify(results));
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    rl.close();
  }
});`,
      python: `import asyncio
import json
import sys

async def delay(ms, value):
    await asyncio.sleep(ms / 1000)
    return value

def create_promises(operations):
    # Write your code here to create promises from operations
    return []

async def wait_for_all(promises):
    # Write your code here to implement Promise.all behavior
    results = []
    
    # Implement Promise.all logic
    return results

async def main():
    line = input()
    operations = json.loads(line)
    
    try:
        promises = create_promises(operations)
        results = await wait_for_all(promises)
        print(json.dumps(results))
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(main())`,
      java: `import java.util.*;
import java.util.concurrent.*;
import java.io.*;

public class Main {
    public static CompletableFuture<String> delay(int ms, String value) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(ms);
                return value;
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
    }
    
    public static List<CompletableFuture<String>> createPromises(List<String> operations) {
        // Write your code here to create promises from operations
        List<CompletableFuture<String>> promises = new ArrayList<>();
        
        // Implement promise creation
        return promises;
    }
    
    public static CompletableFuture<List<String>> waitForAll(List<CompletableFuture<String>> promises) {
        // Write your code here to implement Promise.all behavior
        return CompletableFuture.allOf(promises.toArray(new CompletableFuture[0]))
            .thenApply(v -> promises.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList()));
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String operationsStr = br.readLine();
        
        // Parse operations list (simplified)
        List<String> operations = Arrays.asList(operationsStr.replace("[", "").replace("]", "").split(","));
        
        try {
            List<CompletableFuture<String>> promises = createPromises(operations);
            CompletableFuture<List<String>> allResults = waitForAll(promises);
            List<String> results = allResults.join();
            System.out.println(results.toString());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <future>
#include <thread>
#include <chrono>
using namespace std;

future<string> delay(int ms, string value) {
    return async(launch::async, [ms, value]() {
        this_thread::sleep_for(chrono::milliseconds(ms));
        return value;
    });
}

vector<future<string>> createPromises(const vector<string>& operations) {
    // Write your code here to create promises from operations
    vector<future<string>> promises;
    
    // Implement promise creation
    return promises;
}

vector<string> waitForAll(vector<future<string>>& promises) {
    // Write your code here to implement Promise.all behavior
    vector<string> results;
    
    // Implement Promise.all logic
    return results;
}

int main() {
    string line;
    getline(cin, line);
    
    // Simplified parsing - in practice you'd need more robust parsing
    vector<string> operations;
    // Parse operations from input
    
    try {
        auto promises = createPromises(operations);
        auto results = waitForAll(promises);
        
        cout << "[";
        for (size_t i = 0; i < results.size(); i++) {
            cout << "\"" << results[i] << "\"";
            if (i < results.size() - 1) cout << ",";
        }
        cout << "]" << endl;
    } catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['promise', 'parallel-processing', 'error-handling'],
    acceptanceRate: 78,
    examples: [
      {
        input: '[{"delay": 100, "value": "task1"}, {"delay": 200, "value": "task2"}]',
        output: '["task1", "task2"]',
        explanation: 'Wait for both tasks to complete and return all results.'
      },
      {
        input: '[{"delay": 50, "value": "fast"}, {"delay": 100, "value": "slow"}]',
        output: '["fast", "slow"]',
        explanation: 'Return results in the order they were provided, not completion order.'
      }
    ],
    constraints: [
      { description: '1 <= operations.length <= 5' },
      { description: '0 <= delay <= 500 (milliseconds)' }
    ],
    relatedConcepts: ['Promise.all', 'Parallel Processing', 'Error Propagation'],
    hints: [
      { level: 1, content: 'Create promises for each operation using the delay function.' },
      { level: 2, content: 'Wait for all promises to resolve or any to reject.' },
      { level: 3, content: 'Return results in the same order as input operations.' }
    ],
    walkthrough: 'Create promises from operations, then wait for all to complete. If any fails, reject immediately.',
    commonMistakes: [
      'Not handling promise rejection properly.',
      'Returning results in completion order instead of input order.'
    ],
    solutionCode: {
      javascript: 'function createPromises(operations) { return operations.map(op => delay(op.delay, op.value)); } async function waitForAll(promises) { return Promise.all(promises); }',
      python: 'def create_promises(operations): return [delay(op["delay"], op["value"]) for op in operations]; async def wait_for_all(promises): return await asyncio.gather(*promises)',
      java: 'public static List<CompletableFuture<String>> createPromises(List<Map<String, Object>> operations) { return operations.stream().map(op -> delay((Integer)op.get("delay"), (String)op.get("value"))).collect(Collectors.toList()); } public static CompletableFuture<List<String>> waitForAll(List<CompletableFuture<String>> promises) { return CompletableFuture.allOf(promises.toArray(new CompletableFuture[0])).thenApply(v -> promises.stream().map(CompletableFuture::join).collect(Collectors.toList())); }',
      cpp: 'vector<future<string>> createPromises(const vector<map<string, string>>& operations) { vector<future<string>> promises; for (const auto& op : operations) { int delay = stoi(op.at("delay")); string value = op.at("value"); promises.push_back(delay(delay, value)); } return promises; } vector<string> waitForAll(vector<future<string>>& promises) { vector<string> results; for (auto& promise : promises) { results.push_back(promise.get()); } return results; }'
    },
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '[{"delay": 100, "value": "task1"}, {"delay": 200, "value": "task2"}]', expectedOutput: '["task1","task2"]\n' },
      { input: '[{"delay": 50, "value": "fast"}, {"delay": 100, "value": "slow"}]', expectedOutput: '["fast","slow"]\n' },
      { input: '[{"delay": 100, "value": "single"}]', expectedOutput: '["single"]\n' }
    ]
  },
  {
    id: 'async-programming-4',
    title: 'Rate Limiter',
    description: 'Implement a rate limiter that allows a maximum number of operations per time window. Queue additional operations and execute them when the rate limit allows.',
    topicId: 'async-programming',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
    // Write your code here to initialize the rate limiter
  }
  
  async execute(operation) {
    // Write your code here to implement rate limiting
    return new Promise((resolve, reject) => {
      // Implement rate limiting logic
    });
  }
  
  cleanup() {
    // Write your code here to clean up old requests
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
  }
}

rl.on("line", async (line) => {
  const [maxRequestsStr, timeWindowStr, operationsStr] = line.split(" | ");
  const maxRequests = parseInt(maxRequestsStr);
  const timeWindow = parseInt(timeWindowStr);
  const operations = JSON.parse(operationsStr);
  
  const rateLimiter = new RateLimiter(maxRequests, timeWindow);
  const results = [];
  
  try {
    for (const operation of operations) {
      const result = await rateLimiter.execute(operation);
      results.push(result);
    }
    console.log(JSON.stringify(results));
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    rl.close();
  }
});`,
      python: `import asyncio
import json
import time
from collections import deque

class RateLimiter:
    def __init__(self, max_requests, time_window):
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = deque()
        # Write your code here to initialize the rate limiter
    
    async def execute(self, operation):
        # Write your code here to implement rate limiting
        pass
    
    def cleanup(self):
        # Write your code here to clean up old requests
        current_time = time.time() * 1000
        while self.requests and current_time - self.requests[0] > self.time_window:
            self.requests.popleft()

async def main():
    line = input()
    max_requests_str, time_window_str, operations_str = line.split(" | ")
    max_requests = int(max_requests_str)
    time_window = int(time_window_str)
    operations = json.loads(operations_str)
    
    rate_limiter = RateLimiter(max_requests, time_window)
    results = []
    
    try:
        for operation in operations:
            result = await rate_limiter.execute(operation)
            results.append(result)
        print(json.dumps(results))
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(main())`,
      java: `import java.util.*;
import java.util.concurrent.*;
import java.io.*;

public class Main {
    static class RateLimiter {
        private int maxRequests;
        private long timeWindow;
        private Queue<Long> requests;
        
        public RateLimiter(int maxRequests, long timeWindow) {
            this.maxRequests = maxRequests;
            this.timeWindow = timeWindow;
            this.requests = new LinkedList<>();
            // Write your code here to initialize the rate limiter
        }
        
        public CompletableFuture<String> execute(String operation) {
            // Write your code here to implement rate limiting
            return CompletableFuture.supplyAsync(() -> {
                // Implement rate limiting logic
                return operation;
            });
        }
        
        private void cleanup() {
            // Write your code here to clean up old requests
            long now = System.currentTimeMillis();
            while (!requests.isEmpty() && now - requests.peek() > timeWindow) {
                requests.poll();
            }
        }
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        int maxRequests = Integer.parseInt(parts[0]);
        long timeWindow = Long.parseLong(parts[1]);
        String operationsStr = parts[2];
        
        // Parse operations list (simplified)
        List<String> operations = Arrays.asList(operationsStr.replace("[", "").replace("]", "").split(","));
        
        RateLimiter rateLimiter = new RateLimiter(maxRequests, timeWindow);
        List<String> results = new ArrayList<>();
        
        try {
            for (String operation : operations) {
                String result = rateLimiter.execute(operation).join();
                results.add(result);
            }
            System.out.println(results.toString());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <chrono>
#include <thread>
using namespace std;

class RateLimiter {
private:
    int maxRequests;
    long timeWindow;
    queue<long> requests;
    
public:
    RateLimiter(int maxRequests, long timeWindow) 
        : maxRequests(maxRequests), timeWindow(timeWindow) {
        // Write your code here to initialize the rate limiter
    }
    
    string execute(const string& operation) {
        // Write your code here to implement rate limiting
        cleanup();
        
        auto now = chrono::duration_cast<chrono::milliseconds>(
            chrono::system_clock::now().time_since_epoch()).count();
        
        // Implement rate limiting logic
        if (requests.size() >= maxRequests) {
            long waitTime = timeWindow - (now - requests.front());
            if (waitTime > 0) {
                this_thread::sleep_for(chrono::milliseconds(waitTime));
                cleanup();
            }
        }
        
        requests.push(now);
        return operation;
    }
    
private:
    void cleanup() {
        // Write your code here to clean up old requests
        auto now = chrono::duration_cast<chrono::milliseconds>(
            chrono::system_clock::now().time_since_epoch()).count();
        
        while (!requests.empty() && now - requests.front() > timeWindow) {
            requests.pop();
        }
    }
};

int main() {
    string line;
    getline(cin, line);
    
    size_t pipe1 = line.find(" | ");
    size_t pipe2 = line.find(" | ", pipe1 + 1);
    
    int maxRequests = stoi(line.substr(0, pipe1));
    long timeWindow = stol(line.substr(pipe1 + 3, pipe2 - pipe1 - 3));
    string operationsStr = line.substr(pipe2 + 3);
    
    // Simplified parsing - in practice you'd need more robust parsing
    vector<string> operations;
    // Parse operations from input
    
    RateLimiter rateLimiter(maxRequests, timeWindow);
    vector<string> results;
    
    try {
        for (const auto& operation : operations) {
            string result = rateLimiter.execute(operation);
            results.push_back(result);
        }
        
        cout << "[";
        for (size_t i = 0; i < results.size(); i++) {
            cout << "\"" << results[i] << "\"";
            if (i < results.size() - 1) cout << ",";
        }
        cout << "]" << endl;
    } catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    return 0;
}`
    },
    difficulty: 'Medium',
    tags: ['rate-limiting', 'async', 'queue'],
    acceptanceRate: 72,
    examples: [
      {
        input: '2 | 1000 | ["op1", "op2", "op3"]',
        output: '["op1", "op2", "op3"]',
        explanation: 'Allow 2 operations per 1000ms window. Third operation waits.'
      },
      {
        input: '1 | 500 | ["task1", "task2"]',
        output: '["task1", "task2"]',
        explanation: 'Allow 1 operation per 500ms window. Second operation waits.'
      }
    ],
    constraints: [
      { description: '1 <= maxRequests <= 10' },
      { description: '100 <= timeWindow <= 2000 (milliseconds)' },
      { description: '1 <= operations.length <= 5' }
    ],
    relatedConcepts: ['Rate Limiting', 'Queue Management', 'Time Windows'],
    hints: [
      { level: 1, content: 'Track request timestamps in a queue.' },
      { level: 2, content: 'Clean up old requests outside the time window.' },
      { level: 3, content: 'Block execution if rate limit is exceeded.' }
    ],
    walkthrough: 'Maintain a queue of request timestamps. Before each operation, clean old requests and check if rate limit allows execution.',
    commonMistakes: [
      'Not properly cleaning up old requests.',
      'Incorrect time window calculations.'
    ],
    solutionCode: {
      javascript: 'constructor(maxRequests, timeWindow) { this.maxRequests = maxRequests; this.timeWindow = timeWindow; this.requests = []; } async execute(operation) { this.cleanup(); const now = Date.now(); if (this.requests.length >= this.maxRequests) { const waitTime = this.timeWindow - (now - this.requests[0]); if (waitTime > 0) { await new Promise(resolve => setTimeout(resolve, waitTime)); this.cleanup(); } } this.requests.push(now); return operation; } cleanup() { const now = Date.now(); this.requests = this.requests.filter(time => now - time < this.timeWindow); }',
      python: 'def __init__(self, max_requests, time_window): self.max_requests = max_requests; self.time_window = time_window; self.requests = deque(); async def execute(self, operation): self.cleanup(); current_time = time.time() * 1000; if len(self.requests) >= self.max_requests: wait_time = self.time_window - (current_time - self.requests[0]); if wait_time > 0: await asyncio.sleep(wait_time / 1000); self.cleanup(); self.requests.append(current_time); return operation',
      java: 'public RateLimiter(int maxRequests, long timeWindow) { this.maxRequests = maxRequests; this.timeWindow = timeWindow; this.requests = new LinkedList<>(); } public CompletableFuture<String> execute(String operation) { return CompletableFuture.supplyAsync(() -> { cleanup(); long now = System.currentTimeMillis(); if (requests.size() >= maxRequests) { long waitTime = timeWindow - (now - requests.peek()); if (waitTime > 0) { try { Thread.sleep(waitTime); cleanup(); } catch (InterruptedException e) { throw new RuntimeException(e); } } } requests.offer(now); return operation; }); }',
      cpp: 'RateLimiter(int maxRequests, long timeWindow) : maxRequests(maxRequests), timeWindow(timeWindow) {} string execute(const string& operation) { cleanup(); auto now = chrono::duration_cast<chrono::milliseconds>(chrono::system_clock::now().time_since_epoch()).count(); if (requests.size() >= maxRequests) { long waitTime = timeWindow - (now - requests.front()); if (waitTime > 0) { this_thread::sleep_for(chrono::milliseconds(waitTime)); cleanup(); } } requests.push(now); return operation; }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    testCases: [
      { input: '2 | 1000 | ["op1", "op2", "op3"]', expectedOutput: '["op1","op2","op3"]\n' },
      { input: '1 | 500 | ["task1", "task2"]', expectedOutput: '["task1","task2"]\n' },
      { input: '3 | 100 | ["a", "b", "c", "d"]', expectedOutput: '["a","b","c","d"]\n' }
    ]
  },
  {
    id: 'async-programming-5',
    title: 'Async Queue Processing',
    description: 'Implement an asynchronous queue that processes items concurrently with a configurable concurrency limit. Items should be processed in order but execution can be parallel.',
    topicId: 'async-programming',
    language: 'javascript',
    languageId: 63,
    starterCode: {
      javascript: `const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class AsyncQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
    // Write your code here to initialize the async queue
  }
  
  async add(item) {
    // Write your code here to add item to queue
    return new Promise((resolve, reject) => {
      // Implement queue addition logic
    });
  }
  
  async processItem(item) {
    // Write your code here to process individual items
    // Simulate async work
    await new Promise(resolve => setTimeout(resolve, item.duration || 100));
    return \`processed_\${item.id}\`;
  }
  
  async start() {
    // Write your code here to start processing the queue
    while (this.queue.length > 0 || this.running > 0) {
      // Implement queue processing logic
    }
  }
}

rl.on("line", async (line) => {
  const [concurrencyStr, itemsStr] = line.split(" | ");
  const concurrency = parseInt(concurrencyStr);
  const items = JSON.parse(itemsStr);
  
  const queue = new AsyncQueue(concurrency);
  const promises = [];
  
  try {
    // Add all items to queue
    for (const item of items) {
      const promise = queue.add(item);
      promises.push(promise);
    }
    
    // Start processing
    await queue.start();
    
    // Wait for all items to complete
    const results = await Promise.all(promises);
    console.log(JSON.stringify(results));
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    rl.close();
  }
});`,
      python: `import asyncio
import json
from asyncio import Semaphore

class AsyncQueue:
    def __init__(self, concurrency=3):
        self.concurrency = concurrency
        self.semaphore = Semaphore(concurrency)
        self.results = []
        # Write your code here to initialize the async queue
    
    async def add(self, item):
        # Write your code here to add item to queue
        pass
    
    async def process_item(self, item):
        # Write your code here to process individual items
        # Simulate async work
        await asyncio.sleep(item.get("duration", 100) / 1000)
        return f"processed_{item['id']}"
    
    async def start(self):
        # Write your code here to start processing the queue
        pass

async def main():
    line = input()
    concurrency_str, items_str = line.split(" | ")
    concurrency = int(concurrency_str)
    items = json.loads(items_str)
    
    queue = AsyncQueue(concurrency)
    
    try:
        # Add all items to queue
        tasks = []
        for item in items:
            task = asyncio.create_task(queue.add(item))
            tasks.append(task)
        
        # Wait for all items to complete
        results = await asyncio.gather(*tasks)
        print(json.dumps(results))
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(main())`,
      java: `import java.util.*;
import java.util.concurrent.*;
import java.io.*;

public class Main {
    static class AsyncQueue {
        private int concurrency;
        private Semaphore semaphore;
        private ExecutorService executor;
        private List<CompletableFuture<String>> futures;
        
        public AsyncQueue(int concurrency) {
            this.concurrency = concurrency;
            this.semaphore = new Semaphore(concurrency);
            this.executor = Executors.newFixedThreadPool(concurrency);
            this.futures = new ArrayList<>();
            // Write your code here to initialize the async queue
        }
        
        public CompletableFuture<String> add(Map<String, Object> item) {
            // Write your code here to add item to queue
            return CompletableFuture.supplyAsync(() -> {
                try {
                    semaphore.acquire();
                    // Process item
                    Thread.sleep(((Number) item.getOrDefault("duration", 100)).longValue());
                    return "processed_" + item.get("id");
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                } finally {
                    semaphore.release();
                }
            }, executor);
        }
        
        public CompletableFuture<List<String>> processAll(List<Map<String, Object>> items) {
            // Write your code here to process all items
            List<CompletableFuture<String>> futures = new ArrayList<>();
            for (Map<String, Object> item : items) {
                futures.add(add(item));
            }
            return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(v -> futures.stream()
                    .map(CompletableFuture::join)
                    .collect(Collectors.toList()));
        }
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] parts = br.readLine().split(" \\| ");
        int concurrency = Integer.parseInt(parts[0]);
        String itemsStr = parts[1];
        
        // Simplified parsing - in practice you'd need more robust parsing
        List<Map<String, Object>> items = new ArrayList<>();
        // Parse items from input
        
        AsyncQueue queue = new AsyncQueue(concurrency);
        
        try {
            CompletableFuture<List<String>> allResults = queue.processAll(items);
            List<String> results = allResults.join();
            System.out.println(results.toString());
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <thread>
#include <future>
#include <semaphore>
#include <chrono>
using namespace std;

class AsyncQueue {
private:
    int concurrency;
    counting_semaphore<10> semaphore; // Assuming max concurrency of 10
    
public:
    AsyncQueue(int concurrency) : concurrency(concurrency), semaphore(concurrency) {
        // Write your code here to initialize the async queue
    }
    
    future<string> add(const map<string, int>& item) {
        // Write your code here to add item to queue
        return async(launch::async, [this, item]() {
            semaphore.acquire();
            try {
                // Process item
                int duration = item.count("duration") ? item.at("duration") : 100;
                this_thread::sleep_for(chrono::milliseconds(duration));
                return "processed_" + to_string(item.at("id"));
            } finally {
                semaphore.release();
            }
        });
    }
    
    vector<string> processAll(const vector<map<string, int>>& items) {
        // Write your code here to process all items
        vector<future<string>> futures;
        for (const auto& item : items) {
            futures.push_back(add(item));
        }
        
        vector<string> results;
        for (auto& future : futures) {
            results.push_back(future.get());
        }
        return results;
    }
};

int main() {
    string line;
    getline(cin, line);
    
    size_t pipePos = line.find(" | ");
    int concurrency = stoi(line.substr(0, pipePos));
    string itemsStr = line.substr(pipePos + 3);
    
    // Simplified parsing - in practice you'd need more robust parsing
    vector<map<string, int>> items;
    // Parse items from input
    
    AsyncQueue queue(concurrency);
    
    try {
        auto results = queue.processAll(items);
        
        cout << "[";
        for (size_t i = 0; i < results.size(); i++) {
            cout << "\"" << results[i] << "\"";
            if (i < results.size() - 1) cout << ",";
        }
        cout << "]" << endl;
    } catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
    }
    
    return 0;
}`
    },
    difficulty: 'Hard',
    tags: ['async-queue', 'concurrency', 'semaphore'],
    acceptanceRate: 68,
    examples: [
      {
        input: '2 | [{"id": 1, "duration": 100}, {"id": 2, "duration": 200}, {"id": 3, "duration": 150}]',
        output: '["processed_1", "processed_2", "processed_3"]',
        explanation: 'Process items with concurrency limit of 2. Items are processed in parallel but results maintain order.'
      },
      {
        input: '3 | [{"id": 1}, {"id": 2}, {"id": 3}]',
        output: '["processed_1", "processed_2", "processed_3"]',
        explanation: 'Process 3 items with concurrency limit of 3. All items can be processed simultaneously.'
      }
    ],
    constraints: [
      { description: '1 <= concurrency <= 10' },
      { description: '1 <= items.length <= 10' },
      { description: '0 <= duration <= 500 (milliseconds)' }
    ],
    relatedConcepts: ['Async Queues', 'Concurrency Control', 'Semaphores'],
    hints: [
      { level: 1, content: 'Use semaphores or similar mechanisms to limit concurrent execution.' },
      { level: 2, content: 'Maintain order of results while allowing parallel processing.' },
      { level: 3, content: 'Use Promise.all or similar to wait for all items to complete.' }
    ],
    walkthrough: 'Use a semaphore to limit concurrent execution. Process items in parallel but maintain result order.',
    commonMistakes: [
      'Not properly managing concurrency limits.',
      'Losing order of results due to parallel execution.'
    ],
    solutionCode: {
      javascript: 'constructor(concurrency = 3) { this.concurrency = concurrency; this.running = 0; this.queue = []; } async add(item) { return new Promise((resolve, reject) => { this.queue.push({ item, resolve, reject }); this.processNext(); }); } async processNext() { if (this.running >= this.concurrency || this.queue.length === 0) return; this.running++; const { item, resolve, reject } = this.queue.shift(); try { const result = await this.processItem(item); resolve(result); } catch (error) { reject(error); } finally { this.running--; this.processNext(); } }',
      python: 'def __init__(self, concurrency=3): self.concurrency = concurrency; self.semaphore = Semaphore(concurrency); self.results = []; async def add(self, item): await self.semaphore.acquire(); try: result = await self.process_item(item); return result; finally: self.semaphore.release()',
      java: 'public AsyncQueue(int concurrency) { this.concurrency = concurrency; this.semaphore = new Semaphore(concurrency); this.executor = Executors.newFixedThreadPool(concurrency); this.futures = new ArrayList<>(); } public CompletableFuture<String> add(Map<String, Object> item) { return CompletableFuture.supplyAsync(() -> { try { semaphore.acquire(); Thread.sleep(((Number) item.getOrDefault("duration", 100)).longValue()); return "processed_" + item.get("id"); } catch (InterruptedException e) { throw new RuntimeException(e); } finally { semaphore.release(); } }, executor); }',
      cpp: 'AsyncQueue(int concurrency) : concurrency(concurrency), semaphore(concurrency) {} future<string> add(const map<string, int>& item) { return async(launch::async, [this, item]() { semaphore.acquire(); try { int duration = item.count("duration") ? item.at("duration") : 100; this_thread::sleep_for(chrono::milliseconds(duration)); return "processed_" + to_string(item.at("id")); } finally { semaphore.release(); } }); }'
    },
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    testCases: [
      { input: '2 | [{"id": 1, "duration": 100}, {"id": 2, "duration": 200}, {"id": 3, "duration": 150}]', expectedOutput: '["processed_1","processed_2","processed_3"]\n' },
      { input: '3 | [{"id": 1}, {"id": 2}, {"id": 3}]', expectedOutput: '["processed_1","processed_2","processed_3"]\n' },
      { input: '1 | [{"id": 1, "duration": 50}, {"id": 2, "duration": 50}]', expectedOutput: '["processed_1","processed_2"]\n' }
    ]
  }
];
