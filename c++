# cannot mix up these two ways,
that gets the age from the input stream, but it leaves whitespace on the stream.
Specifically, it will leave a newline on the input stream
# Solution: only use cin.getline

cin << name;
cin.getline(buffer, 10);

#
warning: friend declaration ‘Vector<T> operator*(const T&, const Vector<T>&)’ declares a non-template function

reason: gcc gives error on shadowing
solution: add template<class U> in front, make it fully template
