---
title: "Singly Linked Lists 101: A Step-by-Step Guide"
description: "Full explanation of Singly Linked Lists in language of your choice."
pubDate: 2025-02-21
category: "DSA"
author: "Dev Elevate Team"
tags: ["linked-lists", "data-structures", "algorithms"]
---

A **singly linked list** is one of the simplest and most fundamental data structures in computer science. In this structure, each node contains two parts:

- **Data:** The value stored in the node.
- **Next Pointer:** A reference (or pointer) to the next node in the list.

Unlike arrays, linked lists don’t require contiguous memory allocation. This makes them dynamic—nodes can be added or removed without reallocation of the entire structure.

## Why Use Singly Linked Lists?

- **Dynamic Size:** They can grow or shrink during runtime.
- **Efficient Insertions/Deletions at the Beginning:** Inserting or removing nodes at the head is O(1).

However, note that:

- **Insertion at the End, Deletion, and Search:** These operations require traversing the list, leading to a time complexity of O(n) in the worst case.

---

# Core Operations and Their Time Complexity

1. **Insertion at the Beginning:**  
   - **Time Complexity:** O(1)  
   - **Explanation:** You only update the head pointer.

2. **Insertion at the End:**  
   - **Time Complexity:** O(n)  
   - **Explanation:** You traverse the entire list to find the last node.

3. **Deletion by Value:**  
   - **Time Complexity:** O(n)  
   - **Explanation:** You need to search through the list to find the node to delete.

4. **Searching:**  
   - **Time Complexity:** O(n)  
   - **Explanation:** In the worst case, you must traverse the entire list.

5. **Traversal (Printing):**  
   - **Time Complexity:** O(n)  
   - **Explanation:** Each node is visited once.

---

# Detailed Code Examples with Time Complexity Analysis

Below are detailed, step-by-step implementations of a singly linked list with basic operations and time complexity notes in Java, Python, and C++.

---

## Java Implementation

```java
/**
 * Singly Linked List Implementation in Java
 * 
 * Core Operations:
 * - insertAtBeginning: O(1)
 * - insertAtEnd: O(n)
 * - deleteByValue: O(n)
 * - search: O(n)
 * - printList (traversal): O(n)
 */
public class SinglyLinkedList {

    // Definition of a node in the singly linked list.
    static class ListNode {
        int val;         // Data stored in the node.
        ListNode next;   // Reference to the next node.

        // Constructor to create a new node with the specified value.
        public ListNode(int val) {
            this.val = val;
            this.next = null; // Initially, the next pointer is set to null.
        }
    }

    // Head pointer to the start of the list.
    private ListNode head;

    // Constructor to initialize an empty list.
    public SinglyLinkedList() {
        head = null;
    }

    // O(1) - Inserts a new node at the beginning.
    public void insertAtBeginning(int val) {
        ListNode newNode = new ListNode(val);
        newNode.next = head; // New node points to current head.
        head = newNode;      // Head now points to new node.
    }

    // O(n) - Inserts a new node at the end.
    public void insertAtEnd(int val) {
        ListNode newNode = new ListNode(val);
        if (head == null) {
            head = newNode;  // List is empty; new node becomes head.
            return;
        }
        ListNode current = head;
        // Traverse to the end of the list.
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;  // Append new node at the end.
    }

    // O(n) - Deletes the first occurrence of a node with the specified value.
    public void deleteByValue(int val) {
        if (head == null) return; // List is empty.

        // If the head needs to be removed.
        if (head.val == val) {
            head = head.next;
            return;
        }

        ListNode current = head;
        // Traverse until we find the node whose next node contains the target value.
        while (current.next != null && current.next.val != val) {
            current = current.next;
        }

        // If we found the target node, skip it.
        if (current.next != null) {
            current.next = current.next.next;
        }
    }

    // O(n) - Searches for a node with the given value.
    public boolean search(int val) {
        ListNode current = head;
        while (current != null) {
            if (current.val == val)
                return true;  // Found the value.
            current = current.next;
        }
        return false;  // Value not found.
    }

    // O(n) - Traverses and prints the linked list.
    public void printList() {
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }

    // Main method to test the linked list operations.
    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();

        // Insert nodes at the beginning.
        list.insertAtBeginning(3);  // List: 3 -> null (O(1))
        list.insertAtBeginning(2);  // List: 2 -> 3 -> null (O(1))
        list.insertAtBeginning(1);  // List: 1 -> 2 -> 3 -> null (O(1))

        // Insert nodes at the end.
        list.insertAtEnd(4);        // List: 1 -> 2 -> 3 -> 4 -> null (O(n))
        list.insertAtEnd(5);        // List: 1 -> 2 -> 3 -> 4 -> 5 -> null (O(n))

        System.out.println("Initial List:");
        list.printList();  // O(n)

        // Delete a node by value.
        list.deleteByValue(3);      // Deletes node with value 3 (O(n))
        System.out.println("After Deleting 3:");
        list.printList();  // O(n)

        // Search for a value.
        System.out.println("Search for 4: " + (list.search(4) ? "Found" : "Not Found"));  // O(n)
        System.out.println("Search for 10: " + (list.search(10) ? "Found" : "Not Found")); // O(n)
    }
}
```

---

## Python Implementation

```python
# Singly Linked List Implementation in Python
# Core Operations and Time Complexity:
# - insert_at_beginning: O(1)
# - insert_at_end: O(n)
# - delete_by_value: O(n)
# - search: O(n)
# - print_list (traversal): O(n)

class ListNode:
    def __init__(self, val):
        """
        Initialize a new node.
        :param val: The data value to store in the node.
        """
        self.val = val       # Data stored in the node.
        self.next = None     # Reference to the next node (None if end).

class SinglyLinkedList:
    def __init__(self):
        """
        Initialize an empty linked list.
        """
        self.head = None

    def insert_at_beginning(self, val):
        """
        Insert a new node with the given value at the beginning.
        Time Complexity: O(1)
        """
        new_node = ListNode(val)
        new_node.next = self.head  # New node points to current head.
        self.head = new_node       # Head now points to new node.

    def insert_at_end(self, val):
        """
        Insert a new node with the given value at the end.
        Time Complexity: O(n)
        """
        new_node = ListNode(val)
        if self.head is None:
            self.head = new_node   # List is empty; new node becomes head.
            return
        current = self.head
        # Traverse to the end.
        while current.next:
            current = current.next
        current.next = new_node    # Append new node.

    def delete_by_value(self, val):
        """
        Delete the first occurrence of a node with the specified value.
        Time Complexity: O(n)
        """
        if self.head is None:
            return  # List is empty.
        if self.head.val == val:
            self.head = self.head.next  # Remove head.
            return
        current = self.head
        # Traverse until the next node has the target value.
        while current.next and current.next.val != val:
            current = current.next
        if current.next:
            current.next = current.next.next  # Bypass the node.

    def search(self, val):
        """
        Search for a node with the given value.
        Time Complexity: O(n)
        :return: True if found, False otherwise.
        """
        current = self.head
        while current:
            if current.val == val:
                return True
            current = current.next
        return False

    def print_list(self):
        """
        Traverse and print the linked list.
        Time Complexity: O(n)
        """
        current = self.head
        while current:
            print(current.val, end=" -> ")
            current = current.next
        print("None")

# Demonstration of linked list operations.
if __name__ == "__main__":
    ll = SinglyLinkedList()
    
    # Insert nodes at the beginning.
    ll.insert_at_beginning(3)   # O(1)
    ll.insert_at_beginning(2)   # O(1)
    ll.insert_at_beginning(1)   # O(1)

    # Insert nodes at the end.
    ll.insert_at_end(4)         # O(n)
    ll.insert_at_end(5)         # O(n)

    print("Initial List:")
    ll.print_list()             # O(n)

    # Delete a node by value.
    ll.delete_by_value(3)       # O(n)
    print("After Deleting 3:")
    ll.print_list()             # O(n)

    # Search for values.
    print("Search for 4:", "Found" if ll.search(4) else "Not Found")   # O(n)
    print("Search for 10:", "Found" if ll.search(10) else "Not Found") # O(n)
```

---

## C++ Implementation

```cpp
#include <iostream>
using namespace std;

// Definition of a node in a singly linked list.
struct ListNode {
    int val;            // Data stored in the node.
    ListNode* next;     // Pointer to the next node.

    // Constructor to initialize a node.
    ListNode(int x) : val(x), next(nullptr) {}
};

// Singly Linked List class encapsulating the head pointer.
class SinglyLinkedList {
private:
    ListNode* head;  // Pointer to the first node.

public:
    // Constructor: initialize an empty list.
    SinglyLinkedList() : head(nullptr) {}

    // O(1) - Insert a node at the beginning.
    void insertAtBeginning(int val) {
        ListNode* newNode = new ListNode(val);
        newNode->next = head;  // New node points to current head.
        head = newNode;        // Update head to new node.
    }

    // O(n) - Insert a node at the end.
    void insertAtEnd(int val) {
        ListNode* newNode = new ListNode(val);
        if (head == nullptr) {
            head = newNode;    // List is empty; new node becomes head.
            return;
        }
        ListNode* current = head;
        // Traverse to the end of the list.
        while (current->next != nullptr) {
            current = current->next;
        }
        current->next = newNode;  // Append new node.
    }

    // O(n) - Delete the first occurrence of a node with the specified value.
    void deleteByValue(int val) {
        if (head == nullptr)
            return; // List is empty.

        // If the head node contains the target value.
        if (head->val == val) {
            ListNode* temp = head;
            head = head->next;
            delete temp;
            return;
        }

        ListNode* current = head;
        // Traverse until the next node has the target value.
        while (current->next != nullptr && current->next->val != val) {
            current = current->next;
        }
        if (current->next != nullptr) {
            ListNode* temp = current->next;
            current->next = current->next->next; // Bypass the node.
            delete temp;
        }
    }

    // O(n) - Search for a node with a given value.
    bool search(int val) {
        ListNode* current = head;
        while (current != nullptr) {
            if (current->val == val)
                return true;
            current = current->next;
        }
        return false;
    }

    // O(n) - Print the linked list.
    void printList() {
        ListNode* current = head;
        while (current != nullptr) {
            cout << current->val << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }

    // Destructor to free the allocated memory.
    ~SinglyLinkedList() {
        ListNode* current = head;
        while (current != nullptr) {
            ListNode* temp = current;
            current = current->next;
            delete temp;
        }
    }
};

int main() {
    SinglyLinkedList list;
    
    // Insert nodes at the beginning.
    list.insertAtBeginning(3);  // O(1)
    list.insertAtBeginning(2);  // O(1)
    list.insertAtBeginning(1);  // O(1)

    // Insert nodes at the end.
    list.insertAtEnd(4);        // O(n)
    list.insertAtEnd(5);        // O(n)

    cout << "Initial List:" << endl;
    list.printList();           // O(n)

    // Delete node with value 3.
    list.deleteByValue(3);      // O(n)
    cout << "After Deleting 3:" << endl;
    list.printList();           // O(n)

    // Search for nodes.
    cout << "Search for 4: " << (list.search(4) ? "Found" : "Not Found") << endl;  // O(n)
    cout << "Search for 10: " << (list.search(10) ? "Found" : "Not Found") << endl; // O(n)

    return 0;
}
```

#### Explanation

- **Struct & Class Definition:**  
  - `ListNode` is a struct representing each node.
  - `SinglyLinkedList` encapsulates the linked list and its head pointer.
- **Operations and Their Complexities:**  
  - **insertAtBeginning:** O(1)  
  - **insertAtEnd:** O(n)  
  - **deleteByValue:** O(n)  
  - **search:** O(n)  
  - **printList:** O(n)
- **Memory Management:** The destructor ensures that all nodes are deallocated properly.
- **Usage:** The `main()` function demonstrates each operation with comments noting the time complexity.

---

# Summary

In this guide for **Singly Linked Lists 101**, we covered:

- **Node Structure:** Each node stores data and a pointer to the next node.
- **Core Operations and Their Time Complexities:**  
  - Insertion at the beginning is O(1).  
  - Insertion at the end, deletion, search, and traversal are O(n) in the worst case.
- **Detailed Code Examples:** Implementations in Java, Python, and C++ with thorough explanations and comments.

This guide should provide a solid foundation for understanding singly linked lists, both in theory and in practice, while also giving you insight into the performance characteristics of each operation.

Happy coding!
