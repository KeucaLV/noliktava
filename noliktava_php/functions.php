<?php

include 'db.php';

class Functions extends DB
{
    function __construct()
    {
        parent::__construct();
    }

    function sanitizeInput($input)
    {
        return mysqli_real_escape_string($this->conn, $input);
    }

    function select($sql)
    {
        $results = $this->conn->query($sql);
        if ($results->num_rows > 0) {
            return $results;
        } else {
            return False;
        }
    }
}

$obj = new Functions;
