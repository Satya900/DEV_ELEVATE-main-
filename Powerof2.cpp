
class Solution {
  public:
    // Function to check if given number n is a power of two.
    bool isPowerofTwo(int n) {
        // code here
        if((n & (n-1)) == 0){
            return true;
        }
        else{
        return false;
        }
    }
};