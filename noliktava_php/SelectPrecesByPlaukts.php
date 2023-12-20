<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include "db.php";

$db = new DB();
$conn = $db->conn;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$selectedPlauktsId = $_GET['id'];

$spacesQuery = "SELECT brivas_vietas FROM plaukts WHERE id = $selectedPlauktsId";
$spacesResult = $conn->query($spacesQuery);

if ($spacesResult->num_rows > 0) {
    $spacesRow = $spacesResult->fetch_assoc();
    $availableSpaces = $spacesRow['brivas_vietas'];

    if ($availableSpaces == 5) {
        $status = "empty";
    } elseif ($availableSpaces == 0) {
        $status = "full";
    } else {
        $status = "has_space";
    }

    $stmt = $conn->prepare("SELECT * FROM preces WHERE plaukts = ?");
    $stmt->bind_param("i", $selectedPlauktsId);

    $stmt->execute();
    $result = $stmt->get_result();

    error_log("SQL query executed: SELECT * FROM preces WHERE plaukts = $selectedPlauktsId");

    if ($result->num_rows > 0) {
        $preces = array();
        while ($row = $result->fetch_assoc()) {
            $preces[] = $row;
        }
        echo json_encode(array("status" => $status, "preces" => $preces));
    } else {
        error_log("No results found for Plaukts ID: $selectedPlauktsId");
        echo json_encode(array("status" => $status, "preces" => array()));
    }

    $stmt->close();
} else {
    error_log("No spaces result found for Plaukts ID: $selectedPlauktsId");
    echo json_encode(array("status" => "unknown", "preces" => array()));
}

$conn->close();
?>