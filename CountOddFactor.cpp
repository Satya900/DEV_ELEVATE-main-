class Solution {
  public:
    int count(int N) {
        // code here
        int res = 0;
        for(int i = 1; i <= N; ++i){
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
          if(c % 2 != 0){
            res++;
        }  
        }
        return res;
    }
};