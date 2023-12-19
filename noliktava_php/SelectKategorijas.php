<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests only from your React app's domain
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include "db.php"; // Include your DB class file

$db = new DB(); // Create an instance of your DB class to establish a database connection
$conn = $db->conn; // Get the connection object from the DB class

// Check if the connection is valid before executing queries
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Proceed with your SQL queries using $conn
$sql = "SELECT * FROM kategorijas";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $categories = array();
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    echo json_encode($categories);
} else {
    echo json_encode(array()); // Return an empty array if there are no categories
}

$conn->close(); // Close the database connection after use
?>