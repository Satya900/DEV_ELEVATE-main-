#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    int findUnique(vector<int> &arr) {
        // code here
        int n = arr.size();
        int XOR = 0;
        for(int i = 0; i < n;  ++i){
            XOR = XOR ^ arr[i];
        }
        return XOR;
    }
};