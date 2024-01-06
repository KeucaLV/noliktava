<?php

require_once('functions.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $preceId = $_POST['preceId'];

    if (isset($preceId)) {
        $sql = "UPDATE `pasutit` SET `status` = 'Received' WHERE `id` = $preceId";

        $result = $obj->conn->query($sql);

        if ($result) {
            $response = ['success' => true];
            echo json_encode($response);
        } else {
            $response = ['success' => false, 'error' => 'Failed to update status', 'details' => $conn->error];
            echo json_encode($response);
        }
    } else {
        $response = ['success' => false, 'error' => 'preceId not set'];
        echo json_encode($response);
    }
}

?>
