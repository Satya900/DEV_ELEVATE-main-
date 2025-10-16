#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int diagonalSumDifference(int N, vector<vector<int>> Grid) {
        // code here
        int sum1 = 0;
        for(int i = 0; i < N; ++i){
            sum1 +=  Grid[i][i];
        }
        int i = 0;
        int j = N-1;
        int sum2 = 0;
        while(i < N && j >= 0){
            sum2 += Grid[i][j];
            i++, j--;
        }
        int res = sum1-sum2;
        if(res < 0){
            res = res * -1;
        }
        
        return res;
    }
};