<?php

try
{
    $connection = new Mongo('mongodb://cs397:cinda@ds041387.mongolab.com:41387/testmongo');
    $database   = $connection->selectDB('testmongo');
    $collection = $database->selectCollection('test');
    $js = "function() {
    return this.OwnerID == " . $_GET['id'] . "}";
    $cursor = $collection->find(array('$where' => $js));

    $results = array();
    foreach ($cursor as $doc) {
        $results[] = $doc;
    }

    echo json_encode($results);


}
catch(MongoConnectionException $e)
{
    die("Failed to connect to database ".$e->getMessage());
}
?>
