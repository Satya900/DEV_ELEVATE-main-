#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
  int countSetBits(int x) {
    int count = 0;
    while (x) {
        count += (x & 1);
        x >>= 1;
    }
    return count;
}

    int is_bleak(int n) {
        // Code here.
        for (int x = max(1, n - 32); x < n; x++) {
        if (x + countSetBits(x) == n)
            return 0; // Not Bleak
    }
    return 1; // Bleak
    }
};
