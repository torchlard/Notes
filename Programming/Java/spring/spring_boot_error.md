# No plugin found for prefix 'run' in the current project and in the plugin groups


# 
situation:
hello.TestService > initializationError FAILED
 java.lang.IllegalStateException

reason: 

# springboot 解决 The bean 'userRepository', defined in null, could not be registered. A bean with that name has already been defined in file XXX and overriding is disabled.
solution:  add main.allow-bean-definition-overriding: true

# com.zaxxer.hikari.HikariConfig : HikariPool-2 - jdbcUrl is required with driverClassName.
set url to jdbcUrl in properties

# nested exception is org.springframework.beans.factory.NoUniqueBeanDefinitionException: No qualifying bean of type 'javax.persistence.EntityManagerFactory' available: expected single matching bean but found 2: emFactoryPrimary,emFactorySecondary
add @Primary to entityManager and transactionManager





