#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
int* game_with_number(int arr[], int n) {

    // Complete the function
    for(int i = 0; i < n; ++i){
        if(i == (n-1)){
            arr[i] = arr[i];
        }
        else{
        arr[i] = (arr[i] | arr[i+1]);
        }
    }
    return arr;

}
