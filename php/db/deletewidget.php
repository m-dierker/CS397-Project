<?php

if (array_key_exists("id", $_GET) == false) die();

$id = $_GET['id'];
try
{
    $connection = new Mongo('mongodb://cs397:cinda@ds041387.mongolab.com:41387/testmongo');
    $database   = $connection->selectDB('testmongo');
    $collection = $database->selectCollection('test');
    $collection->remove(array('_id' => new MongoId($id)));
    echo "Removed item: " . $id;
}
catch(MongoConnectionException $e)
{
    die("Failed to connect to database ".$e->getMessage());
}
?>
