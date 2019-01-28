# inspect browser element
browser toolbox

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

```




