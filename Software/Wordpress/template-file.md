# template files
php files mix HTML, template tags, PHP code
eg. header.php => header, comments.php => comments

page template: apply only to pages to change look
- apply to single page, page section, class of pages

template tags: built-in WordPress functions use inside template file

## template file hierarchy
http://example.com/blog/category/your-cat/
->
1. look for template file in current theme's directory
  - if slug is 'unicorn' -> search category-unicorns.php
2. if id = 4 => category-4.php
3. category.php (generic category template file)
4. archive.php (generic archive)
5. index.php (main theme)

## front page display
front-page.php
home.php (your latest post) / page.php (front page)
index.php

## privacy policy page
privacy-policy.php
custom template file
page-{slug}.php
page-{id}.php
page.php
singular.php
index.php

## single post
single-{post-type}-{slug}.php
single-{post-type}.php
single.php
singular.php
index.php

## single page
custom template (assigned to the page)
page-{slug}.php
page-{id}.php
page.php
singular.php
index.php

## category
category-{slug}.php
category-{id}.php
category.php
archive.php
index.php

## tag
tag-{slug}.php
tag-{id}.php
tag.php
archive.php
index.php

## custom taxonomies
taxonomy-{taxonomy}-{term}.php
taxonomy-{taxonomy}.php
taxonomy.php
archive.php
index.php

## custom post type
archive-{post_type}
archive.php
index.php

## author display
author-{nicename}.php
author-{id}.php
author.php
archive.php
index.php

## date
date.php
archive.php
index.php

## search result
serach.php
index.php

## 404 
404.php
index.php

## attachment
{mime-type}.php
attachment.php
single-attachment-{slug}.php
single-attachment.php
single.php
singular.php
index.php

## embeds
embed-{post-type}-{post_format}.php
embed-{post-type}.php
embed.php
wp-includes/theme-compat/embed.php


## filter hierarchy
embed
404
search
frontpage
