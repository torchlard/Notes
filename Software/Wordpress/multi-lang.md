# syntax
`<h1><?php _e('Settings Page') ?></h1>`
use gettext lib to add translations in PHP
should use wordpress localization functions

# text domain
unique id todistinguish all of loaded translations
only needed be defined for theme and plugin
name must use dash, lowercase, not underscore

## usage
1. style.css theme header
2. arg in localization function
   `__('post', 'my-theme) `
3. arg when load with load_theme_textdomain() / load_child_theme_textdomain()

# load translation
translations saved in .po and .mo files 
load using load_theme_textdomain()

{text-domain}-{locale}.mo in /wp-content/languages/themes



# file format
## mo (machine object)
binary data file contains object data referenced by program
used to translate program code, load/import into gettext program

## po
files contain actual translations
each lang has its own PO files, eg. French: fr.po

## POT
template files for PO files
have all translation strings left empty
empty PO file without translations, only original strings


















