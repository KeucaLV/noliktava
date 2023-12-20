<?php
require_once('vendor/autoload.php');

// Create PDF instance
$pdf = new TCPDF();

// Add a page
$pdf->AddPage();

// Set font
$pdf->SetFont('Arial', 'B', 16);

// Add some content
$pdf->Cell(40, 10, 'Hello, World!');

// Output the PDF to a file
$pdf->Output('output.pdf', 'F');

echo 'PDF generated successfully.';

?>