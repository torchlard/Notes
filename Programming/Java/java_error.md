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

# No class found exception
reason: if use gradle, runtime classpath not included
solution: add `runtimeClasspath` in dependencies

# javax.net.ssl.SSLException: closing inbound beforereceiving peer's close_notify
reason: ssl 

# javax.net.ssl.SSLException MESSAGE: closing inbound before receiving peer's close_notify
useSSL=false&allowPublicKeyRetrieval=true








