#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int countTriplets(vector<int> nums) {
        int n = nums.size();
        // Code here.
        int count = 0;
        for(int i = 1; i < n-1; ++i){
            int left = 0, right = 0;
            for(int j = 0; j < i; ++j){
                if(nums[j] < nums[i]){
                    left++;
                }
            }
            for(int k = i+1; k < n; ++k){
                if(nums[i] < nums[k]){
                    right++;
                }
            }
            count += left*right;
        }
        return count;
    }
};