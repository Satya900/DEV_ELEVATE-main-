---
title: "Implementing a Stack in C and C++: A Step-by-Step Guide"
description: " In this guide, we'll learn how to implement a stack using both C and C++. "
pubDate: 2025-03-16
category: "DSA"
author: "Dev Elevate Team"
tags: ["stack", "data-structures", "algorithms"]
---

A stack is a fundamental data structure that follows the Last-In-First-Out (LIFO) principle. In this guide, we'll learn how to implement a stack using both C and C++.

## Implementation in C

In C, we can implement a stack using an array or a linked list. Here's an array-based implementation:

```c
#include <stdio.h>
#define MAX_SIZE 100

struct Stack {
    int arr[MAX_SIZE];
    int top;
};

// Initialize stack
void initialize(struct Stack *stack) {
    stack->top = -1;
}

// Check if stack is full
int isFull(struct Stack *stack) {
    return stack->top == MAX_SIZE - 1;
}

// Check if stack is empty
int isEmpty(struct Stack *stack) {
    return stack->top == -1;
}

// Push element onto stack
void push(struct Stack *stack, int value) {
    if (isFull(stack)) {
        printf("Stack Overflow\n");
        return;
    }
    stack->arr[++stack->top] = value;
}

// Pop element from stack
int pop(struct Stack *stack) {
    if (isEmpty(stack)) {
        printf("Stack Underflow\n");
        return -1;
    }
    return stack->arr[stack->top--];
}

// Peek at top element
int peek(struct Stack *stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty\n");
        return -1;
    }
    return stack->arr[stack->top];
}
```

## Implementation in C++

In C++, we can create a more elegant implementation using classes:

```cpp
#include <iostream>
using namespace std;

class Stack {
private:
    static const int MAX_SIZE = 100;
    int arr[MAX_SIZE];
    int top;

public:
    // Constructor
    Stack() {
        top = -1;
    }

    // Check if stack is full
    bool isFull() {
        return top == MAX_SIZE - 1;
    }

    // Check if stack is empty
    bool isEmpty() {
        return top == -1;
    }

    // Push element onto stack
    void push(int value) {
        if (isFull()) {
            cout << "Stack Overflow" << endl;
            return;
        }
        arr[++top] = value;
    }

    // Pop element from stack
    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow" << endl;
            return -1;
        }
        return arr[top--];
    }

    // Peek at top element
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty" << endl;
            return -1;
        }
        return arr[top];
    }
};
```

## Example Usage

Here's how to use both implementations:

### C Example

```c
int main() {
    struct Stack stack;
    initialize(&stack);
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    
    printf("Top element: %d\n", peek(&stack));  // Output: 30
    printf("Popped: %d\n", pop(&stack));        // Output: 30
    printf("Top element: %d\n", peek(&stack));  // Output: 20
    
    return 0;
}
```

### C++ Example

```cpp
int main() {
    Stack stack;
    
    stack.push(10);
    stack.push(20);
    stack.push(30);
    
    cout << "Top element: " << stack.peek() << endl;  // Output: 30
    cout << "Popped: " << stack.pop() << endl;        // Output: 30
    cout << "Top element: " << stack.peek() << endl;  // Output: 20
    
    return 0;
}
```

## Key Differences Between C and C++ Implementations

1. **Syntax**: C++ uses class-based encapsulation while C uses structures and functions
2. **Data Hiding**: C++ implementation provides better data hiding through private members
3. **Method Calling**: C++ uses object-oriented notation (dot operator) while C requires passing pointer to structure
4. **Error Handling**: C++ can use exception handling (not shown in this basic implementation)

## Common Operations Time Complexity

- Push: O(1)
- Pop: O(1)
- Peek: O(1)
- isEmpty: O(1)
- isFull: O(1)

## Applications of Stack

1. Function call management (Call Stack)
2. Expression evaluation and syntax parsing
3. Undo operations in text editors
4. Browser history (Back button)
5. Depth-First Search algorithm implementation

This implementation provides a solid foundation for understanding how stacks work in both C and C++. The array-based implementation is simple and efficient for most use cases, though it has a fixed size limitation. For more flexibility, you could implement a dynamic array or linked list-based stack.
