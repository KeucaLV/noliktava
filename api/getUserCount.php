<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include 'classes.php';

$database = new Database();
$userCount = $database->getUserCount();

if ($userCount === false) {
    // Handle query error
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Error fetching user count']);
} else {
    // Success
    echo json_encode(['success' => true, 'count' => $userCount]);
}
?>
