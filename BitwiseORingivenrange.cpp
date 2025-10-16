// User function template for C++
class Solution {
  public:

    long long int findBitwiseOR(long long int L, long long int R) {
        // complete the function here
        long long int res = L;
        while(res < R){
            res |= (res+1);
        }
        return res;
    }
};