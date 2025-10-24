---
title: Implementing a Queue in C++ Using Standard Template Library (STL)
description: Comprehensive guide to using C++ STL queue container with practical examples
pubDate: 2025-10-20
category: DSA
author: Dev Elevate Team
tags: ["queue", "cpp", "stl", "data-structures", "algorithms"]
---

The C++ Standard Template Library (STL) provides a robust and efficient `queue` container adapter that implements the FIFO (First-In-First-Out) data structure. This guide covers everything you need to know about using STL queues effectively in your C++ programs.

---

## Introduction to STL Queue

The STL `queue` is not a container itself, but a **container adapter** that provides a specific interface for queue operations. It uses an underlying container (default is `deque`) to store elements and restricts access to ensure FIFO behavior.

### Why Use STL Queue?

- **Pre-tested and optimized** implementation
- **Type-safe** with templates
- **Memory efficient** with proper underlying container choice
- **Easy to use** with clear, intuitive API
- **Standard across platforms**

---

## Basic Include and Declaration

```cpp
#include <iostream>
#include <queue>
#include <deque>
#include <list>
using namespace std;

int main() {
    // Default queue using deque as underlying container
    queue<int> defaultQueue;
    
    // Queue using list as underlying container
    queue<int, list<int>> listQueue;
    
    // Queue using deque (explicit)
    queue<int, deque<int>> dequeQueue;
    
    return 0;
}
```

**Note:** You can only use containers that support:
- `front()`, `back()`
- `push_back()`, `pop_front()`
- Valid containers: `deque` (default), `list`
- Invalid: `vector` (no `pop_front()`)

---

## Essential Queue Operations

### 1. **push()** - Add Element to Rear

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    // Add elements to the rear of queue (FIFO)
    q.push(10);
    q.push(20);
    q.push(30);
    
    cout << "Queue size: " << q.size() << endl;  // Output: 3
    
    return 0;
}
```

### 2. **pop()** - Remove Element from Front

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    q.push(30);
    
    // Remove elements from the front (FIFO order)
    cout << "Before pop, front: " << q.front() << endl;  // 10
    q.pop();  // Removes 10
    
    cout << "After pop, front: " << q.front() << endl;   // 20
    q.pop();  // Removes 20
    
    cout << "After second pop, front: " << q.front() << endl;  // 30
    
    return 0;
}
```

**Important:** `pop()` does NOT return the removed element; use `front()` first!

### 3. **front()** - Access Front Element

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(100);
    q.push(200);
    
    // Access the front element (next to be removed)
    cout << "Front element: " << q.front() << endl;  // 100
    
    // Modify the front element
    q.front() = 150;
    cout << "Modified front: " << q.front() << endl;  // 150
    
    return 0;
}
```

### 4. **back()** - Access Rear Element

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    q.push(30);
    
    // Access the rear element (last inserted)
    cout << "Back element: " << q.back() << endl;  // 30
    
    // Modify the back element
    q.back() = 35;
    cout << "Modified back: " << q.back() << endl;  // 35
    
    return 0;
}
```

### 5. **empty()** - Check if Queue is Empty

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    if (q.empty()) {
        cout << "Queue is empty" << endl;
    }
    
    q.push(10);
    
    if (!q.empty()) {
        cout << "Queue has elements" << endl;
    }
    
    return 0;
}
```

### 6. **size()** - Get Number of Elements

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    cout << "Initial size: " << q.size() << endl;  // 0
    
    q.push(10);
    q.push(20);
    q.push(30);
    
    cout << "After pushes: " << q.size() << endl;  // 3
    
    q.pop();
    
    cout << "After pop: " << q.size() << endl;  // 2
    
    return 0;
}
```

---

## Complete Working Example

```cpp
#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    // Create a queue of strings
    queue<string> customerQueue;
    
    // Customers joining the queue
    cout << "=== Customers Joining Queue ===" << endl;
    customerQueue.push("Alice");
    customerQueue.push("Bob");
    customerQueue.push("Charlie");
    customerQueue.push("Diana");
    
    cout << "Queue size: " << customerQueue.size() << endl;
    cout << "Front customer: " << customerQueue.front() << endl;
    cout << "Last customer: " << customerQueue.back() << endl;
    
    // Serve customers (FIFO)
    cout << "\n=== Serving Customers ===" << endl;
    while (!customerQueue.empty()) {
        cout << "Serving: " << customerQueue.front() << endl;
        customerQueue.pop();
        cout << "Remaining customers: " << customerQueue.size() << endl;
    }
    
    cout << "\nAll customers served!" << endl;
    
    return 0;
}
```

**Output:**
```
=== Customers Joining Queue ===
Queue size: 4
Front customer: Alice
Last customer: Diana

=== Serving Customers ===
Serving: Alice
Remaining customers: 3
Serving: Bob
Remaining customers: 2
Serving: Charlie
Remaining customers: 1
Serving: Diana
Remaining customers: 0

All customers served!
```

---

## Advanced Examples

### Example 1: Task Scheduler

```cpp
#include <iostream>
#include <queue>
#include <string>
using namespace std;

class Task {
public:
    string name;
    int priority;
    
    Task(string n, int p) : name(n), priority(p) {}
};

int main() {
    queue<Task> taskQueue;
    
    // Add tasks to the queue
    taskQueue.push(Task("Send Email", 1));
    taskQueue.push(Task("Write Report", 2));
    taskQueue.push(Task("Call Client", 1));
    
    cout << "=== Task Execution (FIFO Order) ===" << endl;
    int taskNumber = 1;
    
    while (!taskQueue.empty()) {
        Task currentTask = taskQueue.front();
        cout << taskNumber++ << ". Executing: " << currentTask.name 
             << " (Priority: " << currentTask.priority << ")" << endl;
        taskQueue.pop();
    }
    
    return 0;
}
```

### Example 2: Breadth-First Search (BFS)

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

void bfs(vector<vector<int>>& graph, int start) {
    queue<int> q;
    vector<bool> visited(graph.size(), false);
    
    // Start BFS from the given node
    q.push(start);
    visited[start] = true;
    
    cout << "BFS Traversal: ";
    
    while (!q.empty()) {
        int current = q.front();
        q.pop();
        cout << current << " ";
        
        // Add all unvisited neighbors to queue
        for (int neighbor : graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    cout << endl;
}

int main() {
    // Create adjacency list for graph
    // Graph: 0 - 1 - 3
    //        |   |
    //        2 - 4
    vector<vector<int>> graph = {
        {1, 2},       // Node 0 connects to 1, 2
        {0, 3, 4},    // Node 1 connects to 0, 3, 4
        {0, 4},       // Node 2 connects to 0, 4
        {1},          // Node 3 connects to 1
        {1, 2}        // Node 4 connects to 1, 2
    };
    
    bfs(graph, 0);
    
    return 0;
}
```

**Output:**
```
BFS Traversal: 0 1 2 3 4
```

### Example 3: Level Order Tree Traversal

```cpp
#include <iostream>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void levelOrderTraversal(TreeNode* root) {
    if (root == nullptr) return;
    
    queue<TreeNode*> q;
    q.push(root);
    
    cout << "Level Order Traversal: ";
    
    while (!q.empty()) {
        TreeNode* current = q.front();
        q.pop();
        
        cout << current->val << " ";
        
        // Add children to queue
        if (current->left != nullptr) {
            q.push(current->left);
        }
        if (current->right != nullptr) {
            q.push(current->right);
        }
    }
    cout << endl;
}

int main() {
    // Create a binary tree:
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    
    levelOrderTraversal(root);
    
    // Clean up memory
    delete root->left->right;
    delete root->left->left;
    delete root->right;
    delete root->left;
    delete root;
    
    return 0;
}
```

**Output:**
```
Level Order Traversal: 1 2 3 4 5
```

---

## Queue with Custom Data Types

```cpp
#include <iostream>
#include <queue>
#include <string>
using namespace std;

class Student {
private:
    string name;
    int rollNumber;
    double gpa;
    
public:
    Student(string n, int r, double g) : name(n), rollNumber(r), gpa(g) {}
    
    void display() const {
        cout << "Name: " << name 
             << ", Roll: " << rollNumber 
             << ", GPA: " << gpa << endl;
    }
    
    string getName() const { return name; }
};

int main() {
    queue<Student> studentQueue;
    
    // Add students to queue
    studentQueue.push(Student("Alice", 101, 3.8));
    studentQueue.push(Student("Bob", 102, 3.5));
    studentQueue.push(Student("Charlie", 103, 3.9));
    
    cout << "=== Processing Students (FIFO) ===" << endl;
    int position = 1;
    
    while (!studentQueue.empty()) {
        cout << "Position " << position++ << ": ";
        studentQueue.front().display();
        studentQueue.pop();
    }
    
    return 0;
}
```

---

## Common Operations Summary

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| `push(x)` | Add element to rear | O(1) |
| `pop()` | Remove front element | O(1) |
| `front()` | Access front element | O(1) |
| `back()` | Access rear element | O(1) |
| `empty()` | Check if empty | O(1) |
| `size()` | Get number of elements | O(1) |

---

## Best Practices

### 1. Always Check Before Accessing

```cpp
// Bad - may cause runtime error
int value = q.front();
q.pop();

// Good - safe check
if (!q.empty()) {
    int value = q.front();
    q.pop();
} else {
    cerr << "Queue is empty!" << endl;
}
```

### 2. Use References for Large Objects

```cpp
// Less efficient - copies the object
Student s = studentQueue.front();

// More efficient - uses reference
const Student& s = studentQueue.front();
```

### 3. Clear Queue Properly

```cpp
// Method 1: Pop all elements
while (!q.empty()) {
    q.pop();
}

// Method 2: Assign empty queue (C++11)
q = queue<int>();
```

### 4. Choose Right Underlying Container

```cpp
// Fast for most operations (default)
queue<int> q1;  // Uses deque

// Better for frequent insertions/deletions
queue<int, list<int>> q2;  // Uses list

// Note: vector cannot be used as it lacks pop_front()
```

---

## Common Pitfalls to Avoid

### ❌ Incorrect: Accessing Empty Queue

```cpp
queue<int> q;
cout << q.front();  // Undefined behavior!
```

### ✅ Correct: Check Before Access

```cpp
queue<int> q;
if (!q.empty()) {
    cout << q.front();
}
```

### ❌ Incorrect: Expecting pop() to Return Value

```cpp
int value = q.pop();  // Compilation error! pop() returns void
```

### ✅ Correct: Use front() Then pop()

```cpp
int value = q.front();
q.pop();
```

### ❌ Incorrect: Modifying While Iterating

```cpp
// Cannot iterate through std::queue directly
for (auto x : q) {  // Compilation error!
    cout << x;
}
```

### ✅ Correct: Process and Pop

```cpp
queue<int> temp = q;  // Make a copy
while (!temp.empty()) {
    cout << temp.front() << " ";
    temp.pop();
}
```

---

## Performance Considerations

### Memory Overhead

- **deque** (default): Good balance of memory and performance
- **list**: Higher memory overhead (pointers), better for large objects
- Choose based on:
  - Object size
  - Frequency of operations
  - Memory constraints

### Cache Performance

- `deque` typically has better cache performance
- `list` can be slower due to pointer chasing
- For small primitive types, `deque` is usually faster

---

## Comparison with Other Containers

| Feature | Queue | Stack | Vector | Deque |
|---------|-------|-------|--------|-------|
| **Access Pattern** | FIFO | LIFO | Random | Both ends |
| **Front Access** | Yes | No | No | Yes |
| **Back Access** | Yes | Yes | Yes | Yes |
| **Middle Access** | No | No | Yes | Yes |
| **Use Case** | Task scheduling | Function calls | Arrays | Buffer |

---

## Conclusion

The C++ STL `queue` is a powerful and efficient implementation of the FIFO data structure. Key takeaways:

### ✅ Advantages
- **Simple API** with clear semantics
- **Type-safe** generic programming
- **Optimized performance** with O(1) operations
- **Flexible** underlying container choice
- **Standard** across all C++ implementations

### 📚 When to Use STL Queue
- Task scheduling systems
- Breadth-First Search algorithms
- Level-order tree traversal
- Request handling in servers
- Print spoolers and job queues
- Message passing systems

### 🔑 Key Operations
1. `push()` - Add to rear
2. `pop()` - Remove from front
3. `front()` - Access front element
4. `back()` - Access rear element
5. `empty()` - Check if empty
6. `size()` - Get element count

### 💡 Remember
- Always check `empty()` before `front()` or `pop()`
- `pop()` doesn't return a value
- Use `const` references for large objects
- Choose appropriate underlying container for your use case

Master these concepts, and you'll be well-equipped to use queues effectively in your C++ programs for solving a wide range of computational problems!
