#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        int total = 1 << n;
        vector<vector<int>> result;
        for(int i = 0; i < total; ++i){
            vector<int> subset;
            for(int j = 0; j < n; ++j){
                if(i & (1 << j)){
                    subset.push_back(nums[j]);
                }
            }
            result.push_back(subset);
        }
        return result;
    }
};