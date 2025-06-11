<?php
require_once '../../database.php';
require_once '../controllers/UserController.php';
require_once '../cors-header.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['email']) || !isset($data['new_password'])) {
        http_response_code(400);
        echo json_encode(["error" => "Données incomplètes"]);
        exit;
    }

    $db = Database::getConnection();
    $controller = new UserController($db);
    $result = $controller->changePassword($data['email'], $data['new_password']);

    http_response_code(isset($result['error']) ? 400 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}
