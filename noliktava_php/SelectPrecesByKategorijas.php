<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include "db.php"; // Include your database connection file

$db = new DB(); // Create an instance of your DB class to establish a database connection
$conn = $db->conn; // Get the connection object from the DB class

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$selectedKategorijasId = $_GET['id']; // Get the selected Kategorijas ID from the frontend

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare("SELECT * FROM preces WHERE kategorija = ?");
$stmt->bind_param("i", $selectedKategorijasId); // Assuming kategorija is the correct column name

$stmt->execute();
$result = $stmt->get_result();

// Log the executed SQL query
error_log("SQL query executed: SELECT * FROM preces WHERE kategorija = $selectedKategorijasId");

if ($result->num_rows > 0) {
    $preces = array();
    while ($row = $result->fetch_assoc()) {
        $preces[] = $row;
    }
    echo json_encode($preces);
} else {
    // Log when no results are found
    error_log("No results found for Kategorijas ID: $selectedKategorijasId");
    echo json_encode(array()); // Return an empty array if no Preces found for the selected Kategorijas
}

$stmt->close();
$conn->close();
?>