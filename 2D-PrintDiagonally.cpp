#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {

  public:
    vector<int> downwardDiagonal(int N, vector<vector<int>> A) {
        // Your code goes here
        vector<int> result;
        for(int col = 0; col < N; ++col){
            int i = 0, j = col;
            while(i < N && j >= 0){
                result.push_back(A[i][j]);
                i++, j--;
            }
        }
        for(int row = 1; row < N; ++row){
            int i = row, j = N-1;
            while(i < N && j >= 0){
                result.push_back(A[i][j]);
                i++, j--;
            }
        }
        return result;
        
        
        
    }
};