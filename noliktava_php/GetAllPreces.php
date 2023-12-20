<?php
include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class PrecesManager extends DB {
    public function getAllPreces() {
        $sql = "SELECT * FROM preces";
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

$precesManager = new PrecesManager();

$preces = $precesManager->getAllPreces();

echo json_encode($preces);
?>
