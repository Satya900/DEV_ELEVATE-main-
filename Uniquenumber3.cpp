#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
// User function Template for C++

class Solution {
  public:
    int getSingle(vector<int> &arr) {
        // code here
        int unique = 0;
        int n = arr.size();
        for(int i = 0; i < 32; ++i){
            int c = 0;
            for(int j = 0; j < n; ++j){
                if((arr[j] >> i) & 1 == 1){
                    c++;
                }
            }
            if(c % 3 != 0){
                unique = unique | (1 <<i);
            }
        }
        return unique;
    }
};