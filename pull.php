<?php

/**
 * This script will pull the latest version of the site from GitHub's master branch. To run it, just visit /pull.php - Authentication will be added once I write a PHP class to verify Facebook logins, at which point we'll control it all through that. If there's an error when running the script, email Matthew with the error.
 *
 * If this script runs, and doesn't produce a successful output, the problem is most likely a commandline error it doesn't show. Bug Matthew to SSH in and run git pull to see what's up.
 *
 * Each domain has to be specially configured (PHP 5.3x + CGI, not FastCGI) with Enhanced Security off to run the script. Don't add a domain to this list unless you know what you're doing.
 */
$allowedDomains = array('my.eatcumtd.com');

// Make sure the domain is allowed
if (!in_array($_SERVER['HTTP_HOST'], $allowedDomains)) {
    die('You cannot use the pull script on this URL. Please try again.');
}

$output = null;

// Executes git pull to pull from master
exec("/usr/bin/git pull", $output);

foreach($output as $x) {
    echo $x . "\n<br>\n";
}
