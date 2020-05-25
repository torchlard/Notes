# dynamic terminal title
```sh
case $TERM in
  xterm*)
    precmd () {print -Pn "\e]0;%c\a"}
    ;;
esac
```










