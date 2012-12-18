<?php
if (empty($_GET)) die();

$newJSONString = json_encode($_GET);

$baseElements = array("WidgetType", "OwnerToken", "WidgetX", "WidgetY", "WidgetWidth", "WidgetHeight");

for ($i = 0; $i < count($baseElements); $i += 1) {
	if (array_key_exists($baseElements[$i], $_GET) == false) {
		echo "Missing value for " . $baseElements[$i];
		die();
	}
}

$id_info = json_decode(file_get_contents('https://graph.facebook.com/me/?fields=id&access_token=' . urlencode($_GET['OwnerToken'])));

$ownerID = $id_info->id;

if(!$ownerID) {
    die('Invalid Owner Access token');
}

$dataToInsert = $_GET;
unset($dataToInsert['OwnerToken']);
$dataToInsert['OwnerID'] = $ownerID;


try
{
    $connection = new Mongo('mongodb://cs397:cinda@ds041387.mongolab.com:41387/testmongo');
    $database   = $connection->selectDB('testmongo');
    $collection = $database->selectCollection('test');
    $collection->insert($dataToInsert);
    echo json_encode($dataToInsert);
}
catch(MongoConnectionException $e)
{
    die("Failed to connect to database ".$e->getMessage());
}
?>
