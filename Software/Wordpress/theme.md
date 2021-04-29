# theme content
index.php
style.css

additional:
- php(include template files), css, graphics, js, localization files
- text file (license, readme)

## theme VS plugin
theme control presentation of content
plugin control behavior and features of site

theme shouldn't add critical functionality


# debug 
enable debug: wp-config.php `define('WP_DEBUG', true)`

WP_DEBUG_LOG: log all error msg to debug.log under /wp-content/
WP_DEBUG_DISPLAY: if debug msg display in HTML of theme page

# existing theme
## Underscores
aim at developer as starter theme

inc/custom-header.php: custom header implementation
inc/template-tags: keep templates organized and prevent code duplication
js/keyboard-image-navigation: improve keyboard navigation
/layouts: starter CSS

## Twenties
default theme

# template-tag
retrieve content from database, eg. blog title, complete sidebar

- print dynamic content
- use in multiple theme file
- separate theme into smaller sections

## components
- PHP code tag
- WordPress function
- optional parameters

get_header(): get header.php
get_footer(): get footer.php
the_title(): get title of page/post
bloginfo('name')


# Loop
how many post retrieved determined by num of posts to show per page in setting

extracts data foreach post in db
- insert appropriate info in place of each template tag

## usage
display post titles and excerpts blog's homepage
display content and comments on single post
display content on individual page using template tag
display data from Custom Post Type and Custom Fields

```php
<?php
if(have_posts()):
  while(have_posts()): the_post();
  endwhile;
endif;
?>
```

next_post_link()
the_<xxx>()
=> category, author, content, excerpt, ID, meta
=> 

## conditional tag
home,admin,single,page
is_<xxx>(.)


# Theme Functions
functions.php: add unique features to WordPress theme

behaves like WordPress plugion, add features and functionality to WordPress site

## plugin
- require specific, unique header text
- stored in wp-content/plugins
- execute on page load
- apply to all theme

## function.php
- no unique header text
- subdir in wp-content/themes
- apply only to that theme
- have numerous blocks of code for many different purpose

each theme/child theme has own functions file
function in form `<theme_name>_<fn_name>` as namespace

## navigation menu
```php
register_nav_menus(array(
  'primary' => __('Primary Menu', 'myfirstheme'),
  'secondary' => __('Secondary Menu', 'myfirstheme')
))
```

## load text domain
translate into multiple language
`load_theme_textdomain`

## post thumbnail
allow user choose image to represent their post

## post format
allow user format their post in different ways based on content of post

## content width
make sure no content break container of the site

## other features
custom header
sidebar
custom background
add editor styles
html5
title tag












