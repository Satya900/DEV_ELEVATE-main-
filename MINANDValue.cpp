#include <vector>
#include <algorithm>
#include <climits>
#include <math.h>
using namespace std;
class Solution {
  public:
    int findMaxAnd(vector<int>& arr) {
        // code here
        int maxAnd = 0;
    int n = arr.size();
    pair<int, int> maxPair = {0,0};

    // Check all pairs (brute-force, O(n^2))
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int andVal = arr[i] & arr[j];
            if (andVal > maxAnd) {
                maxAnd = andVal;
                maxPair = {arr[i], arr[j]};
            }
        }
    }

    return {maxAnd, maxPair};
    }
};
