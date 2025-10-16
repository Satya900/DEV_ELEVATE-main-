int find_triplets(int * ch, int n){
    int ans = 0, la=0, totala= 0, ra = 0;
    for(int i = 0; i < n; ++i){
        if(ch[i] == 'a'){
            totala++;
        }
    }
    for(int i = 0; i < n; ++i){
        if(ch[i] == 'b'){
            ra = totala - la;
            ans = ans + la*ra;
        }
        else{
            la++;
        }
    }
    return ans;
}