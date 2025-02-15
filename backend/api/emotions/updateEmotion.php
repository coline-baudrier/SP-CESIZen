<?php
require_once '../../database.php';
require_once '../controllers/EmotionController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id']) || !is_numeric($data['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "ID manquant ou invalide"]);
        exit;
    }
    $id = intval($data['id']);

    $result = $emotionController->updateEmotion($token, $id, $data);

    http_response_code(isset($result['error']) ? 409 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur interne : " . $e->getMessage()]);
}
