
class Solution {
  public:
    int setAllRangeBits(int N, int L, int R) {
        // code here
        for(int i = L-1; i < R; ++i){
            N =  (N | (1 <<i));
        }
        return N;
    
    }
};