# basis
php file with plugin header comments

location: wp-content/plugins/<plugin-name>

# hooks
allow you to tap into Wordpress at specific points to change how 

action: add / change functionality
filter: alter content as it is loaded and displayed to website user

## basic hooks
register_activation_hook()
- provide function to setup plugin

register_deactivation_hook()
- clear any temp data stored by plugin

register_uninstall_hook()
- clean up after plugin is deleted
- delete all data created by plugin

## add
add custom hook with do_action()
enable developers to extend your plugin by passing functions through hook

## remove
if plugin is add-on to another plugin, can use remove_action() with same fn callback

## header field in comment
name, uri, description, version
min wp version, min php version
author, uri
license (uri), text domain
domain path, network


## uninstall
deactivate: flush cache, flush permalinks
uninstall: remove options from {$wpdb->prefix}_options, remove tables from $wpdb


# best practice
all variables, functions, classes defined in global namespace
prefix everything with unique identifier, avoid overwrite other plugin

check for existing implementations
```php
if (!function_exists('wporg_init')){
  function wporg_init(){
    register_setting('wporg_settings', 'wporg_option_foo')
  }
}
```

## structure
```
/plugin-name
  plugin-name.php
  uninstall.php
  /languages
  /includes
  /admin
    /js
    /css
    /images
```

# functions
{get|network}_{admin|home|site}_url()
{home|admin|site|content|includes}_url()

plugins_url(), plugin_dir_url()

## remove hook
remove_{all_}action()
remove_{all_}filter()

## check times hook run
did_action('<name>')

# menu
add_menu_page(
  $page_title,
  $menu_title
)

add_submenu_page(
  $parent_slug,
  #page_title,
  #menu_title
)

# shortcodes
run PHP inside wordpress content is forbidden

```php
[caption] // wrap captions around content
[gallery]
[audio]
[video]
[playlist]
[embed]

add_shortcode('wporg', 'wporg_shortcode');
function wporg_shortcode($atts=[], $content = null){
  // do sth to $content
  return $content;
}

```
# settings
setting api: way to create forms and manage form data
options api: manage data using simple key/value system

## benefit of setting api
1. visual consistency
2. robustness
  - any update will auto consider plugin's setting page
  - core updates likely break your customizations

## ref
{un}register_setting()
add_settings_{section|field}()










