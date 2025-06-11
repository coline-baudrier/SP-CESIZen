<?php
require_once '../../database.php';
require_once '../controllers/EmotionController.php';
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

    // Vérifier si `base_id` est passé en paramètre GET
    if (!isset($data['id']) || !is_numeric($data['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Paramètre 'id' manquant ou invalide"]);
        exit;
    }
    $id = intval($data['id']);

    // Connexion à la base de données
    $db = Database::getConnection();
    $emotionController = new EmotionController($db);

    // Appel du contrôleur pour récupérer les émotions
    $result = $emotionController->getEmotionById($token, $id);

    // Définition du code HTTP en fonction du résultat
    http_response_code(isset($result['error']) ? 401 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur interne : " . $e->getMessage()]);
}
