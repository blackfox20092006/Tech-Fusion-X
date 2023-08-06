<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $email = $_POST['email'];
    $address = $_POST['address'];

    $json_data = file_get_contents('users.json');
    $users = json_decode($json_data, true);

    $new_user = array(
        'id' => count($users) + 1,
        'name' => $name,
        'age' => $age,
        'email' => $email,
        'address' => $address
    );

    $users[] = $new_user;

    file_put_contents('users.json', json_encode($users));

    echo "Thêm người dùng thành công!";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $json_data = file_get_contents('users.json');
    $users = json_decode($json_data, true);

    header('Content-Type: application/json');
    echo json_encode($users);
    exit;
}

?>