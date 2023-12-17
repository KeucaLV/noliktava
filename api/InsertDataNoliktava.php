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
    if (isset($_GET['userId'])) {
        $userId = $_GET['userId'];
        $reportCardData = $api->getReportCard($userId);
        $api->sendJsonResponse($reportCardData);
    } else {
        $api->sendJsonResponse(["message" => "Missing 'userId' parameter."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request for data insertion
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if the data includes necessary fields (e.g., month, income, etc.)
    if (isset($data['month'], $data['income'], $data['outcome'], $data['goalsCompleted'], $data['spentOnFood'], $data['spentOnTransport'], $data['spentOnRent'], $data['spentOnUtilities'], $data['spentOnMisc'])) {
        $month = $data['month'];
        $income = $data['income'];
        $outcome = $data['outcome'];
        $goalsCompleted = $data['goalsCompleted'];
        $spentOnFood = $data['spentOnFood'];
        $spentOnTransport = $data['spentOnTransport'];
        $spentOnRent = $data['spentOnRent'];
        $spentOnUtilities = $data['spentOnUtilities'];
        $spentOnMisc = $data['spentOnMisc'];

        // Insert data into the database
        $api->insertReportData(1, $month, $income, $outcome, $goalsCompleted, $spentOnFood, $spentOnTransport, $spentOnRent, $spentOnUtilities, $spentOnMisc);
    } else {
        $api->sendJsonResponse(["error" => "Missing or incomplete data for insertion."]);
    }
}

$api->closeConnection();
?>
