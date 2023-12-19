<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "db.php"; // Include your database connection file

$db = new DB(); // Create an instance of the DB class to establish a database connection
$conn = $db->conn; // Get the connection object from the DB class

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if the ID parameter is set in the request and the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $id = $_GET['id'];

    // Prepare a delete statement
    $sql = "DELETE FROM preces WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        // Bind the parameter to the statement
        $stmt->bind_param("i", $id);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            $response = array("success" => true, "message" => "Record deleted successfully");
        } else {
            $response = array("success" => false, "message" => "Failed to delete record");
        }

        // Close the statement
        $stmt->close();
    } else {
        $response = array("success" => false, "message" => "Error preparing deletion statement");
    }
} else {
    $response = array("success" => false, "message" => "Invalid request for deletion");
}

// Set the content type to JSON
header('Content-Type: application/json');

// Output the JSON response
echo json_encode($response);

$conn->close();
?>
