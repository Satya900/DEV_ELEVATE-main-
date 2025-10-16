#include <string.h>
void reverseString(char* s, int sSize) {
     int start = 0, end = sSize - 1;
    while (start < end) {
        char temp = s[start];
        s[start] = s[end];
        s[end] = temp;
        start++;
        end--;
    }

    printf("%s\n", s);
    
}