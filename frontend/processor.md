# pre-processor
eg. SASS, SCSS, less
translate script to standard CSS

# post-processor
eg. CSS Prefixer
add prefix automatically to target all browsers

other sciprt ---preprocessor--> CSS ---postprocessor--> modified CSS
## adv
- can write your own plugin, not restricted by processor's rule
- use standard CSS syntax

## postcss
tool for transforming CSS with JS plugin, plugin can support variables and mixins, 
traspile future pure CSS syntax, inline images...

CSS -> CSS Parser -> plugin system -> stringifier -> final CSS
[sth similar to webpack] postcss is a platform

# CSS polyfill









