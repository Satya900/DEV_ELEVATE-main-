#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
       vector<vector<int>> matrix(n, vector<int>(n,0));
       int num = 1;
       int left = 0, right = n-1;
       int top = 0, bottom = n-1;

       while(left <= right && top <= bottom){
        for(int j = left; j < right+1; ++j){
            matrix[top][j] = num;
            num+= 1;
        }
        ++top;

        for(int i = top; i < bottom+1; ++i){
            matrix[i][right] = num;
            num+=1;
        }
        right -= 1;

        if(top <= bottom){
            for(int j = right; j > left-1; --j){
                matrix[bottom][j] = num;
                num += 1;
            }
        bottom -= 1;
        }

        if(left <= right){
            for(int i = bottom; i > top-1; --i){
                matrix[i][left] = num;
                num += 1;
            }
        left += 1;

        }
       }
       return matrix;
    }
};