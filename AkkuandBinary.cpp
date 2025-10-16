#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  vector<long long> threeSetBitNumbers;   
  public:
    void precompute() {
        // Code Here
        for (int i = 0; i < 64; ++i) {
            for (int j = 0; j < i; ++j) {
                for (int k = 0; k < j; ++k) {
                    long long num = (1LL << i) | (1LL << j) | (1LL << k);
                    threeSetBitNumbers.push_back(num);
                }
            }
        }
        // Optional: sort the list (not necessary unless doing binary search)
        // sort(threeSetBitNumbers.begin(), threeSetBitNumbers.end());
    }

    long long solve(long long l, long long r) {
        long long count = 0;
        for (long long num : threeSetBitNumbers) {
            if (num >= l && num <= r)
                ++count;
        }
        return count;
    }
};
