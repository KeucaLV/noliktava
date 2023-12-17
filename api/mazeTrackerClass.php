<?php

// Allow requests from your React application
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class MazeTrackerAPI
{
    private $conn;

    public function __construct($dbHost, $dbUser, $dbPassword, $dbName)
    {
        $this->conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function closeConnection()
    {
        $this->conn->close();
    }

    public function sendJsonResponse($data)
    {
        echo json_encode($data);
    }

    public function getIekrajumi()
    {
        $sql = "SELECT * FROM iekrajumi";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $iekrajumi = [];
            while ($row = $result->fetch_assoc()) {
                $iekrajumi[] = $row;
            }
            $this->sendJsonResponse($iekrajumi);
        } else {
            $this->sendJsonResponse(["message" => "No iekrajumi found."]);
        }
    }
    
    public function getReportCard($userId)
    {
        $sql = "SELECT * FROM report_card WHERE user_id = " . $userId;
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $reportCard = [];
            while ($row = $result->fetch_assoc()) {
                $reportCard[] = $row;
            }
            return $reportCard;
        } else {
            return ["message" => "No reports found for the specified user."];
        }
    }
    
    public function addValueToGoal($goalId, $value)
    {
        // Validate inputs
        if (!is_numeric($goalId) || !is_numeric($value)) {
            $this->sendJsonResponse(["error" => "Invalid goal ID or value."]);
            return;
        }

        $sql = "UPDATE iekrajumi SET iekrajumu_iekrajumi = iekrajumu_iekrajumi + $value WHERE iekrajumu_id = $goalId";
        if ($this->conn->query($sql) === TRUE) {
            $this->sendJsonResponse(["message" => "Value added successfully."]);
        } else {
            $this->sendJsonResponse(["error" => $this->conn->error]);
        }
    }
    public function insertReportData($userId, $month, $income, $outcome, $goalsCompleted, $spentOnFood, $spentOnTransport, $spentOnRent, $spentOnUtilities, $spentOnMisc)
    {
        // Validate inputs (make sure they are numeric or safe to insert)
        if (!is_numeric($userId) || !is_numeric($income) || !is_numeric($outcome) || !is_numeric($goalsCompleted) ||
            !is_numeric($spentOnFood) || !is_numeric($spentOnTransport) || !is_numeric($spentOnRent) ||
            !is_numeric($spentOnUtilities) || !is_numeric($spentOnMisc)) {
            $this->sendJsonResponse(["error" => "Invalid input values."]);
            return;
        }

        // Escape and quote the non-numeric inputs to prevent SQL injection
        $userId = $this->conn->real_escape_string($userId);
        $month = $this->conn->real_escape_string($month);
        $goalsCompleted = $this->conn->real_escape_string($goalsCompleted);

        // Create the SQL query for insertion
        $sql = "INSERT INTO report_card (user_id, month, income, outcome, goals_completed, spent_on_food, spent_on_transport, spent_on_rent, spent_on_utilities, spent_on_misc) ";
        $sql .= "VALUES ('$userId', '$month', $income, $outcome, $goalsCompleted, $spentOnFood, $spentOnTransport, $spentOnRent, $spentOnUtilities, $spentOnMisc)";

        // Execute the SQL query
        if ($this->conn->query($sql) === TRUE) {
            $this->sendJsonResponse(["message" => "Data inserted successfully."]);
        } else {
            $this->sendJsonResponse(["error" => $this->conn->error]);
        }
    }


    public function updateStatus($goalId){
        $sql = "UPDATE iekrajumi SET status = 'completed' WHERE iekrajumu_id = $goalId";
        if ($this->conn->query($sql) === TRUE) {
            $this->sendJsonResponse(["message" => "Goal completed"]);
        } else {
            $this->sendJsonResponse(["error" => $this->conn->error]);
        }
    }
}
