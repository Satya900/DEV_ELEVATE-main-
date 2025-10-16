#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    void Multiply(vector<vector<int>>& matrixA, vector<vector<int>>& matrixB) {
        // Code here
        int n = matrixA.size();
        //int m = matrixB.size();
        vector<vector<int>> result(n, vector<int>(n, 0));
        for(int i = 0; i < n; ++i){
            for(int j = 0; j < n; ++j){
                for(int k = 0; k < n; ++k){
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }
        matrixA = result;
        
    }
};