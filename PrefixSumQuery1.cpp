#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;


int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */  
    
    int n, q;
    cin >> n >> q;

    vector<long long> arr(n);
    for (int i = 0; i < n; ++i) {
        cin >> arr[i];
    }

    vector<long long> psum(n);
    psum[0] = arr[0];
    for (int i = 1; i < n; ++i) {
        psum[i] = psum[i - 1] + arr[i];
    }

    for (int i = 0; i < q; ++i) {
        int l, r;
        cin >> l >> r;
        if (l == 0)
            cout << psum[r] << '\n';
        else
            cout << psum[r] - psum[l - 1] << '\n';
    }
    return 0;
}
