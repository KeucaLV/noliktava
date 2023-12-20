<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db.php";

class GetAllPrecesByID extends DB {
    public function getPrecesByID($id) {
        $sql = "SELECT * FROM preces WHERE id = $id";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $preces = array();
            while ($row = $result->fetch_assoc()) {
                $preces[] = $row;
            }
            return $preces;
        } else {
            return array();
        }
    }
}

$id = $_GET['id'];

$getPreces = new GetAllPrecesByID();
$preces = $getPreces->getPrecesByID($id);

header('Content-Type: application/json');
echo json_encode($preces);
