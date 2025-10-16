#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
// User function template for C++
class Solution {
  public:
    int totHammingDist(vector<int>& arr) {
        // code here
        int n = arr.size();
        int total = 0;
        for(int i = 0; i < 32; ++i){
            int countones = 0;
        for(int j = 0; j < n; ++i){
            if((arr[j] >> i) & 1){
                countones++;
            }
        }
        total += countones * (n-countones);
        }
        return total;
        
        
    }
};