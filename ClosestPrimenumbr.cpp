#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
public:
    vector<int> closestPrimes(int left, int right) {  
        vector<bool> isPrime(right + 1, true);
        isPrime[0] = isPrime[1] = false;

        // Sieve of Eratosthenes
        for (int i = 2; i * i <= right; ++i) {
            if (isPrime[i]) {
                for (int j = i * i; j <= right; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        // Collect all primes in the range [left, right]
        vector<int> primesInRange;
        for (int i = max(2, left); i <= right; ++i) {
            if (isPrime[i]) {
                primesInRange.push_back(i);
            }
        }

        // Find the closest pair
        if (primesInRange.size() < 2) return {-1, -1};

        int minDiff = INT_MAX;
        pair<int, int> result = {-1, -1};

        for (int i = 1; i < primesInRange.size(); ++i) {
            int diff = primesInRange[i] - primesInRange[i - 1];
            if (diff < minDiff) {
                minDiff = diff;
                result = {primesInRange[i - 1], primesInRange[i]};
            }
        }

        return {result.first, result.second};
    }
};


