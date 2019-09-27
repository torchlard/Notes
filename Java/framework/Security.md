# Simple web security
`User.withDefaultPasswordEncoder().username("peter").password("123456")`

- require auth to every URL in application
- generate login form
- allow user with username `peter` and password `123456` to pass auth
- allow user to logout
- CSRF attack prevention
- session fixation protection
- secutiry header integration
  - http strict transport security
  - X-Content-Type-Options
  - Cache control
  - X-XSS-Protection
  - X-Frame-Options

integrate with servlet API
- HttpServletRequest#RemoteUser()
- HttpServletRequest#UserPrincipal()
- HttpServletRequest#UserInRole(String)
- HttpServletRequest#login(String, String)
- HttpServletRequest#logout()

```java
public class SecurityWebApplicationInitializer 
  extends AbstractSecurityWebApplicationInitializer{}

public class MvcWebApplicationInitializer 
  extends AbstractannotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getrootConfigClasses(){
      return new Class[] { WebSecurityConfig.class };
    }
}

```
register springSecurityFilterChain filter for every URL in application

ensure WebSecurityConfig loaded 







