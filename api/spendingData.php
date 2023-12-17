<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require('mazeTrackerClass.php');

$dbHost = 'localhost';
$dbUser = 'root';
$dbPassword = 'root';
$dbName = 'MazeTracker';

$api = new MazeTrackerAPI($dbHost, $dbUser, $dbPassword, $dbName);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve spending data
    $spendingData = $api->getSpendingData(); // Implement this function

    // Send the spending data as a JSON response
    $api->sendJsonResponse($spendingData);
}

$api->closeConnection();
?>
