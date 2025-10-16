#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
    vector<int> singleNum(vector<int>& arr) {
        // Code here.
        int n = arr.size();
        int XOR = 0;
        for(int i = 0; i < n; ++i){
            XOR = XOR ^ arr[i];
        }
        int p = 0;
        for(int i = 0; i < 32; ++i){
            if((XOR >> i) & 1 == 1){
                p = i;
                break;
            }
        }
        int set = 0, unset = 0;
        for(int i = 0; i <n; ++i){
            if((arr[i] >> p) & 1 == 1){
                set = set ^ arr[i];
            }
            else{
                unset = unset ^ arr[i];
            }
        }
        vector<int> v(2);
        if(set < unset){
            v[0] = set;
            v[1] = unset;
        }
        else{
            v[0] = unset;
            v[1] = set;
        }
        return v;
    }
};