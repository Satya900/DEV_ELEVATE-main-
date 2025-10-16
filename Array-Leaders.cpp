#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
    // Function to find the leaders in the array.
  public:
    vector<int> leaders(vector<int>& arr) {
         int n = arr.size();
        vector<int> result;
        int max = INT_MIN;

        for(int i = n - 1; i >= 0; --i) {
            if(arr[i] >= max) {
                result.push_back(arr[i]);
                max = arr[i];
            }
        }


        reverse(result.begin(), result.end());

        return result;
        
    }
};