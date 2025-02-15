<?php
require_once '../../database.php';
require_once '../models/User.php';
require_once '../controllers/AuthController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

try {
    $db = Database::getConnection();
    $authController = new AuthController($db);

    $data = json_decode(file_get_contents("php://input"), true);
    echo $authController->login($data);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
