#include <iostream>
#include <iomanip>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        int n = nums.size();
        long sum = 0;
        for(int i = 0; i < k; ++i){
            sum += nums[i];
        }
        double maxAvg = (double)sum / k;
        
        for(int i = k; i < n; ++i){
            sum += nums[i] - nums[i - k];
            double avg = (double)sum / k;
            if(avg > maxAvg){
                maxAvg = avg;
            }
        }
        return maxAvg;
    }
};