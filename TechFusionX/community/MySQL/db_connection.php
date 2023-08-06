<?php

$servername = " ";
$username = " ";
$password = " ";
$dbname = " ";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

function add_user($name, $age, $email, $address)
{
    global $conn;

    $sql = "INSERT INTO users (name, age, email, address) VALUES ('$name', '$age', '$email', '$address')";
    if ($conn->query($sql) === TRUE) {
        echo "Thêm người dùng thành công";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }
}

function get_all_users()
{
    global $conn;

    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);

    $users = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }
    return $users;
}

function close_connection()
{
    global $conn;
    $conn->close();
}