---
title: "Functional Programming with Arrays: Map, Filter, and Reduce Operations"
description: "How functional programming with arrays works"
pubDate: 2025-02-13
category: "DSA"
author: "Dev Elevate Team"
tags: ["arrays", "data-structures", "algorithms"]
---

Functional programming treats computation as the evaluation of mathematical functions. When applied to arrays, it allows you to transform, filter, and aggregate data in a clear, declarative manner using operations like **map**, **filter**, and **reduce**.

**Key Operations:**

- **Map:** Applies a function to each element, returning a new array.
- **Filter:** Selects elements based on a condition.
- **Reduce:** Combines elements to produce a single result (such as a sum).

These operations help write concise, expressive code for many common data processing tasks.

---

## Python Example

```python
# Example array (list) of numbers
numbers = [1, 2, 3, 4, 5]

# Map: Square each element
squared = list(map(lambda x: x**2, numbers))
print("Squared:", squared)  # Output: [1, 4, 9, 16, 25]

# Filter: Keep even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print("Evens:", evens)  # Output: [2, 4]

# Reduce: Sum all elements (using functools.reduce)
from functools import reduce
total = reduce(lambda acc, x: acc + x, numbers)
print("Total:", total)  # Output: 15
```

---

## Java Example

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FunctionalArrays {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Map: Square each element
        List<Integer> squared = numbers.stream()
                                       .map(x -> x * x)
                                       .collect(Collectors.toList());
        System.out.println("Squared: " + squared);  // Output: [1, 4, 9, 16, 25]

        // Filter: Keep even numbers
        List<Integer> evens = numbers.stream()
                                     .filter(x -> x % 2 == 0)
                                     .collect(Collectors.toList());
        System.out.println("Evens: " + evens);  // Output: [2, 4]

        // Reduce: Sum all elements
        int total = numbers.stream()
                           .reduce(0, (acc, x) -> acc + x);
        System.out.println("Total: " + total);  // Output: 15
    }
}
```

---

## C++ Example

```cpp
#include <iostream>
#include <vector>
#include <algorithm> // for transform and copy_if
#include <numeric>   // for accumulate
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};

    // Map: Square each element using std::transform
    vector<int> squared(numbers.size());
    transform(numbers.begin(), numbers.end(), squared.begin(), [](int x) { return x * x; });
    cout << "Squared: ";
    for (int n : squared) {
        cout << n << " ";
    }
    cout << endl;

    // Filter: Keep even numbers using std::copy_if
    vector<int> evens;
    copy_if(numbers.begin(), numbers.end(), back_inserter(evens), [](int x) { return x % 2 == 0; });
    cout << "Evens: ";
    for (int n : evens) {
        cout << n << " ";
    }
    cout << endl;

    // Reduce: Sum all elements using std::accumulate
    int total = accumulate(numbers.begin(), numbers.end(), 0);
    cout << "Total: " << total << endl;

    return 0;
}
```

---

## Discussion

In these examples, we see how functional programming techniques simplify array processing:

- **Map:** Each element is transformed (squared in these examples).
- **Filter:** Elements are selectively retained based on a condition (keeping even numbers).
- **Reduce:** The array is aggregated into a single value (summing the numbers).

These functional operations help in writing clean, maintainable code across multiple languages.

---

## Conclusion

Using functional programming techniques such as map, filter, and reduce with arrays enables concise and expressive data manipulation. Whether you are working in Python, Java, or C++, these operations are integral to processing collections efficiently.
