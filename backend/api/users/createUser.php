<?php
require_once '../../database.php';
require_once '../controllers/AuthController.php';
require_once '../cors-header.php';

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
