#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    vector<vector<int>> swapTriangle(int N, vector<vector<int>> A) {
        // code here
        for(int i = 0; i <N; ++i){
            for(int j = i+1; j <= N-1; ++j){
                int temp = A[i][j];
                A[i][j] = A[j][i];
                A[j][i] = temp;
            } 
        }
        return A;
    }
};