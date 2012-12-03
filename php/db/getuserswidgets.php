<?php

try
{
    $connection = new Mongo('mongodb://cs397:cinda@ds041387.mongolab.com:41387/testmongo');
    $database   = $connection->selectDB('testmongo');
    $collection = $database->selectCollection('test');
    $js = "function() {
    return this.OwnerID == " . $_GET['id'] . "}";
$cursor = $collection->find(array('$where' => $js));
foreach ($cursor as $doc) {
    echo json_encode($doc);
}
}
catch(MongoConnectionException $e)
{
    die("Failed to connect to database ".$e->getMessage());
}
?>