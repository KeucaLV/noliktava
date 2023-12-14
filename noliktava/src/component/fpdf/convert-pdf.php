<?php
#includes the fpdf main libarary
require_once("fpdf.php");

#recieving the form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
    
 
$pdf = new FPDF();
$pdf->AddPage();

$pdf->SetFont('arial','',12);
$pdf->Cell(0,10,"Contact Details",1,1,'C');
$pdf->Cell(40,10,"Name",1,0);
$pdf->Cell(75,10,"Email",1,0);
$pdf->Cell(75,10,"Message",1,0);
$pdf->Ln();

$pdf->Cell(40,10,$name,1,0);
$pdf->Cell(75,10,$email,1,0);
$pdf->Cell(75,10,$message,1,0);

$file = time().'.pdf';
$pdf->output($file,'D');
?>