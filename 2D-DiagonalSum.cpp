#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int DiagonalSum(vector<vector<int> >& matrix) {
        // Code here
        int n = matrix.size();
        int sum = 0;
        for(int i = 0; i < n; ++i){
            sum +=  matrix[i][i];
        }
        int i = 0;
        int j = n-1;
        while(i < n && j >= 0){
            sum+= matrix[i][j];
            i++, j--;
        }
        return sum;
        
    }
};
