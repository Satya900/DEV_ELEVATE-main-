#include <vector>
#include <algorithm>
#include <climits>
using namespace std;
// User function template for C++
class Solution {
  public:

    long long sumBitDifferences(int arr[], int n) {
        // code here

    long long int total = 0;

    // Loop through all 32 bits
    for (int i = 0; i < 32; ++i) {
        int countSet = 0;

        // Use index-based loop
        for (int j = 0; j < n; ++j) {
            if (arr[j] & (1 << i)) {
                countSet++;
            }
        }

        long long int countUnset = n - countSet;
        total += countSet * countUnset * 2;
    }

    return total;
}
};