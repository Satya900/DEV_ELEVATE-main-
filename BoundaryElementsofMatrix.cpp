#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    vector<int> BoundaryElements(vector<vector<int>>& matrix) {
        // Code here
        vector<int> result;
        int n = matrix.size();
        //Top row
        for(int j = 0; j < n; ++j){
            result.push_back(matrix[0][j]);
        }
        for(int i = 1; i < n-1; ++i){
            result.push_back(matrix[i][0]);
            result.push_back(matrix[i][n-1]);
        }
    

        for (int j = 0; j < n; ++j){
            result.push_back(matrix[n-1][j]);
        }
        
        
        return result;
    }
};