<?php
require_once '../../database.php';
require_once '../controllers/EmotionTrackerController.php';
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

    if (!$data || !isset($data['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "ID requis"]);
        exit;
    }

    $db = Database::getConnection();
    $controller = new EmotionTrackerController($db);
    $result = $controller->updateEmotion($token, $data);

    http_response_code(isset($result['error']) ? 400 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
