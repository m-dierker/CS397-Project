<?php

$output = null;

// Executes git pull to pull from master
exec("/usr/bin/git pull", $output);

foreach($output as $x) {
    echo $x . "\n";
}
