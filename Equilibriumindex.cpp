#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    // Function to find equilibrium point in the array.
    int findEquilibrium(vector<int> &arr) {
        int n = arr.size();
        int total_sum = 0;
        int left_sum = 0;
        // code here
        for(int i = 0; i < n; ++i){
            total_sum += arr[i];
        }
        for(int i = 0; i < n; ++i){
            int right_sum = total_sum - left_sum - arr[i];
            if(left_sum == right_sum){
                return i;
            }
            left_sum += arr[i];
        }
        return -1;
    }
};