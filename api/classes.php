<?php

class Database {
    private $servername = "localhost";
    private $username = "root";
    private $password = "root";
    private $dbname = "user_management";
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    // Validation for user input
    private function validateUserInput($username, $firstName, $lastName, $phone, $email) {
        $errors = [];

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Invalid email format';
        }

        // Validate other conditions
        if (empty($username)) {
            $errors['username'] = 'Username cannot be empty';
        } elseif (strlen($username) > 12) {
            $errors['username'] = 'Username cannot be longer than 12 characters';
        }

        if (empty($firstName)) {
            $errors['firstName'] = 'First name cannot be empty';
        } elseif (strlen($firstName) > 16) {
            $errors['firstName'] = 'First name cannot be longer than 16 characters';
        }

        if (empty($lastName)) {
            $errors['lastName'] = 'Last name cannot be empty';
        } elseif (strlen($lastName) > 16) {
            $errors['lastName'] = 'Last name cannot be longer than 16 characters';
        }

        if (empty($phone)) {
            $errors['phone'] = 'Phone cannot be empty';
        } elseif (!ctype_digit($phone) || strlen($phone) > 11) {
            $errors['phone'] = 'Invalid phone number';
        }

        return $errors;
    }

    public function insertUser($username, $password, $roleId, $firstName, $lastName, $phone, $email) {
        // Validation
        $errors = $this->validateUserInput($username, $firstName, $lastName, $phone, $email);
    
        // Check for validation errors
        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors];
        }
    
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
        $stmt = $this->conn->prepare("INSERT INTO users (username, password, role_id, first_name, last_name, phone, email) 
                VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssissss", $username, $hashedPassword, $roleId, $firstName, $lastName, $phone, $email);
    
        if ($stmt->execute() === TRUE) {
            return ['success' => true];
        } else {
            return ['success' => false, 'errors' => ['database' => $this->conn->error]];
        }
    }

    public function checkEmailExists($email) {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }

    public function checkPhoneExists($phone) {
        $sql = "SELECT * FROM users WHERE phone = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $phone);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows > 0;
    }

    public function getUsers() {
        $query = "SELECT * FROM users";
        $result = $this->conn->query($query);

        if ($result === false) {
            return false; // Handle query error
        }

        $users = $result->fetch_all(MYSQLI_ASSOC);
        return $users;
    }
    public function promoteDemoteUser($userId, $action, $newRoleId) {
        // Implement the logic to update the user's data in the database
        // Use the $userId, $action, and $newRoleId parameters to update the user's information
        // You can use a prepared statement to perform the database update
    
        $stmt = $this->conn->prepare("UPDATE users SET role_id = ? WHERE id = ?");
        $stmt->bind_param("ii", $newRoleId, $userId);
    
        if ($stmt->execute() === TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function atlaistUser($userId) {
        // Implement the logic to delete the user from the database
        // Use the $userId parameter to identify the user to be dismissed
        // You can use a prepared statement to perform the database deletion

        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bind_param("i", $userId);

        if ($stmt->execute() === TRUE) {
            return true;
        } else {
            return false;
        }
    }

    public function updateUser($userId, $firstName, $lastName, $username, $phone, $email) {
        // Validation
        $errors = $this->validateUserInput($username, $firstName, $lastName, $phone, $email);

        // Check for validation errors
        if (!empty($errors)) {
            return ['success' => false, 'errors' => $errors];
        }

        $stmt = $this->conn->prepare("UPDATE users SET first_name = ?, last_name = ?, username = ?, phone = ?, email = ? WHERE id = ?");
        $stmt->bind_param("sssssi", $firstName, $lastName, $username, $phone, $email, $userId);

        if ($stmt->execute() === TRUE) {
            return ['success' => true];
        } else {
            return ['success' => false, 'errors' => ['database' => $this->conn->error]];
        }
    }

    public function updateUserFields($userId, $updatedFields) {
        try {
            // Validate updated fields
            if (isset($updatedFields['phone'])) {
                $phone = $updatedFields['phone'];
                if (!ctype_digit($phone) || strlen($phone) > 11) {
                    throw new Exception('Invalid phone number');
                }
            }

            // Build the SQL query dynamically based on the provided fields
            $sql = "UPDATE users SET ";
            $params = array();

            foreach ($updatedFields as $fieldName => $fieldValue) {
                // Convert camelCase to snake_case for database column names
                $dbFieldName = $this->camelCaseToSnakeCase($fieldName);
                $sql .= "$dbFieldName = ?, ";
                $params[] = $fieldValue;
            }

            // Remove the trailing comma and space
            $sql = rtrim($sql, ', ');

            // Add the WHERE clause
            $sql .= " WHERE id = ?";
            $params[] = $userId;

            // Prepare and bind parameters
            $stmt = $this->conn->prepare($sql);

            if (!$stmt) {
                throw new Exception("Prepare failed: (" . $this->conn->errno . ") " . $this->conn->error);
            }

            $types = str_repeat('s', count($params) - 1) . 'i'; // Assuming all fields are strings except the last one (userId)
            $stmt->bind_param($types, ...$params);

            if ($stmt->execute()) {
                return ['success' => true];
            } else {
                throw new Exception("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
            }
        } catch (Exception $e) {
            // Log any exceptions that occur during the update
            return ['success' => false, 'errors' => [$e->getMessage()]];
        }
    }

    // Helper function to convert camelCase to snake_case
    private function camelCaseToSnakeCase($input) {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $input));
    }

    public function getLastError() {
        return $this->conn->error;
    }

    public function getUserCount() {
        try {
            // Assuming $this->conn is your mysqli database connection
            $query = "SELECT COUNT(*) as count FROM users";
            $result = $this->conn->query($query);
    
            if ($result === false) {
                // Handle query error
                return 0;
            }
    
            $count = $result->fetch_assoc()['count'];
            return $count;
        } catch (Exception $e) {
            // Handle any exceptions that occur during the count retrieval
            return 0;
        }
    }

    public function searchUsers($searchQuery) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?");
        $searchParam = "%$searchQuery%";
        $stmt->bind_param("ss", $searchParam, $searchParam);
    
        if ($stmt->execute()) {
            $result = $stmt->get_result();
    
            if ($result !== false) {
                $searchResults = $result->fetch_all(MYSQLI_ASSOC);
                return $searchResults;
            } else {
                // Log or echo the error for debugging
                echo "Error fetching search results: " . $stmt->error;
                return false;
            }
        } else {
            // Log or echo the error for debugging
            echo "Query execution error: " . $stmt->error;
            return false;
        }
    }
    public function authenticate($username, $password) {
        // Validate the input
        if (empty($username) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
            return false;
        }
    
        // Check if the user with the given username exists
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows === 0) {
            echo json_encode(['success' => false, 'message' => 'User not found.']);
            return false; // User not found
        }
    
        $user = $result->fetch_assoc();
    
        // Compare the provided password with the stored hashed password
        if (password_verify($password, $user['password'])) {
            // Authentication successful, return the user's role
            echo json_encode(['success' => true, 'role' => $user['role_id']]);
            return $user['role_id'];
        } else {
            echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
            return false; // Incorrect password
        }
    }
    
    
}
?>
