// User function template for C++

class Solution {
  public:
    long long pairAndSum(int n, long long arr[]) {
        // code here
      long long totalSum = 0;


    // Consider 32 bits for each integer
    for (int bit = 0; bit < 32; bit++) {
        int count = 0;
        int bitMask = 1 << bit;

        // Count how many numbers have this bit set using indexed loop
        for (int i = 0; i < n; i++) {
            if (arr[i] & bitMask) {
                count++;
            }
        }

        long long pairs = (long long)count * (count - 1) / 2;
        totalSum += pairs * bitMask;
    }

    return totalSum;
        
    }
};