#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
public:
    vector<int> runningSum(vector<int>& nums){
        int n = nums.size();
        vector<int> psum(n);
        int sum = 0;
        
        for (int i = 0; i < n; ++i) {
            sum += nums[i];
            psum[i] = sum;
        }
        
        return psum;
    
        
    }
};