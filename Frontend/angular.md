# architecutre
every angular app has root module (AppModule)
basic building block = NgModule -> application context for components
## component
1. define view
2. user service

## NgModule
can imporrt functionality from otehr NgModule
eg. router -> Router NgModule
lazy loading
### metadata
declaration: 
- component
- directive
- pipe

exports: subset of declaration usable in other module
imports: import other needed exported classes
providers: creator of services current module contribute to global
bootstrap: root component, only root NgModule should set bootstrap property

## template, directive
template: 
- combine HTML with Angular markup
- modify HTML element before displayed

directive
- provide program logic

bind markup (event binding, property binding)
- connect data with DOM
- 
before view displayed, evaluate directives and resolve binding syntax

## routing
define navigation path among different applicatoin states and view hierarchy
- router map URL-like paths, not page


# Module
in NgModule, always has a root component + multiple additional components
view = component + template



# decorator
## @injectable
class participate in dependency injection system
need to register a provider before use
can be in different level: HeroesComponent, AppComponent, AppModule

## Observable
handle async request

# service
angular only binds to public component properties

module {component, service, value, function}
```
                  -- property binding ->
injection --> component [metadata] template <--- directive
                  <-- event binding ---
```
dependency injection provide service to component
- eg. routing


# Client-server interaction
## server-side rendering
## Service worker
script run in browser, manage caching for applicaiton
work as network proxy

# template
cannot write `<script>` in HTML template -> eliminate risk of script injection attack
`<html>, <body>, <base>` are not useful 

## template expression
many JS expression are valid, not all

prohibited: 
assignment, new, ';', ',',++,--
bitwise | and &

get new template expression operator

## template reference variable
'#heroInput'
```html
<div *ngFor="let hero of heroes">{{hero.name}}</div>
<input #heroInput> {{heroInput.value}}
```
if hero refer to both component property and hero template variable, template input variable is used

# data binding 
```js
// data -> view
{{expression}}
[target]="expression"
bind-target="expression"

// view -> data
(target)="statement"
on-target="statement"

// two way
[(target)]="expression"
bindon-target="expression"

```

## HTML attribute VS DOM property
attributes defined by HTML, properties defined by DOM
- few HTML have 1:1 map to property
- some HTML (colspan) and some DOM (textContent) no corresponding properties
- many HTML attribute map in another way

property value can change, attribute value can't
```html
<input type="text" value="Bob">
```
when input "Sally", DOM value becomes "Sally", HTML attribute still keep "Bob"
so value of attribute is irrelevant!
Template binding only works with properties and events, not attributes

```html
<img [src]="heroImageUrl"> === <img bind-src="heroImageUrl">
```

template expression should have no visible side effect
if it is never changed, can omit bracket
```html
<app-hero-detail prefix="you are my" [hero]="currentHero"></app-hero-detail>
```
src={{url}} VS [src]="url"
[class.special] [attr.colspan] [style.color]
[style.font-size.em]
(click)="onSave()" VS on-click="onSave()"

```html
<input [name]="currentHero.name" (input)="currentHero.name=$event.target.value">
<!-- to -->
<input [ngModel]="currentHero.name"
  (ngModelChange)="currentHero.name=$event">
<!-- to  -->
<input [(ngModel)]="currentHero.name">
```
$event: event handler

[(ngModel)] only set data-bound property

### EventEmitter
custom event

## structural directive
ngIF
#### ngSwitch
```html
<div [ngSwitch]="currentHero.emotion">
  <app-happy-hero *ngSwitchCase="'happy'" [hero]="currentHero"></app-happy-hero>
  <app-sad-hero *ngSwitchCase="'sad'" [hero]="currentHero"></app-sad-hero>
  <app-unknown-hero *ngSwitchDefault [hero]="currentHero"></app-unknown-hero>
</div>
```

#### ngFor
  with trackBy, only changing id trigger element replacement

ref-fax === #fax


## input & output
angular aways bind data bound properties to TypeScript public properties
identify properties outside component: @Input(), @Output()

```html
<!--          input                  output                -->
<hero-detail [hero]="currentHero" (deleteRequest)="deleteHero($event)">
```
input: receive data value
output: expose event producer (eg. EventEmitter)

### safe navigation operator
```html
the current hero name is {{currentHero?.name}}
```
non-null assertion operator: !


# lifecycle
ngOnChanges -> ngOnInit -> ngDoCheck
-> ngAfterContentInit -> ngAfterContentChecked
-> ngAfterViewInit -> ngAfterViewChecked -> ngOnDestroy


# CSS
## import 
@import './hero-details-box.css'
global style: 'styles.css' file
private style: @Component.styleUrls


## non-CSS
eg. scss, less, styl
directly specify in styleUrls, will use internal CSS preprocessor


# Router
properties
1. path: string that match url
2. component: component that router should create when navigating to this route

register router url pattern in 'app-routing.module'
use routerLink map to url in router 

routerLink = selector for RouterLink directive

##
routed angular application has 1 singleton instance of Router service
- no route until configured

Router outlet: directive act as placeholder mark spot in template

## active router links
RouterLinkActive toggle css class for active RouterLink binding

## router state
at end of successful navigation lifecycle, build tree of ActivatedRotue object
can access current RouterState anywhere

## keyword
Router
RouterModule
Routes
ActivatedRoute: service provided to each route component contain route specific info
- eg. route param, static data, resolve data, global query param, global fragment  

## secondary route
named outlets: target of secondary routes
~ primary routes, some different:
- independent of each other
- work in combination with other route
- displayed in named outlets

## guard
return value:
- true: navigation continue
- false: navigation stop, user stays put
- UrlTree: current navigation cancels, new navigation init to UrlTree returned
### interface
canActivate: nav to route
canActivateChild: mediate navigation to child route
CanDeactivate: away from current route
Resolve: route data retrieval before activation
CanLoad: to feature module loaded asynchronously

CanDeactivate -> CanActivateChild -> CanActivate -> CanLoad

## fragment
certain element on page identified with an id attribute

## LocatonStrategy
when router navigate to new component view, update browser's location and history with URL
-> strictly local URL
no need send URL to server and no reload
html5 `history.pushState`: chagne browser location without server page request

- older browser need # to avoid send server
support 2 LocationStrategy provider
1. PathLocationStrategy: default html5 pushState style
2. HashLocationStrategy: hash URL style

# HTTP
use InMemoryDbService to mimic real HTTP server database servie
return RxJS Observable

observable from HttpClient always emit single value and then completes

# Dynamic Component
component template not always fixed, can load new components at runtime


# Data service (REST)
GET: api/persons    (check all)
GET: api/persons/id  (check one)
PUT: api/persons/id   (update one)
DELETE: api/persons/id  (delete one)
POST: api/persons     (add one)

# Form
use ngModel create two-way binding
track state change and validity of form controls
visual feedback using special CSS classes
display validation error
shared info across HTML elements using template ref variables

## validation
valid/invalid: (not) satisfy custom rules
pristine: no input / not used
dirty: has input / used

## 
`#heroForm="ngForm"`
Angular auto create and attach NgForm directive to <Form> tag
supplements the form element with additional features
hold controls you created for elements with ngModel directive and name attribute,
- monitor properties, including validity

`<input [value]="currentHero.name" (input)="currentHero.name=$event.target.value"`
simplified to
`<input [ngModel]="currentHero.name" (ngModelChange)="currentHero.name=$event"`


# usage
## ngIf VS [hidden]
*ngIf: add/remove DOM
`[hidden]`: add 'hidden' attribute to DOM

## element refernece
`#xxx`: get element ref
one-way binding:
`<input #inp (change)="foo = inp.value">`
two-way binding:
`<input #inp (change)="foo = inp.value" [value]="foo = $event">`

NgModel:
`[(ngModel)]="foo"` is short form of `[ngModel]="foo" (ngModelChange)="foo = $event"`
allow integrade DOM input elements and custom component into Angular form functionality
abstraction over all kinds of elements and components
two way binding on element value, assign that to variable

ngModel: set value property
ngModelChange: listen for changes in value
- only work for element supported by ControlValueAccessor

##
(): event
[]: attribute
*: logic


# template expression
## guideline
1. no visible side effect
2. quick execution
3. simplicity
4. idempotence

## syntax
no bitwsie operation

## data direction
```ts
// one way soruce -> view
{{expression}}
[target]="expression"
bind-target="expression"

// one way view -> source
(target)="statement"
on-target="statement"

// two-way
[(target)]="expression"
bindon-target="expression"

```

## HTML attribute VS DOM property
attribute defined by HTML, properties defined by DOM
- few 1:1
- some HTML unique, eg. colspan
- some DOM unique, eg. textContent
- many appears 1:1, not in same way 
eg. when inputing into `<input>`

HTML attribute value: initial value, DOM value: current value
Template binding works with properties and events, not attributes

in angular, only role of attribute is to initialize elements and directive state

## style
```html
<button [attr.aria-label]="help">help</button>

<div [class.special]="isSpecial">Special</div>
<button [style.color]="isSpecial ? 'red' : 'green'">

<!-- without binding -->
<div class="bad curly">Bad Curly</div>
<!-- with binding -->
<div class="bad curly" [class]="badCurly">Bad Curly</div>
```
ok to toggle single class name, prefer NgClass directive when managing multiple class names


## property binding / interpolation
```html
<img src="{{heroImageUrl}}">
<img [src]="heroImageUrl">
```

## content security
sanitize value before display, will not allow HTML script tag leak into browser
deal with `<script>` tag, avoid XSS attack

# built-in directives
## attribute directives
listen to and modify behavior of html elements, attributes, properties, components
many NgModules such as RouterModule and FormsModule define their own attribute directives

- NgClass: add, remove CSS classes
- NgStyle: add, remove HTML styles
- NgModel: two-way data binding

## structural directives
NgIf, NgSwitch, NgForOf
to enhance ngFor performance, `trackBy` to track value 
```html
<div *ngFor="let hero of heroes; trackBy: trackByHeroes">
  ({{hero.id}} {{hero.name}})
</div>
```

## Input / Output
angular compiler won't bind to properties of different component unless Input/Output properties
- never bind private property
Input: receive data value
Output: expose event producers, eg. EventEmitter


# Optimization
## lazy loading
load features area on request by user
module can be unit of loading
eg. only load AdminModule if user logged in

## preload
1. no preloading at all (default)
2. preloading of all lazy loaded feature area

-> custom preloading strategy
- not load area protected by CanLoad guard















# Authentication (OpenID)
use implicit flow, where all token pass via browser
- becoz application cannot be trusted with features such as long lived token, refresh token / client secret
















