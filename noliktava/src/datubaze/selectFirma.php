<?php

include 'functions.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$sql = "SELECT `razotajs` FROM `preces`";
$result = $obj->select($sql);

$data = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row['razotajs'];
    }
} else {
    echo "0 results";
}

echo json_encode($data);

?>