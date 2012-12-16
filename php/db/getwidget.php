<?php

if (array_key_exists("id", $_GET) == false) die();

$id = $_GET['id'];
try
{
    $connection = new Mongo('mongodb://cs397:cinda@ds041387.mongolab.com:41387/testmongo');
    $database   = $connection->selectDB('testmongo');
    $collection = $database->selectCollection('test');
    $mID = new MongoId($id); 
    $oldItem = $collection->findOne(array('_id' => $mID));
    echo json_encode($oldItem);
}
catch(MongoConnectionException $e)
{
    die("Failed to connect to database ".$e->getMessage());
}
?>