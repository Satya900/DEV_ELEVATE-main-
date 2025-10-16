
class Solution {
  public:
    int count(int A, int B, int N) {
        // code here
        int res = 0;
        for(int i = A; i <= B; ++i){
            int c = 0;
            for(int j = 1; j*j <= i; ++j){
                if(i % j == 0){
                    if(j*j == i){
                    c+= 1;
                    }
                    else{
                        c += 2;
                    }
                }
            }
          if(c == N){
            res++;
        }  
        }
        return res;
        
    }
};