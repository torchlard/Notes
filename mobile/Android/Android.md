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



# View
## ViewGroup
special view that can contain other views
base class for layouts and view containers
ViewGroup.LayoutParams: base class of layouts parameters

## RecyclerView
### RecyclerView.Adapter
base class for Adapter
provide binding from app-specific dataset to views displayed within RecyclerView

### RecyclerView.ViewHolder
describe item view and metadata about place within RecyclerView




# Notification
## overview
- status bar, notification drawer
- heads-up notification
- lock screen
- app icon badge
- wear os device

## anatomy
small_icon (setSmallIcon) | app name | timestamp (setWhen, setShowWhen)
large_icon (setLargeIcon)
title (setContentTitle)
text (setContentText)

## notification action
tap on notification -> go to app

## update
update existing notification / inbox style notification
group multiple notification

## notification channel
all notificaiton must assigned to channel (in order to appear)
user can disable notification channel for your app
- control visual, auditory options for each channel
- separate channel for each notification type
- channel specify importance level

## importance level
urgent: sound, heads-up notification
high: sound
medium: no sound
low: no sound, not appear in status bar

## do not disturb
total silence
- block everything
alarms only
- block all except alarm
priority only
- choose only alaram/reminder/event/call/msg
- filter based on caller

## service
notification required to run as "foreground service"
app cannot make notification sound >1 / second

## compatibility
### history
4.1
- expandable notification template
- additional action
- turn notification off
4.4
- notification listener
5.0
- lock screen
- setPriority, notification group
7.0
- can reply directly inside notification
8.0
- must put in channel, user turn individual on/off
- display badge on top of app icon
- snooze notification from drawer
- set notification background color


### NotificationCompat

NotificationManagerCompat (check compatibility)
- support older device
- easier control over all flags, help construct typical notification layouts

### pendingIntent
describe intent and target action to perform with it

ref to token maintained by system describing original data used to retrieve it
- give PendingIntent to other app -> grant right perform operation specified like other app is yours
- even owning applicaiton's process killed, PendingIntent remain usable from other processes






# Utils
## LayoutInflater
instantiate XML file -> View object
- Activity.getLayoutInflater() to get inflater instance


# OS
## Bundle
mapping from String keys to various Parcelable values
Parcel
- container for msg (data, obj ref) that sent throught IBinder
- contain flattened data that unflattened on other side of IPC
- contain ref to live IBinder obj -> other side receiving proxy IBinder -- original IBinder in parcel
=> high performance IPC transport



















