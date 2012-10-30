<?php
function findLaundry($data, $residenceHall, $iteration) {
	$input = "f\">" . $residenceHall;
	$startingPos = stripos($data, "sans-serif\">", stripos($data, $input)) + 13;	
	for ($i = 0; $i < $iteration; $i++) {
		$startingPos = stripos($data, "sans-serif\">", $startingPos) + 13;
	}
	$availableString = strtr(substr($data, $startingPos, 4), " ", "");
	return trim($availableString);
}


function findAvailableWashers($data, $residenceHall) {
	return findLaundry($data, $residenceHall, 0);
}

function findAvailableDryers($data, $residenceHall) {
	return findLaundry($data, $residenceHall, 1);
}

function findUsedWashers($data, $residenceHall) {
	return findLaundry($data, $residenceHall, 2);
}

function findUsedDryers($data, $residenceHall) {
	return findLaundry($data, $residenceHall, 3);
}
?>
