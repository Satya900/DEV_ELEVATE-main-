#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    vector<int> prefixAvg(vector<int> &arr) {
        // code here
        int n = arr.size();
          vector<int> pavg(n);
        long sum = 0;
        for(int i = 0; i < n; ++i){
            sum = sum + arr[i];
            pavg[i] = sum/(i+1);
        }
        
        return pavg;
        
    }
};