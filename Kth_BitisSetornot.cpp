#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    bool checkKthBit(int n, int k) {
        // Your code here
        if(n & (1 << k)){
            return true;
        }
        else{
            return false;
        }
    }
};