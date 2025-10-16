void reverseRange(int * nums, int l, int r){
    int p1 = l, p2 = r;
    while(p1 < p2){
        int temp = nums[p1];
        nums[p1] = nums[p2];
        nums[p2] = temp;
        p1++;
        p2--;

    }
}

void rotate(int* nums, int numsSize, int k) {
    k = k % numsSize;
    reverseRange(nums, 0, numsSize-1);
    reverseRange(nums, 0, k-1);
    reverseRange(nums, k, numsSize-1);
}