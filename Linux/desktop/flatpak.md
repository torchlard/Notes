# architecture
```
OS > runtime (lib)
   - application
      - lib
      - lib
        - code
        - data
   - application
      - lib
      - lib
        - code
        - data
```

# command
flatpak install
flatpak uninstall [--unused]
flatpak repair

flatpak remotes
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

flatpak search gimp
flatpak install flathub org.gimp.GIMP

`flatpak list [--app]` list installed packets [apps only]
`flatpak update`


# theory
## identifier
identifies each application using 3-part identifier `com.company.App`

## runtime
basic dependencies used by application, each app built against runtime
runtime must install on hsot system, multiple different runtime can be installed at same time

## bundled libraries
if app need any dependencies not in runtime, can be bundled as part of app
differnet version of lib from one in runtime

## sandbox
each app built and run in isolated environment
app can only access contents of its sandbox
access to user files, network, graphics sockets, subsystem on bus and device need explicit grant

exports: some resource inside sandbox need exposed outside used by host 

## portals
app can interact with host environment from within sandbox

# build
## AppData
metadata about application, used by application stores (Flathub, GNOME Software, KDE Discover)
/aptainfo/.

## Application icons
/app/share/icons/hicolor/128x128/apps/org.gnome.Dictionary.png

## Desktop files
desktop environment with info about app
/app/share/applications/org.gnome.Dictionary.desktop

# filesystem layout
root of sandbox contains /etc directory for config
/usr: multi-user utilities
/app: application's own files

# XDG base directories
user specific application data
- Electron: access with app.getPath
- Glib: g_get_user_cache_dir(), g_get_user_data_dir()
- Qt: QStandardPaths

XDG_CONFIG_HOME: user specific config file `~/.var/app/<app-id>/config`
XDG_DATA_HOME: user specific data `~/.var/app/<app-id>/data`
XDG_CACHE_HOME: non-essential user-specific data `~/.var/app/<app-id>/cache`
















