#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    void Addition(vector<vector<int>>& matrixA, vector<vector<int>>& matrixB) {
        // Code here
        int rows = matrixA.size();
        int cols = matrixA[0].size();
        
        //vector<vector<int>> matrixC(rows, vector<int>(cols, 0));  // riyanshi! remember

        for (int i = 0; i < rows; i++){
            for (int j = 0; j < rows; j++){
                matrixA[i][j] = matrixA[i][j] + matrixB[i][j];
            }
        }
        
        /*for (int i = 0; i < rows; ++i){
            for (int j = 0; j < cols; ++j){
                cout << matrixC[i][j] << " ";
            }
            cout << endl;
        }*/
    }
};