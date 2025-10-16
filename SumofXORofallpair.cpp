

class Solution {
  public:
    // Returns sum of bitwise OR
    // of all pairs
    long long int sumXOR(int arr[], int n) {
        // Complete the function
        long long int sum = 0;
        for(int i = 0; i < 32; ++i){
            long long int c = 0;
            for(int j = 0; j < n; ++j){
                if((arr[j] >> i) & 1 == 1){
                    c++;
                }
            }
            sum = sum + c*(n-c)*(1 << i);
        }
        return sum;
    }
};