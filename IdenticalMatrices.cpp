#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int areMatricesIdentical(int N, vector<vector<int>> Grid1,
                             vector<vector<int>> Grid2) {
        // code here
        int flag = 0;
        for(int i = 0; i < N; ++i){
            for(int j = 0; j < N; ++j){
                if(Grid1[i][j] != Grid2[i][j]){
                    flag = 1;
                }
            }
        }
        if(flag == 1){
            return 0;
        }
        return 1;
    }
};