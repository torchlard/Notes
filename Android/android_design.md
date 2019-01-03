# class for widget
support.design.widget
  FloatingActionButton
  NavigationView
  Snackbar
  TabLayout

support.v4.app
  Fragment
  FragmentManager
  FragmentPagerAdapter

support.v4.view
  GravityCompat
  ViewPager

support.v7.app
  ActionBar
  AppCompatActivity
  AppCompatDelegate

view
  Menu
  MenuItem
  View  

## Cheesesquare layout
activity_main:
DrawerLayout [entry point]
  @include_list_viewpager
  NavigationView

@include_list_viewpager:
CoordinatorLayout
  AppBarLayout
    Toolbar
    TabLayout
  ViewPager
  FloatingActionButton

NavigationView
  nav_header
  drawer_view

nav_header:
TextView

drawer_view:
menu
  group
    item
    item
    item
    item
  item
    menu
      item
      item

menu [call by java]
  item
    menu
      group
        item
        item
        item
        item

list_item [item layout]:
LinearLayout
  CircleImageView
  TextView

---
fragment_cheese_list
  RecyclerView
        
activity_detail: [2nd page]
CoordinatorLayout
  AppBarLayout
    CollapsingToolbarLayout
      ImageView
      Toolbar
  NestedScrollView
    LinearLayout
      CardView
        LinearLayout
          TextView
          TextView
      CardView
        LinearLayout
          TextView
          TextView
      CardView
        LinearLayout
          TextView
          TextView
    FloatingActionButton


# layout attributes
layout_width, layout_height:
  match_content, wrap_content

layout_gravity (alignment):
  start/end | top/bottom

layout_margin

# statup procedure
## theory
1. setup view (which is not necessary in web)
2. register onClick events
3. 

## startup code
```java
setContentView(R.layout.activity_main)

Toolbar toolbar = findViewById(R.id.toolbar)
```


# Components
## menu
- Options menu
actions with global impact
- Context menu
floating menu appears when long click
action affect seleced content
- Popup menu
displays list of items vertically, anchored to view that invoked the menu
eg. for second part of command, overflow of actions for specific content
should not directly affect corresponding content

### good practice
create separate XML file for menu
- can have alternative menu config for different versions

### components
- menu (Menu)
container of items, must be root
- item (MenuItem)
single item in menu, can contain nested menu
- group
optional container for item
categorize items, share common properties (active state, visibility)

### code (options menu)
declare under Activity/Fragment. If both declared,combined, activity's item appear first, then each fragment

at different stages:
  onCreateOptionsMenu
    define which xml menu inflates
  onPrepareOptionsMenu
    before showing result, change menu display based on activity's state
  onOptionsItemSelected
    what happen when item selected

## ViewPager
### adapter
two adapters can use to hook layout to PagerAdapter
1. FragmentPagerAdapter
navigate between fixed, small number of pages
2. FragmentStatePagerAdapter
undetermined number of pages
destroys fragment when user navigate to other page, to minimize memory use

### code (FragmentPagerAdapter)
getItem: return corresponding fragment item
getCount: return number of fragments
getPageTitle: return corresponding title

## NavigationView
### code
setNavigationItemSelectedListener:
listener that will be notified when menu item in drawer is selected

## Fragment
### theory
portion of user interface in FragmentActivity
has own lifecycle, own input events, add/remove while running
must always hosted in activity, directly affected by host activity's lifecycle
back stack allow user to reverse fragment transaction
lives in ViewGroup

### lifecycle
onAttach, 
*onCreate: when fragment created 
*onCreateView: first time draw UI
onActivityCreated, onStart, onResume
=> Fragment is active
*onPause: first indication user is leaving fragment
onStop, onDestroyView, onDestroy, onDetach

## RecyclerView
### theory
to display scrolling list of elements based on large data sets
overall container = RecyclerView add to layout
view represented by view holder objects:
  extending RecyclerView.ViewHolder
view holder objects managed by adapter:
  extending RecyclerView.Adapter
  -> create view holder needed
  -> bind view holder to data [onBindViewHolder()]

### Optimization
when list first populated, created first few elements ready to view
as scrolls, create new view holder
use RecyclerView.Adapter.notify..() to nofity adapter when displayed item change

### code
onCreateViewHolder: declare source context to create new view
onBindViewHolder: feed data to view
getItemCount: return size of dataset



