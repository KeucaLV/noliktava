<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include the classes file
include_once(__DIR__ . '/classes.php');

// Initialize Database class
$database = new Database();

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

// Handle login request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assuming you're using JSON for your POST requests
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['username']) && isset($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        try {
            $authenticated = $database->authenticate($username, $password);

            if ($authenticated) {
                // Start a session and store user role
                session_start();
                $_SESSION['role'] = $database->getUserRole($username); // Adjust this based on your database structure

                echo json_encode(['success' => true, 'role' => $_SESSION['role']]);
                exit;
            } else {
                http_response_code(401); // Unauthorized
                echo json_encode(['success' => false, 'message' => 'Authentication failed']);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Internal server error: ' . $e->getMessage()]);
            exit;
        }
    }
}

http_response_code(400); // Bad Request
echo json_encode(['success' => false, 'message' => 'Invalid request']);
exit;
?>
