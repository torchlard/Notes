# Strategy pattern
Client -> Strategy    <-- ConcreteStrategyB
          +execute()  <-- ConcreteStrategyA

```java
public class Validator{
  private final ValidationStrategy strategy;
  public Validator(ValidationStrategy v){
    this.strategy = v;
  }
  public boolean validate(String s){
    return strategy.execute(s);
  }
}

Validator numericValidator = new Validator((String s) -> s.matches("[a-z]+"));
boolean b1 = numbericValidator.validate("aaaa");

Validator lowerCaseValidator = new Validator((String s) -> s.matches("\\d+"));
boolean b2 = lowerCaseValidator.validate("bbbb");
```






































