
# inspect browser element
browser toolbox (allow in setting in inspector first)

change .mozilla/firefox/xxx.default/chrome/userChrome.css

```css
#titlebar, #tabbrowser-tabs {
  --tab-min-height: 20px !important; 
}

:root {
  --toolbarbutton-outer-padding: 7px !important;
  --toolbarbutton-inner-padding: 0px !important;
}

:root:not([uidensity="compact"]) #back-button > .toolbarbutton-icon {
  width: 25px !important;
  height: 25px !important;
  padding: 5px !important;
}

#urlbar, .searchbar-textbox {
  margin: 0px 5px !important;
}

.tabbrowser-tabpanels { background-color: black !important; }

@-moz-document url("about:newtab") {
  body { background-color: #303030 !important;}
}

.browserContainer { background-color: #2b2b2b !important; }
```

setting in about:config
`browser.display.background_color`



