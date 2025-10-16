#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    // Function to return list of integers that form the boundary
    // traversal of the matrix in a clockwise manner.
    vector<int> boundaryTraversal(vector<vector<int> >& mat) {
        // code here
         vector<int> result;
    int m = mat.size();
    if (m == 0) return result;
    int n = mat[0].size();

    // Top row
    for (int i = 0; i < n; ++i) {
        result.push_back(mat[0][i]);
    }

    // Right column
    for (int i = 1; i < m; ++i) {
        result.push_back(mat[i][n - 1]);
    }

    // Bottom row (only if more than 1 row)
    if (m > 1) {
        for (int i = n - 2; i >= 0; --i) {
            result.push_back(mat[m - 1][i]);
        }
    }

    // Left column (only if more than 1 column)
    if (n > 1) {
        for (int i = m - 2; i >= 1; --i) {
            result.push_back(mat[i][0]);
        }
    }

    return result;
    }
};