<?php
require_once '../../database.php';
require_once '../controllers/UserController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

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
