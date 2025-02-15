<?php
require_once '../../database.php';
require_once '../controllers/EmotionController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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
    if (!isset($data['base_id']) || !is_numeric($data['base_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Paramètre 'base_id' manquant ou invalide"]);
        exit;
    }
    $base_id = intval($data['base_id']);

    // Connexion à la base de données
    $db = Database::getConnection();
    $emotionController = new EmotionController($db);

    // Appel du contrôleur pour récupérer les émotions
    $result = $emotionController->getEmotionsByBase($token, $base_id);

    // Définition du code HTTP en fonction du résultat
    http_response_code(isset($result['error']) ? 401 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur interne : " . $e->getMessage()]);
}
