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








