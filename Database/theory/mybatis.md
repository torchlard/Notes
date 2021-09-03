# MyBatis-Spring-Boot-starter
reduce boilerplate to almost 0
less XML config

## function
- autodetect existing DataSource
- create + register instance of SqlSessionFactory, DataSource as input using SqlSessionFactoryBean
- create + register SqlSessionTemplate got out of SqlSessionFactory
- autoscan mapper [@MapperScan], link SqlSessionTemplate, register Spring context -> inject into beans
  + won't scan if found one MapperFactoryBean

## detection
detect beans that implement interfaces:
1. Interceptor
2. DatabaseIdProvider

## configuraiton
config-location, mapper-locations, type-aliases-package, type-handler-package
configuration-properties, configuration

## transaction
2 ways in spring
1. based on tx, AOP namespace, xml config
2. @Transactional [declarative]

normally declarative style better than procedural style
smallest scale of transaction only to method level

### isolation level
1. ISOLATION_DEFAULT
2. ISOLATION_READ_UNCOMMITTED
3. ISOLATION_READ_COMMITTED
4. ISOLATION_REPEATABLE_READ
5. ISOLATION_SERIALIZABLE

### transaction propagation
1. PROPAGATION_REQUESTED (default)
if tx, join tx; else new
2. PROPAGATION_REQUIRES_NEW
new tx; if existing tx, hold tx
3. PROPAGATION_SUPPORTS
if tx, join; else run as non-tx
4. PROPAGATION_NOT_SUPPORTED
run as non-tx; if existing tx, hold tx
5. PROPAGATION_NEVER
run as non-tx; if tx, throw err
6. PROPAGATION_MANDATORY
if tx, join; else throw err
7. PROPAGATION_NESTED
if tx, nested inside tx; else new

### timeout
time allowed for each transaction
if exceed time limit, then auto rollback
unit = second

### attributes
value
propagation
isolation
readOnly
timeout
rollbackFor
rollbackForClassName
noRollbackFor
noRollbackForClassName

### usage
@Trasaction can be used in
*: (not recommand)
*interface, *interface method , class, class method

only external method call will trigger AOP capture, so inner class call no use

### annotation
CacheNamespace, CacheNamespaceRef
ConstructorArgs, Arg
TypeDiscriminator, Case: criminator

Results, Result
One, Many
Options, SelectKey
Insert, Update, Delete
InsertProvider, UpdateProvider, DeleteProvider, SelectProvider
Param

## ConstructorArgs, Arg
for concrete class without no-arg constructor (for return object)

## map sql to db fields
1. use sql sentense nickname
2. mapUnderscoreToCamelCase
3. resultMap
each element has Java annotation @Results
```java
@Results(id="userResultMap", value={
  @Result(property="id", column="id", id=true),
  @Result(property="userName", column="user_name"),
  @Result(property="userPassword", column="user_password"),
  @Result(property="headImg", column="head_img", jdbcType=JdbcType.BLOB)
})
@Select("select * from sys_user where id=#{id}")
public SysUser selectedById(long id);

// other methods
@ResultMap("userResultMap")
@Select({"select * from sys_user"})
public List<SysUser> selectAll();

```

## auto_inc key
```java
@Options(useGeneratedKeys=true, keyProperty="id")
```

## non auto_inc key
```java
@SelectKey(statement="SELECT LAST_INSERT_ID()", keyPRoperty="id",resultType=Long.class, before=false)
```

## relation mapping
1 Author has multiple Article, 1 Article only 1 Author

```java
// author table
id, name
// article table
id, title, content, author_id

// class definition
public class Article {
  private Integer id;
  private String title;
  private String content;
  private Author author;
}

public class Author {
  private Integer id;
  private String name;
  private List<Article> articles;
}

// link field 'author' in Article to another method
@Select("select * from article where id=#{articleId}")
@Result(property="author", column="author_id",
  one = @One(select="xxx.AuthorMapper.findAuthorByAuthorId"))
public Article findAritcleWithAuthorByArticleId(@Param("articleId") int articleId);

/** in AuthorMapper */
@Select("SELECT id, name from author where id=#{authorId}")
Author findAuthorByAuthorId(int authorId);

// when execuing @Many in select sentence, let id in author input as argument
@Result(property="articles", column="id",
  many = @Many(select="xxx.ArticleMapper.findArticleByAuthorId"))
Author findAuthorWithArticlesByAuthorId(int authorId);

```



















