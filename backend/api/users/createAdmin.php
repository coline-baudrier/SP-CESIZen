<?php
require_once '../../database.php';
require_once '../controllers/UserController.php';
require_once '../cors-header.php';

try {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token manquant"]);
        exit;
    }

    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['username']) || !isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(["error" => "Données incomplètes"]);
        exit;
    }

    $db = Database::getConnection();
    $controller = new UserController($db);
    $result = $controller->createAdmin($token, $data);

    http_response_code(isset($result['error']) ? 403 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}
