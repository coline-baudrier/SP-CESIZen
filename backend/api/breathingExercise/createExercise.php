<?php
require_once '../../database.php';
require_once '../controllers/BreathingExerciseController.php';
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

    if (!$data || !isset($data['name']) || !isset($data['inhale_duration']) || !isset($data['hold_duration']) || !isset($data['exhale_duration'])) {
        http_response_code(400);
        echo json_encode(["error" => "Données incomplètes"]);
        exit;
    }

    $db = Database::getConnection();
    $controller = new BreathingExerciseController($db);
    $result = $controller->createExercise($token, $data);

    http_response_code(isset($result['error']) ? ($result['error'] === "Un exercice avec ce nom existe déjà" ? 409 : 403) : 201);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}
