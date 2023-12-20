<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Define sorting options available
$sortOptions = [
    "Nosaukums ascending" => "nosaukums ASC",
    "Nosaukums descending" => "nosaukums DESC",
    "Ražotājs ascending" => "razotajs ASC",
    "Ražotājs descending" => "razotajs DESC"
];

echo json_encode($sortOptions);
?>