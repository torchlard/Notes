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
CacheNamespace
CacheNamespaceRef
ConstructorArgs
Arg
TypeDiscriminator
Case
Results
Result
One
Many
Options
Insert, Update, Delete
InsertProvider, UpdateProvider, DeleteProvider, SelectProvider
Param













