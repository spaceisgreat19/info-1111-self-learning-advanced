<?php
// Include the TCPDF library
require_once __DIR__ . '/vendor/autoload.php'; // Correctly includes the autoload.php file relative to the current directory

// Set CORS headers to allow cross-origin requests from your frontend
header("Access-Control-Allow-Origin: http://localhost:3000"); // Update this if your frontend is hosted elsewhere
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if form data is received via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate the incoming data
    $amount = isset($_POST['amount']) ? filter_var($_POST['amount'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) : '';
    $dueDate = isset($_POST['dueDate']) ? htmlspecialchars($_POST['dueDate']) : '';
    $reason = isset($_POST['reason']) ? htmlspecialchars($_POST['reason']) : '';

    // Check if any fields are empty
    if (empty($amount) || empty($dueDate) || empty($reason)) {
        http_response_code(400); // Bad request if any field is missing
        echo json_encode(['error' => 'Missing required fields.']); // Return as JSON for frontend to handle
        exit;
    }

    // Create a new PDF document
    $pdf = new TCPDF();

    // Set document information
    $pdf->SetTitle('Levy Notice');
    $pdf->AddPage();

    // Set font
    $pdf->SetFont('helvetica', '', 12);

    // Title
    $pdf->Cell(0, 10, 'Levy Notice', 0, 1, 'C');

    // Add content
    $pdf->Ln(10);
    $pdf->Cell(0, 10, "Amount: $" . $amount, 0, 1);
    $pdf->Cell(0, 10, "Due Date: " . $dueDate, 0, 1);
    $pdf->Cell(0, 10, "Reason: " . $reason, 0, 1);

    // Output the PDF to the browser (force download)
    $pdf->Output('levy_notice.pdf', 'D');
}
?>