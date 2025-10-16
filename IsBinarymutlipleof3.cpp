// User function template for C++
#include <vector>
#include <algorithm>
#include <climits>
#include <string>
using namespace std;
class Solution {
  public:
    bool isDivisible(string & s) {
    int remainder = 0;
        for (char bit : s) {
            remainder = (remainder * 2 + (bit - '0')) % 3;
        }
        return remainder == 0;
    }
};