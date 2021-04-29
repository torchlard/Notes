<?php

// arg: $tag, $values
// call callback function that have been added to a filter hook, name specified in $tag

function ex_callback($string, $arg1, $arg2) {
  return $string;
}

add_filter('example_filter', 'ex_callback', 10, 3);

// $arg1, $arg2 are additional args to callback
$value = apply_filter('example_filter', 'filter me', $arg1, $arg2)












?>





















