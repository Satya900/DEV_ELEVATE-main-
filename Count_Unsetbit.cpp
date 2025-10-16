
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int countUnsetBits(int n, int l, int r) {
        // code here
        int c = 0;
        for(int i = l-1; i < r; ++i){
            if(!(n & (1 << i))){
                c++;
            }
        }
        return c;
    }
};