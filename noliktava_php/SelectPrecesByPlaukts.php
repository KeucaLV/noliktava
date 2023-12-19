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

$selectedPlauktsId = $_GET['id']; // Get the selected Plaukts ID from the frontend

// Query to get the available spaces in the selected plaukts
$spacesQuery = "SELECT brivas_vietas FROM plaukts WHERE id = $selectedPlauktsId";
$spacesResult = $conn->query($spacesQuery);

if ($spacesResult->num_rows > 0) {
    $spacesRow = $spacesResult->fetch_assoc();
    $availableSpaces = $spacesRow['brivas_vietas'];

    // Check the available spaces and determine the status
    if ($availableSpaces == 5) {
        $status = "empty";
    } elseif ($availableSpaces == 0) {
        $status = "full";
    } else {
        $status = "has_space";
    }

    // Prepare and execute the query to fetch preces
    $stmt = $conn->prepare("SELECT * FROM preces WHERE plaukts = ?");
    $stmt->bind_param("i", $selectedPlauktsId); // Assuming plaukts is the correct column name and it's of type integer

    $stmt->execute();
    $result = $stmt->get_result();

    // Log the executed SQL query
    error_log("SQL query executed: SELECT * FROM preces WHERE plaukts = $selectedPlauktsId");

    if ($result->num_rows > 0) {
        $preces = array();
        while ($row = $result->fetch_assoc()) {
            $preces[] = $row;
        }
        // Include the status in the response
        echo json_encode(array("status" => $status, "preces" => $preces));
    } else {
        // Log when no results are found
        error_log("No results found for Plaukts ID: $selectedPlauktsId");
        echo json_encode(array("status" => $status, "preces" => array())); // Return an empty array if no Preces found for the selected Plaukts
    }

    $stmt->close();
} else {
    // Log when no spaces result is found
    error_log("No spaces result found for Plaukts ID: $selectedPlauktsId");
    echo json_encode(array("status" => "unknown", "preces" => array())); // Return an unknown status if spaces query fails
}

$conn->close();
?>
