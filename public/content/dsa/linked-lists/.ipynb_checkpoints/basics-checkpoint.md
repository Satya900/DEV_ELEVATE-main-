---
title: "Linked List Basics"
description: "Understanding linked lists and their implementation"
pubDate: 2024-03-15
category: "DSA"
author: "Dev Elevate Team"
tags: ["data-structures", "linked-lists", "algorithms"]
---

# Linked List Fundamentals

Linked lists are fundamental data structures that consist of nodes where each node contains data and a reference to the next node.

## Basic Structure

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
```

## Core Operations

### 1. Insertion
```python
def insert_at_beginning(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node

def insert_at_end(self, data):
    new_node = Node(data)
    if not self.head:
        self.head = new_node
        return
    current = self.head
    while current.next:
        current = current.next
    current.next = new_node
```

### 2. Deletion
```python
def delete_node(self, key):
    temp = self.head
    if temp and temp.data == key:
        self.head = temp.next
        return
    while temp:
        if temp.next and temp.next.data == key:
            temp.next = temp.next.next
            return
        temp = temp.next
```

### 3. Traversal
```python
def print_list(self):
    current = self.head
    while current:
        print(current.data, end=" -> ")
        current = current.next
    print("None")
```

## Types of Linked Lists

1. **Singly Linked List**
   - Each node points to the next node
   - Last node points to None

2. **Doubly Linked List**
   - Each node has next and previous pointers
   - Allows bidirectional traversal

3. **Circular Linked List**
   - Last node points back to first node
   - Can be singly or doubly linked

## Common Applications

1. Implementation of stacks and queues
2. Symbol table management
3. Undo functionality in software
4. Memory allocation

## Advantages

- Dynamic size
- Easy insertion/deletion
- No memory wastage
- Implementation of other data structures

## Disadvantages

- No random access
- Extra memory for pointers
- Not cache friendly
- No backward traversal (in singly linked lists)

## Practice Problems

1. Reverse a linked list
2. Detect cycle in a linked list
3. Find middle element
4. Merge two sorted lists
5. Remove duplicates