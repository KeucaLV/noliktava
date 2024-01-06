<?php

require_once('functions.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");  // Set content type to JSON

$dateOrdered = date("d.m.Y");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $rawData = file_get_contents("php://input");
    $cleanData = json_decode($rawData);
    
    $razotajs = htmlspecialchars($cleanData->razotajs);
    $nosaukums = htmlspecialchars($cleanData->nosaukums);
    $daudzums = htmlspecialchars($cleanData->daudzums);
    $month = $cleanData->month;
    $year = $cleanData->year;
    
    if (!empty($razotajs) && !empty($nosaukums) && !empty($daudzums)) {
        // Select the current quantity from the "preces" table
        $selectQuery = "SELECT daudzums FROM `preces` WHERE nosaukums = '$nosaukums'";
        $selectResult = $obj->conn->query($selectQuery);

        if ($selectResult->num_rows > 0) {
            $row = $selectResult->fetch_assoc();
            $currentQuantity = $row['daudzums'];

            // Calculate the new quantity
            $newQuantity = $currentQuantity + $daudzums;

            // Update the "preces" table with the new quantity
            $updateQuery = "UPDATE `preces` SET daudzums = '$newQuantity' WHERE nosaukums = '$nosaukums'";
            $updateResult = $obj->conn->query($updateQuery);

            if ($updateResult) {
                // Insert data into the "pasutit" table
                $insertQuery = "INSERT INTO `pasutit` (razotajs, nosaukums, daudzums, dateOrdered, month, year) VALUES ('$razotajs', '$nosaukums', '$daudzums', '$dateOrdered', '$month', '$year')";
                $insertResult = $obj->conn->query($insertQuery);

                if ($insertResult) {
                    echo json_encode(array("success" => true, "message" => "Data inserted successfully"));
                } else {
                    echo json_encode(array("success" => false, "message" => "Error adding data: " . $obj->conn->error));
                }
            } else {
                echo json_encode(array("success" => false, "message" => "Error updating quantity: " . $obj->conn->error));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "Product not found in the 'preces' table"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "All fields are required"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
?>
