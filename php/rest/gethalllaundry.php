<?php

include 'laundrylibrary.php';

$hall = "";

$hall = $_GET["hall"];

header('Content-Type: application/json');

echo getHallData($hall);


?>
