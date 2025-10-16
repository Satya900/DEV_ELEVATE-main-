#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
/*Function to count subset with even sum
 * arr : array input
 * N : size of array
 */
class Solution {
  public:
    int countSumSubsets(int arr[], int N) {

        // Your code here
        int c = 0;
        for(int i = 0; i < (1<<N); ++i){
            int sum = 0;
            for(int j = 0; j < N; ++j){
                if((i >> j) & 1 == 1){
                    sum = sum + arr[j];
                }
            }
            if(sum % 2 == 0){
                c++;
            }
            
        }
        return c-1;
    }
};