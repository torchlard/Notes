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


# spring security
## factors
user: frontend input from webpage, backend store in db/memory
password: frontend input from webpage
  - after 5.0 must use PasswordEncoder
  - login pwd erased
role: frontend no input role, backend role stored in db/memory

## validation rule
url as resource, classify different types by privilege
access rule defined in WebSecurityConfigurerAdapter

## validation process
1. get user pwd from form, wrap as Authentication obj
2. pass Authentication to ProviderManager to validate
3. call AuthenticationProvider in chain accordingly
4. when validate success return Authentication obj
5. put obj in SecurityContext
6. when needed, take Authentication obj out from SecurityContextHolder

## important class
Authentication: Principal(normally UserDetail), Credential, Collection<? extends GrantedAuthority>
AuthenticationManager: ProviderManager, AuthenticationProvider
SecurityContextHolder

(autority: ROLE_OP) == (role: OP)


































