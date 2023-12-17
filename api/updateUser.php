<?php
// Log received data
error_log('Received data: ' . print_r($_POST, true));

// Handle CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE");
header("Content-Type: application/json");

// Include your class definition
require_once('classes.php');

// Create a new Database instance
$database = new Database();

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON data
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if required fields are set
    if (isset($data['userId'], $data['updatedFields'])) {
        $userId = $data['userId'];
        $updatedFields = $data['updatedFields'];

        // Log SQL query
        $sql = "UPDATE users SET ";
        $params = [];

        foreach ($updatedFields as $fieldName => $fieldValue) {
            $sql .= "`$fieldName` = ?, ";
            $params[] = $fieldValue;
        }

        // Remove the trailing comma and space
        $sql = rtrim($sql, ', ');

        // Add the WHERE clause
        $sql .= " WHERE id = ?";
        $params[] = $userId;

        // Perform the update operation
        $result = $database->updateUserFields($userId, $updatedFields);

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'User data updated successfully']);
        } else {
            // Log error message and SQL query if possible
            $error = $database->getLastError(); // Add this line to get the last MySQL error

            error_log('Error updating user data. SQL: ' . $sql . '. MySQL Error: ' . $error);

            // Provide additional details in the response for debugging
            echo json_encode([
                'success' => false,
                'message' => 'Error updating user data. Check PHP error logs.',
                'sql' => $sql,
                'mysql_error' => $error
            ]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
