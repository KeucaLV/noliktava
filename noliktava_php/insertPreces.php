<?php
require_once('functions.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");  // Set content type to JSON

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $rawData = file_get_contents("php://input");
    $cleanData = json_decode($rawData);
    
    $nosaukums = htmlspecialchars($cleanData->nosaukums);
    $razotajs = htmlspecialchars($cleanData->razotajs);
    $apraksts = htmlspecialchars($cleanData->apraksts);
    $kategorija = htmlspecialchars($cleanData->kategorija);
    $cena = htmlspecialchars($cleanData->cena);
    $image = htmlspecialchars($cleanData->image);
    $daudzums = htmlspecialchars($cleanData->daudzums);

    if (!empty($nosaukums) && !empty($razotajs) && !empty($apraksts) && !empty($kategorija) && !empty($cena) && !empty($daudzums)) {
        $sql = "INSERT INTO `preces` (nosaukums, razotajs, apraksts, kategorija, image, daudzums, cena) VALUES ('$nosaukums', '$razotajs', '$apraksts', '$kategorija', '$image', '$daudzums',  '$cena')";
        $result = $obj->conn->query($sql);

        if ($result) {
            echo json_encode(array("success" => true, "message" => "Data inserted successfully"));
        } else {
            echo json_encode(array("success" => false, "message" => "Error adding data: " . $obj->conn->error));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "All fields are required"));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
?>
