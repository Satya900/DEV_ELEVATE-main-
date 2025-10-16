class Solution {
  public:
    int countBitsFlip(int a, int b) {
        // code here
        int c = a ^ b;
        int count = 0;
        for(int i = 0; i < 32; ++i){
            if((c >> i) & 1){
                count++;
            }
        }
        return count;
        
    }
};