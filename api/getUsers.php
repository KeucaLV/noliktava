<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");
include 'classes.php';

$database = new Database();
$users = $database->getUsers();

if ($users === false) {
    // Handle query error
    echo json_encode(['success' => false, 'message' => 'Error fetching users']);
} else {
    // Success
    echo json_encode(['success' => true, 'users' => $users]);
}
?>
