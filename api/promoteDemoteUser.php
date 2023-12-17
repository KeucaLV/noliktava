<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'classes.php';
// Add these lines at the beginning of your PHP file
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log received data
file_put_contents('log.txt', json_encode($data) . PHP_EOL, FILE_APPEND);

// Retrieve the JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate and sanitize the data
if ($data === null || empty($data->userId) || empty($data->action) || empty($data->newProfession)) {
    // Handle validation error
    echo json_encode(['success' => false, 'message' => 'Invalid or missing data']);
    exit;
}

$database = new Database();
$result = $database->promoteDemoteUser($data->userId, $data->action, $data->newProfession);

// Assuming you have a function like promoteDemoteUser in your Database class
if ($result) {
    // Success
    echo json_encode(['success' => true, 'message' => 'User promoted/demoted successfully']);
} else {
    // Error
    echo json_encode(['success' => false, 'message' => 'Error promoting/demoting user']);
}

// Add logging
file_put_contents('log.txt', json_encode($_POST) . PHP_EOL, FILE_APPEND);
file_put_contents('log.txt', json_encode($result) . PHP_EOL, FILE_APPEND);
?>
