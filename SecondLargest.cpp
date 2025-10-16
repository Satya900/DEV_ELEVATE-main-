int getSecondLargest(int *a, int n) {
    // code here
     if (n < 2) return -1;

    int largest = a[0];
    int second = -1;

    for (int i = 1; i < n; ++i) {
        if (a[i] > largest) {
            second = largest;
            largest = a[i];
        } else if (a[i] < largest && (second == -1 || a[i] > second)) {
            second = a[i];
        }
    }

    return second;
}
