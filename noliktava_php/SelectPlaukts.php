<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include "db.php"; // Include your database connection file

$db = new DB(); // Create an instance of your DB class to establish a database connection
$conn = $db->conn; // Get the connection object from the DB class

// Check if the connection is valid before executing queries
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Proceed with your SQL queries using $conn
$sql = "SELECT * FROM plaukts";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $plaukts = array();
    while ($row = $result->fetch_assoc()) {
        $plaukts[] = $row;
    }
    echo json_encode($plaukts);
} else {
    echo json_encode(array()); // Return an empty array if there are no plaukts
}

$conn->close(); // Close the database connection after use
?>