# intro
modern server-side Java template engine for both web and standalone environment
template engine = parase special tags and attributes on syntax
- resolve variable and attributes to actual values

2-way data binding
- build DOM that map to HTML of page
- when value from server change parsed fields, pages updated accrodingly

# usage
```java
@RequestMapping(value = "/create", method = RequestMethod.POST)
public String postUser(@ModelAttribute User user){
  userService.insertByUser(user);
  return "redirect:/users";
}
```
ModelMap binds data to view
returned string correspond to template name under `resources/templates`

@ModelAttribute get data submitted from Form, and then bind to User domain object

ModelMap.addAttribute("bookList",xxx)
=> "bookList" variable accessible in html by `th`


# syntax
for each product in productList
`th:each="product : ${productList}"`

html element content
`th:text="${product.description}"`

function execution
`th:text="${'$' + #number.formatDecimal(product.price,1,2)}"`

conditional
`th:if="${product.price lt 100}"`

get request on this path
`th:href="@{/book/delete/{bookId}(bookId=${book.bookId})}` ==> /book/delete/2

## inline javascript
in java, map.addAttribute("value",2)
```html
<script th:inline="javascript">
  const m = [[${value}]]
</script>
<!-- compile to  -->
<script>
  const m = 2
</script>
```

# expression
`#{message.in.properties.file}` similar to i18n
`<p th:text="#{brand.name}>Brand Name</p>`

`${variable}` access model attribute

## predefined variables
`#ctx`: context object
`#vars`: context variable
`#httpServletRequest`: HttpServletRequest object
`#httpSession`: session obj in current session
`#dates, #calendars`: java.util.Date, java.util.Calendar
strings, objects, bools, arrays, lists, sets

for set
```html
<div th:object="${session.user}">
  <p>fist name: <span th:text="*{firstName}"></span></p>
  <p>last name: <span th:text="*{lastName}"></span></p>
</div>
```

`@{/link/path}`: create link to path specified relative to deployment context
- if app depployed at context my-app, generated path = "/my-app/link/path"

`@{/link/path(param=value)}` => /link/path?param=value
`@{/link/{pathVariable}/path(pathVariable=${variable})}` => /link/${variable}/path


# Thymeleaf VS JSP
thymeleaf 

use both JSTL(core) and Spring(tags, form)
- look more HTML-ish than JSP, no strange tags, just meaningful attributes
- ${...} are Spring EL and execute on model attributes
- `*{...}` execute on form backing bean
- `#{...}` internationalization
- `@{...` link expression rewrite URLs

JSP
- strange tag, not original HTML, cannot display directly























