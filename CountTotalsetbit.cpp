// User function Template for C++

class Solution {
  public:
    // n: input to count the number of set bits
    // Function to return sum of count of set bits in the integers from 1 to n.
    int countSetBits(int n) {
        // Your logic here
        /*int c = 0;
        for(int i = 1; i <= n; ++i){
            for(int j = 0; j < 32; ++j){
                if((i >> j) & 1){
                    c++;
                }
            }
        }
        return c;*/
         if (n == 0) return 0;

        // Find the largest power of 2 less than or equal to n
        int x = 0;
        while ((1 << (x + 1)) <= n) {
            x++;
        }

        // Set bits in numbers from 1 to 2^x - 1
        int bitsTill2PowX = x * (1 << (x - 1));

        // Set bits from 2^x to n
        int msbFrom2PowXToN = n - (1 << x) + 1;

        // Remaining numbers
        int rest = countSetBits(n - (1 << x));

        return bitsTill2PowX + msbFrom2PowXToN + rest;
    }
};
