#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
         int n = nums.size();
        int left = 0;
        int sum = 0;
        int minLength = INT_MAX;

        for (int right = 0; right < n; ++right) {
            sum += nums[right];

            while (sum >= target) {
                minLength = min(minLength, right - left + 1);
                sum -= nums[left];
                ++left;
            }
        }

        return (minLength == INT_MAX) ? 0 : minLength;
    }
};