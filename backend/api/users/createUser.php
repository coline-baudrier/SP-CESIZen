<?php
require_once '../../database.php';
require_once '../controllers/AuthController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $db = Database::getConnection();
    $authController = new AuthController($db);

    $data = json_decode(file_get_contents("php://input"), true);
    $result = $authController->register($data);

    http_response_code(isset($result['error']) ? 409 : 201);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}
