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

// Check if searchTerm is provided in the GET request
if (isset($_GET['searchTerm'])) {
    $searchTerm = $_GET['searchTerm'];

    // Proceed with your SQL queries using $conn and $searchTerm
    $sql = "SELECT * FROM preces WHERE nosaukums LIKE '%$searchTerm%' OR razotajs LIKE '%$searchTerm%'"; // Example search query, modify as needed
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $preces = array();
        while ($row = $result->fetch_assoc()) {
            $preces[] = $row;
        }
        echo json_encode($preces);
    } else {
        echo json_encode(array()); // Return an empty array if there are no matching preces
    }
} else {
    echo json_encode(array()); // Return an empty array if searchTerm is not provided
}

$conn->close(); // Close the database connection after use
?>
