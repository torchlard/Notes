1. Dependency 
A ---> B
class A depends on class B: class A uses class B, but class A doesn't contain instance of class B as part of own state
non-state related concerns
don't overuse it
'''
import B;
public class A {
  public void method1(B b){
    // ...
  }
  public void method2(B tempB){
    // ...
  }
}
'''

2. Association
A -> B
much stronger denpendency, one way
A1 use and contains 1 instance of B1
'''
import B1;
public class A1 {
  private B1 b1;
  public B1 getB1(){
    return b1;
  }
}
'''

3. Aggregation
A (clear diamond)-> B
A contains reference to an instance of B as part of A's state

4. Composition
A (black diamond)-> B
scope of containing object(A) and contained object(B) is related

5. Generalization (Inheritance)
A -(clear triangle) B
inheritance relation, A is subclass of B

6. Realization (Implementaion) 
A ---(clear triangle) B
A implement B







