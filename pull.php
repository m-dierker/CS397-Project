<?php

/**
 * This script will pull the latest version of the site from GitHub's master branch. To run it, just visit /pull.php - Authentication will be added once I write a PHP class to verify FB logins, at which point we'll control it all through that. If there's an error when running the script, email Matthew with the error.
 */

$output = null;

// Executes git pull to pull from master
exec("/usr/bin/git pull", $output);

foreach($output as $x) {
    echo $x . "\n";
}
