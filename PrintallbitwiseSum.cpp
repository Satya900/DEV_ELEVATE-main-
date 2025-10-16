#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
// fucntion to find bitwise subsets
// Efficient approach
class Solution {
  public:
    vector<int> printSubsets(int n) {
        // Code here
        vector<int>result;
        for(int i = 0; i <= n; ++i){
            if((n & i) == i){
                result.push_back(i);
            }
        }
        reverse(result.begin(), result.end());
        return result;
    }
};
