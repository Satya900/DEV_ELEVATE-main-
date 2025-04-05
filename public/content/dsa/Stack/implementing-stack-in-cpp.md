---
title: "Implementing a Stack in C++ Using Standard Template Library (STL)"
description: "How to implement a stack in C++ using the Standard Template Library (STL)."
pubDate: 2025-04-05
category: "DSA"
author: "Dev Elevate Team"
tags: ["stack", "data-structures", "algorithms"]
---

A **stack** is a linear data structure that follows the Last-In-First-Out (LIFO) principle, where the last element added is the first to be removed. In C++, the Standard Template Library (STL) provides multiple ways to implement a stack, including the `std::stack` container adapter, as well as using `std::vector` and `std::deque` containers. This guide will explore these implementations, providing examples and discussing their time and space complexities.

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Using `std::stack`](#using-stdstack)
  - [Implementation Example](#implementation-example)
  - [Time and Space Complexity](#time-and-space-complexity)
- [Implementing a Stack with `std::vector`](#implementing-a-stack-with-stdvector)
  - [Implementation Example](#implementation-example-1)
  - [Time and Space Complexity](#time-and-space-complexity-1)
- [Implementing a Stack with `std::deque`](#implementing-a-stack-with-stddeque)
  - [Implementation Example](#implementation-example-2)
  - [Time and Space Complexity](#time-and-space-complexity-2)
- [Comparison of Implementations](#comparison-of-implementations)

---

## Using `std::stack`

The `std::stack` container adapter is specifically designed to provide stack functionality. It encapsulates an underlying container and provides a restricted interface that allows only stack-specific operations. By default, `std::stack` uses `std::deque` as its underlying container, but this can be customized.

### Implementation Example

```cpp
#include <iostream>
#include <stack>

int main() {
    std::stack<int> stack;

    // Push elements onto the stack
    stack.push(10);
    stack.push(20);
    stack.push(30);

    // Display the top element
    std::cout << "Top element: " << stack.top() << std::endl; // Output: 30

    // Pop elements from the stack
    stack.pop();
    std::cout << "Top element after pop: " << stack.top() << std::endl; // Output: 20

    return 0;
}
```

### Time and Space Complexity

- **Push (`push`)**: O(1) amortized time; O(1) space per operation.
- **Pop (`pop`)**: O(1) time; O(1) space per operation.
- **Peek (`top`)**: O(1) time; O(1) space per operation.
- **Overall Space**: O(n), where n is the number of elements in the stack.

---

## Implementing a Stack with `std::vector`

While `std::vector` is primarily designed for dynamic arrays, it can be used to implement stack functionality by restricting operations to the end of the vector.

### Implementation Example

```cpp
#include <iostream>
#include <vector>

class Stack {
private:
    std::vector<int> elements;

public:
    // Check if the stack is empty
    bool isEmpty() const {
        return elements.empty();
    }

    // Push an element onto the stack
    void push(int item) {
        elements.push_back(item);
    }

    // Pop the top element from the stack
    void pop() {
        if (isEmpty()) {
            std::cerr << "Stack underflow\n";
            return;
        }
        elements.pop_back();
    }

    // Get the top element without removing it
    int top() const {
        if (isEmpty()) {
            std::cerr << "Stack is empty\n";
            exit(1);
        }
        return elements.back();
    }
};

int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    std::cout << "Top element: " << stack.top() << std::endl; // Output: 20
    stack.pop();
    std::cout << "Top element after pop: " << stack.top() << std::endl; // Output: 10
    return 0;
}
```

### Time and Space Complexity

- **Push (`push_back`)**: O(1) amortized time; O(1) space per operation.
- **Pop (`pop_back`)**: O(1) time; O(1) space per operation.
- **Peek (`back`)**: O(1) time; O(1) space per operation.
- **Overall Space**: O(n), where n is the number of elements in the stack.

---

## Implementing a Stack with `std::deque`

`std::deque` (double-ended queue) allows insertion and deletion at both ends and can also be used to implement a stack.

### Implementation Example

```cpp
#include <iostream>
#include <deque>

class Stack {
private:
    std::deque<int> elements;

public:
    // Check if the stack is empty
    bool isEmpty() const {
        return elements.empty();
    }

    // Push an element onto the stack
    void push(int item) {
        elements.push_back(item);
    }

    // Pop the top element from the stack
    void pop() {
        if (isEmpty()) {
            std::cerr << "Stack underflow\n";
            return;
        }
        elements.pop_back();
    }

    // Get the top element without removing it
    int top() const {
        if (isEmpty()) {
            std::cerr << "Stack is empty\n";
            exit(1);
        }
        return elements.back();
    }
};

int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    std::cout << "Top element: " << stack.top() << std::endl; // Output: 20
    stack.pop();
    std::cout << "Top element after pop: " << stack.top() << std::endl; // Output: 10
    return 0;
}
```

### Time and Space Complexity

- **Push (`push_back`)**: O(1) time; O(1) space per operation.
- **Pop (`pop_back`)**: O(1) time; O(1) space per operation.
- **Peek (`back`)**: O(1) time; O(1) space per operation.
- **Overall Space**: O(n), where n is the number of elements in the stack.

---

## Comparison of Implementations

- **`std::stack`**: Provides a clean and straightforward stack interface. It uses `std::deque` by default but allows customization of the underlying container.
- **`std::vector`**: Offers contiguous storage, which can lead
