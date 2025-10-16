#include <ctype.h>
#include <stdlib.h>
int findMaxK(int* nums, int numsSize) {
      for(int i = 0; i <= numsSize-1; ++i){
        int min_index = i;
        for(int j = i+1; j <= numsSize-1; ++j){
            if(nums[j] < nums[min_index]){
                min_index = j;
            }
        }
        int temp = nums[i];
        nums[i] = nums[min_index];
        nums[min_index] = temp;
    }

    int left = 0, right = numsSize-1;
    while(left < right){
        int sum = nums[left] + nums[right];

        if(nums[right] == -nums[left]){
            return nums[right];
        }
        else if(nums[right] > -nums[left]){
            right--;
        }
        else{
            left++;
        }
    }
    return -1;
}