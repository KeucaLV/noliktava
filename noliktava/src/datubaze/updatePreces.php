<?php

require_once('functions.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    // Check if the product ID is provided in the request
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(array("status" => "error", "message" => "Product ID is missing in the request."));
        exit();
    }

    $productId = $_GET['id'];

    // Get the raw data from the request body
    $rawData = file_get_contents("php://input");
    $cleanData = json_decode($rawData);

    // Sanitize the input data
    $nosaukums = htmlspecialchars($cleanData->nosaukums);
    $daudzums = htmlspecialchars($cleanData->daudzums);
    $cena = htmlspecialchars($cleanData->cena);

    // Prepare and execute the SQL query to update the product
    $sql = "UPDATE `preces` SET `nosaukums`='$nosaukums', `daudzums`='$daudzums', `cena`='$cena' WHERE id = '$productId'";
    
    $result = $obj->conn->query($sql);

    // Check the result of the query and return the appropriate response
    if ($result) {
        echo json_encode(array("status" => "success", "message" => "Product updated successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("status" => "error", "message" => "Error updating product"));
    }
}

?>
