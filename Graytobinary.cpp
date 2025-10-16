// User function Template for C++

class Solution {
  public:
    // function to convert a given Gray equivalent n to Binary equivalent.
    int grayToBinary(int n) {

        // Your code here
         int res = 0;
        
        // The MSB of binary is same as MSB of gray
        for (; n; n = n >> 1) {
            res ^= n;
        }
        
        return res;
        
    }
};