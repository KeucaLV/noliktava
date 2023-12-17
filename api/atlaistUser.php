<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'classes.php';

// Retrieve the JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate and sanitize the data
if ($data === null || empty($data->userId)) {
    // Handle validation error
    echo json_encode(['success' => false, 'message' => 'Invalid or missing user ID']);
    exit;
}

$database = new Database();
$result = $database->atlaistUser($data->userId);

// Assuming you have a function like atlaistUser in your Database class
if ($result) {
    // Success
    echo json_encode(['success' => true, 'message' => 'User dismissed successfully']);
} else {
    // Error
    echo json_encode(['success' => false, 'message' => 'Error dismissing user']);
}
?>
