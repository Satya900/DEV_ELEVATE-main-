#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int squaresInMatrix(int m, int n) {
        // code here
        int min;
        if(m > n){
            min = n;
        }
        else{
            min = m;
        }
        int sum = 0;
        for(int k = 1; k <= min; ++k){
            sum+= (m-k+1)*(n-k+1);
            
        }
        return sum;
    }
};