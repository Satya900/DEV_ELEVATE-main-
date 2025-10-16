class Solution {
  public:
    int negaBit(int F, int S) {
        // code here
 
        for(int i = 0; i < 32; ++i){
            if((F >> i) & 1){
               S ^= (1 << i);
            }
        }
        return S;
    }
};