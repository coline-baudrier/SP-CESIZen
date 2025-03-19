<?php

require_once '../cors-header.php';
require_once '../../database.php';
require_once '../controllers/EmotionController.php';

try {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token manquant"]);
        exit;
    }
    $token = str_replace('Bearer ', '', $headers['Authorization']);

    $db = Database::getConnection();
    $emotionController = new EmotionController($db);

    // Récupérer les données envoyées en JSON
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id']) || !is_numeric($data['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "ID manquant ou invalide"]);
        exit;
    }
    $id = intval($data['id']);

    $result = $emotionController->changeStatus($token, $data['id']);

    http_response_code(isset($result['error']) ? 400 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
