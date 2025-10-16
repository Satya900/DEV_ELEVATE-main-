// User function Template for C++
#include <vector>
#include <algorithm>
#include <climits>
#include <strings.h>
#include <string.h>
#include <string>
using namespace std;
char extraChar(string &s1, string &s2) {

    // code here
    int n = s1.size();
    for(int i = 0; i < n; ++i){
        for(int j = 0; j <= n; ++j){
            if(s2[j] != s1[i]){
                return s2[j];
            }
        }
     }
        
    }
    
