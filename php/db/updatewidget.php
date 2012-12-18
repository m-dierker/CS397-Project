<?php

if (array_key_exists("OwnerToken", $_GET) == false) die();

$id = $_GET['id'];

$id_info = json_decode(file_get_contents('https://graph.facebook.com/me/?fields=id&access_token=' . urlencode($_GET['OwnerToken'])));

$ownerID = $id_info->id;

if(!$ownerID) {
    die('Invalid Owner Access token');
}

$dataToInsert = $_GET;
unset($dataToInsert['OwnerToken']);
$dataToInsert['OwnerID'] = $ownerID;

$dataToInsert['update'] = 1;


try
{
    $connection = new Mongo('mongodb://cs397:cinda@ds041387.mongolab.com:41387/testmongo');
    $database   = $connection->selectDB('testmongo');
    $collection = $database->selectCollection('test');
    $mID = new MongoId($id);
    $oldItem = $collection->findOne(array('_id' => $mID));
    foreach($dataToInsert as $name => $value) {
		if ($name !== "id")
		{
			$oldItem[$name] = $value;
		}
	}
    // $oldItem['WidgetType'] = "BusWidget";
    $collection->save($oldItem);
    echo json_encode($oldItem);
}
catch(MongoConnectionException $e)
{
    die("Failed to connect to database ".$e->getMessage());
}
?>
