#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int sortedCount(int N, int M, vector<vector<int>> Mat) {
        // code here
        int count = 0;

        for(int i = 0; i < N; ++i) {
            int increasing = 0, decreasing = 0;

            for(int j = 0; j < M - 1; ++j) {
                if (Mat[i][j] < Mat[i][j+1]) {
                    decreasing++;
                } else if (Mat[i][j] > Mat[i][j+1]) {
                    increasing++;
                }
            }

            if (increasing == M-1 || decreasing == M-1) {
                count++;
            }
        }

        return count;
    }
};
