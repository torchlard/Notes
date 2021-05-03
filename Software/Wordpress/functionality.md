# widget
add content and features to widget area
provide a way for users to customize site

can appear multiple page / only 1 page

## usage
1. allow site owner decide what appear in each section
2. footer to customize own content
3. customizable sidebar to blog

if widget with theme
- if theme changed, lose widget

if widget with plugin
- can change theme without affecting widget functionality


## code
```php
class My_Widget extends WP_Widget {
  function __construct(){
    // setup widget with description, name, display width
  }

  function widget($args, $instance){
    // output content of widget, display HTML
    // $args: provide HTML use to display widget title class
  }
  function form($instance){
    // output options form in the admin
    // empty if no options
  }
  function update($new_instance, $old_instance){
    // process widget options to be saved
    // save widget options to db; empty if no options
  }
}

add_action('widgets_init', 'wpdocs_register');

function wpdocs_register(){
  register_widget('My_Widget')
}
```

## example
declare args to create widget

define code that wrap around:
before_title, after_title, before_widget, after_widget


# sidebar
any widgetized area of the theme
user can add their own widgets

```php
register_sidebar(array(
  'name' => ,
  'id' => ,
  'before_widget' => '<aside id="", class="">',
  'after_widget' => '</aside>',
  'before_title' => '<h3 class="widget-title">',
  'after_title' => '</h3>'
))

```
1. create sidebar.php, display using dynamic_sidebar()
2. load theme using get_sidebar()

# navigation
```php
function register_my_menus(){
  register_nav_menus(
    array(
      'header-menu' => __('Header Menu'),
      'extra-menu' => __('Extra Menu')
    )
  );
}
add_action('init', 'register_my_menus')

// display additional content
wp_nav_menu(
  array(
    'menu' => 'primary',
    'theme_location' => '__no_such_location',
    'fallback_cb' => false // not fallback to wp_page_menu
  )
)

```

# pagination
allow user page back and forth through multiple pages

next/prev link: next/previous_posts_link()
numerical: the_posts_pagination()






















