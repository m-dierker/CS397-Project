<?php
$output = array();
echo exec("git pull", $output);
echo 'Output: ' . print_r($output, true);
