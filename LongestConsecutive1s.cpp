#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int maxConsecutiveOnes(int N) {
        // code here
        int maximum = 0;
        int c = 0;
        for(int i = 0; i < 32; ++i){
            if((N >> i) & 1){
                c++;
                maximum = max(maximum, c);
            }
        }
        return maximum;
    }
};
