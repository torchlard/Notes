# DAO
assume we have Account object as entity

```
interface AccountDAO {
  Account get(String userNAme);
  void create(Account ac);
  void update(Account ac);
  void delete(String userName);
}
```
## adv
- separate domain logic that use it from any particular persistence mechanism
- interface method independent of Account class content

## disadv
responsibility not well-defined
=> need to continuously add new methods

```
interface AccountDAO {
  Account get(String userNAme);
  void create(Account ac);
  void update(Account ac);
  void delete(String userName);

  List getAccountByLastName(String lastName);
  List getAccountByAgeRange(int minAge, int maxAge);
  void updateEmailAddress(String userNAme, String newEmailAddress);
  ...
}
```

# Repository
```
interface AccountRepository {
  void addAccount(Account ac);
  void removeAccount(Account ac);
  void updateAccount(Account ac);

  List query(AccountSpecification spec);
}

interface AccountSpecification {
  boolean specified(Account ac);
}

public interface SqlSpecification {
  String toSqlClauses();
}
```

avoid expose type of Accounts identity to Repository interface

conposite Specification together with ConjuctionSpecification and DisjuncitonSpecification



# CQRS (Command Query Responsibility Segregation)
CRUD target system real entity
problem:
1. too coarse. eg. write whole object when only need update 1 field
2. resource contention
3. large data

CQS: every method can be separated into command and query
```java
private int i=0;
private int Increase(int value){
  i += value;
  return i;
}

// ==>
private void IncreaseCommand(int value){
  i += value;
}
private int QueryValue(){
  return i;
}

```





















