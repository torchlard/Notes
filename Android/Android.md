# Component
## history
android 3.0: ActionBar, use AppCompat in support library v7
new standard: (App bar in material design) Toolbar

## Toolbar
- navigation button
- logo image
- title, subtitle
- custom views
- action menu

if extends from ActionBarActivity want to get ActionBar => getSupportActionBar()
if from Activity => getActionBar()

## system color vs custom color
@android:color/white vs @color/white

ThemeOverlay.Material.Light.ActionBar => overlay normal Theme.Material
Once you setSupportActionBar(toolbar), the toolbar can use all libraries that support ActionBar

### xmlns:tools="http://schemas.android.com/tools"
it helps developer to work on development stage, after app is package/built, all tools attributes will be thrown away
eg. show activity effect before compile:
    tools:context="com.littlehan.myapplication.MainActivity"
    tools:layout="@layout/yourFragmentLayoutName"

### xmlns:app="http://schemas.android.com/apk/res-auto"
    for custom View's custom attribute

action view = action providing rich features within app bar
actionLayout = layout resource describing action's components

actionProvider = responsible for creating action view 
  just another kind of custom view in menu bar

# Layout
## CoordinatorLayout
super-powered FrameLayout
1. top level application achor
2. container for interaction >= 1 child views
- specifying Behaviors for child view   @DefaultBehavior

// coordinator Layout will auto find affcted view
add app:layout_behavior="@string/appbar_scrolling_view_behavior" 


android.support.v7.app.ActionBar => getSupportActionBar()
android.app.ActionBar => getActionBar()

## Drawer
can have both left and right pulled out drawer, but not from top/bottom
BottomNavigationView is persistent view






















