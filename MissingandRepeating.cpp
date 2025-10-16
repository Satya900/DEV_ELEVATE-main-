#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    vector<int> findTwoElement(vector<int>& arr) {
        // code here
        int n = arr.size();
    int repeating = -1, missing = -1;
    
    vector<int> count(n + 1, 0);
    
    // Count the frequency of each element
    for (int num : arr) {
        count[num]++;
    }
    
    // Find the repeating and missing number
    for (int i = 1; i <= n; i++) {
        if (count[i] == 0)
            missing = i;
        else if (count[i] == 2)
            repeating = i;
    }
    
    return {repeating, missing};
        
    }
};