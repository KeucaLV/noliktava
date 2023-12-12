<?php

require('fpdf.php');

class PDF extends FPDF
{
function Header()
{
    global $title;

    // Arial bold 15
    $this->SetFont('Arial','B',15);
    // Calculate width of title and position
    $w = $this->GetStringWidth($title)+6;
    $this->SetX((210-$w)/2);
    // Colors of frame, background and text
    $this->SetDrawColor(255, 255, 255);
    $this->SetFillColor(255, 255, 255);
    $this->SetTextColor(0, 0, 0);
    // Thickness of frame (1 mm)
    $this->SetLineWidth(1);
    // Title
    $this->Cell($w,9,$title,1,1,'C',true);
    // Line break
    $this->Ln(10);
}

function Footer()
{
    // Position at 1.5 cm from bottom
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Text color in gray
    $this->SetTextColor(128);
    // Page number
    $this->Cell(0,10,'Page '.$this->PageNo(),0,0,'C');
}

function ChapterTitle()
{
    // Arial 12
    $this->SetFont('Arial','',12);
    // Background color
    $this->SetFillColor(255, 255, 255);
    // Title
    // $this->Cell(0,6,"Chapter $num : $label",0,1,'L',true);
    // Line break
    $this->Ln(4);
}

function ChapterBody($file)
{
    // Read text file
    $txt = file_get_contents($file);
    // Times 12
    $this->SetFont('Times','',12);
    // Output justified text
    $this->MultiCell(0,5,$txt);
    // Line break
    $this->Ln();
    // Mention in italics
    $this->SetFont('','I');
    $this->Cell(0,5);
}

function PrintChapter($file, $link)
{
    $this->AddPage();
    $this->ChapterBody($file);
    $this->addLink($link);
}
}

$pdf = new PDF();
$title = 'Fortnite';
$contents = "content.html";
$pdf->SetTitle($title);
$pdf->SetAuthor('Jules Verne');
$pdf->WriteHTML($contents);
$pdf->PrintChapter('20k_c1.txt', 'https://docs.google.com/document/d/1YCvMRGlTVc4_De7XoYXOjhJTbg3OhUoe4FfRTI6liiE/edit');
$pdf->Output();
?>