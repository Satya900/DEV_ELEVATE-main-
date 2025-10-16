#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
class Solution {
  public:
   bool isSorted(const vector<int>&arr, int l, int r){
       for(int i = l; i < r; ++i){
           if(arr[i] > arr[i+1]){
               return false;
           }
           return true;
       }
   }
    int shortestUnorderedSubarray(vector<int>& arr) {
        int n = arr.size();
        for(int i = 1; i <= n; ++i){
            for(int j = 0; j <= n - i; ++j){
                if(!isSorted(arr, j, j+i-1)){
                    return i;
                }
            }
        }
        return 0;
    }
};
