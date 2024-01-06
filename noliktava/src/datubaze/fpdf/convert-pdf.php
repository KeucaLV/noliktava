<?php
require_once("fpdf.php");
include '../functions.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Assuming the data is sent as JSON in the request body
    $inputData = json_decode(file_get_contents("php://input"), true);

    $selectedMonth = $inputData['month'];
    $selectedYear = $inputData['year'];

    $sql = "SELECT * FROM `pasutit` WHERE `month` = '$selectedMonth' AND `year` = '$selectedYear' ORDER BY 'dateOrdered' ASC";

    $result = $obj->select($sql);

    $data = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    } else {
        echo json_encode(["message" => "0 results"]);
        exit;
    }

    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('arial', 'B', 16);
    $pdf->Cell(0, 5, "Product Details", 0, 1, 'C');
    $pdf->SetFont('arial', '', 12);
    $pdf->Ln();

    $pdf->SetX(25);
    $pdf->SetFont('arial', 'B', 13);
    $pdf->Cell(40, 10, "Brand", 1, 0, 'C');
    $pdf->Cell(40, 10, "Name", 1, 0, 'C');
    $pdf->Cell(40, 10, "Quantity", 1, 0, 'C');
    $pdf->Cell(40, 10, "Date Ordered", 1, 0, 'C');
    $pdf->SetFont('arial', '', 12);
    $pdf->Ln();

    foreach ($data as $row) {
        $brand = $row['razotajs'];
        $name = $row['nosaukums'];
        $quantity = $row['daudzums'];
        $date = $row['dateOrdered'];

        $pdf->SetX(25);

        $pdf->Cell(40, 10, $brand, 1, 0);
        $pdf->Cell(40, 10, $name, 1, 0);
        $pdf->Cell(40, 10, $quantity . ' gab.', 1, 0);
        $pdf->Cell(40, 10, $date, 1, 0);
        $pdf->Ln();
    }

    $file = time() . '.pdf';
    $pdf->Output($file, 'D');
    echo json_encode(["message" => "PDF generated successfully", "file" => $file]);
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>
