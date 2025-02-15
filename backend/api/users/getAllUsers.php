<?php
require_once '../../database.php';
require_once '../controllers/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

try {
    $db = Database::getConnection();
    $userController = new UserController($db);

    $result = $userController->getUsers();

    http_response_code(isset($result['error']) ? 401 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
