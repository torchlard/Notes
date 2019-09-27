# FilterRegistrationBean<T extends Filter>
ServletContextInitializer to register Filters in servlet 3.0+ container

```xml
<filter>
  <filter-name>WebAccessAuthorizeFilterMvc</filter-name>
  <filter-class>com.cmb.bip.filter.ManageAccessFilter</filter-class>
  <init-param>
    <param-name>EXCEPTION_URI</param-name>
    <param-value>login.html, *.js</param-value>
  </init-param>

  <init-param>
    <param-name>ERR_URL</param-name>
    <param-value>login.html</param-value>
  </init-param>
</filter>

<filter-mapping>
  <filter-name>WebAccessAuthorizeFilterMvc</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```
equivalent to ==>

```java
@Configuration
public class WebFilterRegistration {
  @Bean
  public FilterRegistrationBean registerFilter(){
    FilterRegistrationBean registration = new FilterRegistrationBean();
    registration.setFilter(new ManageAccessFilter());
    registration.setName("WebAccessAuthorizeFilterMvc");
    registration.addInitParameter("EXCEPTION_URI", "login.html, *.js");
    registration.addInitParameter("ERR_URL", "login.html");
    registration.addUrlPattern("/*");

    return registration;
  }
}
```



# ServletContext
interface for servlet use to communicate with servlet container 
1 context per 'web application' per JVM

ServletContext object contained within ServletConfig obj


# LocalContainerEntityManagerFacotryBean
FactoryBean that creates JPA according to JPA's standard container bootstrap contract
most powerful way setup shared JPA EntityManagerFactory in spring context

pass JPA-based DAO via dependency injection
can switch to JNDI lookup / LocalEntityManagerFactoryBean definition


# Aware
superinterface that bean eligible to be notified by Spring container













