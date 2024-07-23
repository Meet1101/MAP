#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    cin >> n;
    vector<int> v;
    int t;

    for (int i = 0; i < n; i++)
    {
        cin >> t;
        v.push_back(t);
    }

    for (auto it : v)
    {
        cout << it << " ";
    }
}