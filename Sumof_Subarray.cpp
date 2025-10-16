#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
#include <cmath>
class Solution {
  public:
    long long subarraySum(vector<int>& arr) {
        // Your code goes here
        int n = arr.size();
        long long sum = 0;
        const long long MOD = 1e9 + 7;
        
        for(int i = 0; i < n; ++i){
            long long occurence = (long long)(i+1)*(n-i);
            sum = (sum + arr[i] * occurence) % MOD;
        }
        
        return sum;
    }
};