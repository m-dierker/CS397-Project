<?php

function findTimeLeft($data, $washerNumber) {
	$input =  "sans-serif\">                  " . $washerNumber . " ";
	$data = preg_replace("/[\n\r]/","",$data);
	$startingPos = stripos($data, $input); + strlen($input);
	for ($i = 0; $i < 3; $i++) {
		$startingPos = stripos($data, "sans-serif\">", $startingPos) + 13;
	}
	$availableString = strtr(substr($data, $startingPos, 30), " ", "");
	if (stripos($availableString, "In Use")) {
		$startingPos = stripos($data, "sans-serif\">", $startingPos) + 12;
		$availableString = strtr(substr($data, $startingPos, 15), " ", "");
	}
	$availableString = strip_tags($availableString);
	return trim($availableString);
}

function getHallData($hall)
{

	$residenceHalls = array("Allen", "Barton-Lundgren", "Busey-Evans", "Daniels North", "Daniels South", "FAR: Oglesby", "FAR: Trelease", "Forbes", "Garner", "300 South Goodwin", "1107 West Green", "Hopkins", "ISR: Townsend", "ISR: Wardall", "LAR: Leonard", "LAR: Shelden", "Nugent", "PAR: Babcock", "PAR: Blaisdell", "PAR: Carr", "PAR: Saunders", "Scott", "Sherman Short", "Sherman Tall", "Snyder", "TVD: Taft", "TVD: Van Doren", "Weston");

	$hallNumber = 0;

	$hallNumber = array_search($hall, $residenceHalls);

	$fileData = file_get_contents("http://laundryalert.com/cgi-bin/urba7723/LMRoom?XallingPage=LMPage&Halls=" . $hallNumber);

	$fileData = strtr($fileData, "\n", "");

	$totalMachinesArray = array(21, 15, 18, 14, 10, 18, 18, 21, 21, 11, 11, 21, 18, 18, 13, 13, 17, 11 ,9, 9, 10, 16, 9, 12, 21, 10, 10, 21);

	$totalMachines = $totalMachinesArray[$hallNumber];

	$laundryArray = array();

	for ($i = 1; $i <= $totalMachines; $i++) {
		//echo $i . ": " . findTimeLeft($fileData, $i) . "\n\r";
		//echo findTimeLeft($fileData, $i) . "\r\n";
		$laundryArray['Machine ' . $i] = findTimeLeft($fileData, $i);
	}

	return json_encode($laundryArray);
}
?>
