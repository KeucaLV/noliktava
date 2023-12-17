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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reportCardData = $api->insertReportData($userId, $month, $income, $outcome, $goalsCompleted, $spentOnFood, $spentOnTransport, $spentOnRent, $spentOnUtilities, $spentOnMisc);

}


$api->closeConnection();
?>
