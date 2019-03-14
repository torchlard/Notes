@NoArgsConstructor
- constructor without args
- if final field exist => error
- unless (force=true) => final = 0/false/null
  
@AllArgsContructor: constructor with all fields
- constructor with 1 param foreach field in class
- 

@RequiredArgsConstructor
- constructor with 1 param for each field taht need special handling
- final field, @NonNull


```java
@RequiredArgsConstructor(staticName = "of")
@allArgsConstructor(access = AccessLevel.PROTECTED)
public class ConstructorExample<T> {
  private int x,y;
  @NonNull private T description;

  @NoArgsConstructor
  public static class NoArgsExample {
    @NonNull private String field;
  }
}
```












