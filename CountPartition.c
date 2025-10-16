int countPartitions(int * nums, int numsSize){
    int totalSum = 0;
    for(int i = 0; i < numsSize; ++i){
        totalSum += nums[i];
    }

    int count = 0;
    int leftSum = 0;
    for(int i = 0; i < numsSize-1; ++i){
        leftSum += nums[i];
        int rightSum = totalSum - leftSum;
        if((leftSum - rightSum) % 2 == 0){
            count++;
        }
    }
    return count;
}