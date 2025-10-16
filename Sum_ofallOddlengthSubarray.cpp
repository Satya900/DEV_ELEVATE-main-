#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
public:
    int sumOddLengthSubarrays(vector<int>& arr) {
        int n = arr.size();
       long long sum = 0;
       for (int j = 1; j <= n; j += 2) { // loop only over odd lengths <= n
          for (int i = 0; i <= n - j; ++i) { // starting index of subarray
             for (int k = i; k < i + j; ++k) { // sum over the subarray of length j
               sum += arr[k];
        }
    }
}
return sum;
    }
};