<?php

include 'functions.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if (isset($_GET['manufacturer'])) {
    $selectedManufacturer = $_GET['manufacturer'];
    $selectedManufacturer = $obj->sanitizeInput($selectedManufacturer);

    try {
        $sql = "SELECT `nosaukums` FROM `preces` WHERE `razotajs` = '$selectedManufacturer'";
        $result = $obj->select($sql);

        $data = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row['nosaukums']; // Only store the 'nosaukums' field in the data array
            }
            echo json_encode($data);
        } else {
            echo json_encode(["error" => "No results for the selected manufacturer"]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Manufacturer parameter is missing"]);
}
?>
