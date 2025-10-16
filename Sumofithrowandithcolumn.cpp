#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int sumOfRowCol(int N, int M, vector<vector<int>> A) {
        // code here
        if(N != M){
            return 0;
        }
        for (int i = 0; i < N; ++i) {
            int rowSum = 0, colSum = 0;
            for (int j = 0; j < N; ++j) {
                rowSum += A[i][j];   // Sum of i-th row
                colSum += A[j][i];   // Sum of i-th column
            }
        
            if(rowSum != colSum){
                return 0;
            }
        }
            return 1;
    }
};