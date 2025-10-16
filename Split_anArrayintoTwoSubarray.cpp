#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    bool canSplit(vector<int>& arr) {
        // code here
    long long total = 0;
    for (int num : arr) total += num;

    if (total % 2 != 0) return false;

    long long half = total / 2;
    long long prefixSum = 0;
    for (int i = 0; i < arr.size() - 1; ++i) { // exclude last to ensure two non-empty parts
        prefixSum += arr[i];
        if (prefixSum == half) return true;
    }
    return false;
    }
};