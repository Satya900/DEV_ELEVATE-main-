#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int missingNum(vector<int>& arr) {
        // code here
        long long n = arr.size();
        long long N = n +1;
        long long sum = (N*(N+1))/2;
        long long arrSum = 0;
        for(int i = 0; i < n; ++i){
            arrSum += arr[i];
        }
        return (sum-arrSum);
    }
};