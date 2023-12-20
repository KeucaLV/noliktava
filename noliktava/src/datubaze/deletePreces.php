<?php

require_once('functions.php');

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, OPTIONS"); 


if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode("Task ID is missing in the request.");
        exit();
    }

    $taskId = $_GET['id'];

    $sql = "DELETE FROM `preces` WHERE id = '$taskId'";
    $result = $obj->conn->query($sql);

    if ($result) {
        echo json_encode("Task deleted successfully");
    } else {
        http_response_code(500);
        echo json_encode("Error deleting task");
    }
}
?>