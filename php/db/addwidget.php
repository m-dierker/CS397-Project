<?php
if (empty($_GET)) die();

$newJSONString = json_encode($_GET);

$baseElements = array("WidgetType", "OwnerID", "WidgetX", "WidgetY", "WidgetWidth", "WidgetHeight");

for ($i = 0; $i < count($baseElements); $i += 1) {
	if (array_key_exists($baseElements[$i], $_GET) == false) {
		echo "Missing value for " . $baseElements[$i];
		die();
	}
}



try
{
    $connection = new Mongo('mongodb://cs397:cinda@ds041387.mongolab.com:41387/testmongo');
    $database   = $connection->selectDB('testmongo');
    $collection = $database->selectCollection('test');
    $collection->insert($_GET);
    echo json_encode($_GET);
}
catch(MongoConnectionException $e)
{
    die("Failed to connect to database ".$e->getMessage());
}
?>