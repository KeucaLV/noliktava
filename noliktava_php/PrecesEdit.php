<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "db.php";

// Create an instance of the DB class to establish a database connection
$db = new DB();
$conn = $db->conn;

// Now you can use $conn in the rest of your code
// For example:
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if $conn is valid before proceeding with the database operations
    if ($conn && !empty($data['id']) && !empty($data['daudzums']) && !empty($data['plaukts'])) {
        $id = $data['id'];
        $newDaudzums = $data['daudzums'];
        $newPlaukts = $data['plaukts'];

        $updateSql = "UPDATE preces SET daudzums = '$newDaudzums', plaukts = '$newPlaukts' WHERE id = $id";

        $result = $conn->query($updateSql);

        if ($result) {
            $response = array('success' => true, 'message' => 'Item updated successfully');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Failed to update item');
            echo json_encode($response);
        }
    } else {
        $response = array('success' => false, 'message' => 'Invalid data received');
        echo json_encode($response);
    }
} else {
    $response = array('success' => false, 'message' => 'Invalid request method');
    echo json_encode($response);
}
?>
