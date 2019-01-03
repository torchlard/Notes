# issue
## share ip to other machine
ng serve --host=0.0.0.0
### ip 0.0.0.0
default router: 0.0.0.0/0
all machine in network: 0.0.0.0/8
if 0.0.0.0 router is set, when package cannot be traced by router table, all sent to 0.0.0.0

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
--
      property binding ----->
injection --> component    template <--- directive
      event binding <-------

# NgModule
## metadata
declaration: component, directive, pipe
exports: subset of declaration usable in other module
imports
providers: creator of services current module contribute to global
bootstrap: root component, only root NgModule should set bootstrap property


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
if hero refer to both component property and hero template variable,
  template input variable is used

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

global 'styles.css' file

## non-CSS
eg. scss, less, styl
directly specify in styleUrls, will use internal CSS preprocessor













