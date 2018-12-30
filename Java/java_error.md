# No enclosing instance of type Hello is accessible.
```java
class Hello {
    class Thing {
        public int size;

        Thing() {
            size = 0;
        }
    }
    public static void main(String[] args) {
        Thing thing1 = new Thing();
        System.out.println("Hello, World!");
    }
}
```
reason: 
there's inner class that's associated with particular instance of Hello
error to say `new Thing()` without having particular `Hello` instance

solution:
change inner class to static















