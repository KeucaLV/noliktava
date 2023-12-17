<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include 'classes.php';

$database = new Database();

// Retrieve the JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Validate and sanitize the data
if ($data === null ||
    empty($data->username) ||
    empty($data->password) ||
    empty($data->profession) ||
    empty($data->firstName) ||
    empty($data->lastName) ||
    empty($data->phone) ||
    empty($data->email) ||
    !filter_var($data->email, FILTER_VALIDATE_EMAIL)
) {
    // Handle validation error
    echo json_encode(['success' => false, 'message' => 'Invalid or missing data. Please provide all required fields.']);
    exit;
}

// Check if the email already exists
if ($database->checkEmailExists($data->email)) {
    echo json_encode(['success' => false, 'message' => 'Email already exists. Please use a different email.']);
    exit;
}

// Check if the phone number already exists
if ($database->checkPhoneExists($data->phone)) {
    echo json_encode(['success' => false, 'message' => 'Phone number already exists. Please use a different phone number.']);
    exit;
}

// Insert the user data into the database
$result = $database->insertUser(
    $data->username,
    $data->password,
    $data->profession,
    $data->firstName,
    $data->lastName,
    $data->phone,
    $data->email
);

if ($result) {
    // Success
    echo json_encode(['success' => true, 'message' => 'User added successfully']);
} else {
    // Error
    echo json_encode(['success' => false, 'message' => 'Error adding user to the database. Please try again later.']);
}
?>
