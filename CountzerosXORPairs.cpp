long long int calculate(int a[], int n) {
    // Complete the function
    int c = 0;
    for(int i = 0; i < n; ++i){
        for(int j = i+1; j < n; ++j){
            if((a[i] ^ a[j]) == 0){
                c++;
            }
        }
    }
    return c;
}
