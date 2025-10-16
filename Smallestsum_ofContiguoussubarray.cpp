
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int smallestSumSubarray(vector<int>& a) {
        // Code here
         int n = a.size();
        long sum = 0;
        long min = LONG_MAX;
        for(int i = 0; i < n; ++i){
            sum = sum + a[i];
            if(sum < min){
                min = sum;
            }
            if(sum > 0){
                sum = 0;
            }
        }
        return min;
        
    }
};