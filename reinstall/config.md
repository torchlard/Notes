# install software

# set software
## vscode
sync settings
setup syncLocalSettings to overwrite some config


# set theme
~/.themes : copy system theme
/usr/share/icons  : copy icons

add to ~/.config/gtk-3.0/gtk.css
```css
window.ssd headerbar.titlebar {
  padding-top: 1px;
  padding-bottom: 1px;
  min-height: 0;
}

window.ssd headerbar.titlebar button.titlebutton {
  padding-top: 1px;
  padding-bottom: 1px;
  min-height: 0;
}

/* shrink headebars */
headerbar {
  min-height: 38px;
  padding-left: 2px; /* same as childrens vertical margins for nicer proportions */
  padding-right: 2px;
}

headerbar entry,
headerbar spinbutton,
headerbar button,
headerbar separator {
  margin-top: 2px; /* same as headerbar side padding for nicer proportions */
  margin-bottom: 2px;
}

/* shrink ssd titlebars */
.default-decoration {
  min-height: 0; /* let the entry and button drive the titlebar size */
  padding: 2px
}

.default-decoration .titlebutton {
  min-height: 26px; /* tweak these two props to reduce button size */
  min-width: 26px;
}

/* .scrollbar.vertical slider,
srcollbar.vertical slider {
  max-width: 5px;
} */
```













