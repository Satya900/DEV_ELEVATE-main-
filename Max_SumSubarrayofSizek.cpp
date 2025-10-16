#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int maximumSumSubarray(vector<int>& arr, int k) {
        // code here
        int n = arr.size();
        long sum = 0;
        for(int i = 0; i < k; ++i){
            sum += arr[i];
        }
        long maxSum = sum;
        
        for(int i = k; i < n; ++i){
            sum += arr[i]-arr[i-k];
            if(sum > maxSum){
                maxSum = sum;
            }
        }
        return maxSum;
    }
};