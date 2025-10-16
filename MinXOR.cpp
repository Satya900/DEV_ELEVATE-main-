// User function Template for C++

class Solution {
  public:
  int countSetBits(int n) {
    int count = 0;
    while (n) {
        count += (n & 1);
        n >>= 1;
    }
    return count;
}

    int minVal(int A, int B) {
        // code here
        int setBits = countSetBits(B);
    int X = 0;

    // Step 1: Try to match set bits in A starting from MSB to LSB
    for (int i = 31; i >= 0 && setBits > 0; i--) {
        if (A & (1 << i)) {
            X |= (1 << i);
            setBits--;
        }
    }

    // Step 2: If more set bits are still needed, set them from LSB upwards
    for (int i = 0; i < 32 && setBits > 0; i++) {
        if ((X & (1 << i)) == 0) {
            X |= (1 << i);
            setBits--;
        }
    }

    return X;
        
        
        
    }
};