# NoClassDefFoundError
classpresent during compile time but not in runtime

## gradle
gradle build
gradle run

#executable file
can get executable file and all libs from build/distribution/Java.zip

#quiet mode
gradle -q build; gradle -q run

# compile order
need to compile other java file first if depends on them (import)

## this()
this reference to certain constructor signature

```java
public class Rectangle {
  private int x,y;
  private int width,height;

  public Rectangle(){
    this(0,0,1,1);
  }
  public Rectangle(int width, int height){
    this(0,0,width, height);
  }
  public Rectangle(int x,int y,int width, int height){
    this(x,y,width,height);
  }
}
```

##
```java
numbers.forEach(x -> System.out.println(x));
// to
numbers.forEach(System.out::println);
```

# switch java version
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/java_11_openjdk_amd64/bin/java" 1
sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/java_11_openjdk_amd64/bin/javac" 1
sudo update-alternatives --config java
sudo update-alternatives --config javac





