<?php
// searchUsers.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'classes.php';

$database = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the search query from the request body
    $requestData = json_decode(file_get_contents("php://input"), true);
    $searchQuery = isset($requestData['searchQuery']) ? $requestData['searchQuery'] : '';

    // Validate and sanitize the search query if needed
    // ...

    // Perform the search using a method in your Database class
    $searchResults = $database->searchUsers($searchQuery);

    if ($searchResults !== false) {
        echo json_encode(['success' => true, 'users' => $searchResults]);
    } else {
        $errorDetails = $database->getLastError(); // Assuming you have a getLastError method in your Database class
        echo json_encode(['success' => false, 'message' => 'Error searching users', 'errorDetails' => $errorDetails]);
        // Log detailed error information if needed
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    // Log that an invalid request method was received
}
?>
