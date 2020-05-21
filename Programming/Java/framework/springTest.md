@RunWith(SpringRunner.class): bridge between spring boot test features and junit

## jpa test
@DataJpaTest: setup for testing persistence layer
- config H2
- setting hibernate, spring data, datasource
- @EntityScan
- turn on SQL logging

TestEntityManager: alternative standard JPA entityManager
- provide methods commonly used when writing tests

@MockBean: 
- test service layer code without wiring in our full persistence layer
- mocking support by springboot test







# error
## 1
situation: package org.junit does not exist
reason: declared in testCompile for 'springboot starter test'
solution: turn to compile





