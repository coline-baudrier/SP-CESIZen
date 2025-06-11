<?php
require_once '../../database.php';
require_once '../controllers/StressTestController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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

    if (!$data || !isset($data['test_id']) || !isset($data['score'])) {
        http_response_code(400);
        echo json_encode(["error" => "Données incomplètes"]);
        exit;
    }

    $db = Database::getConnection();
    $controller = new StressTestController($db);
    $result = $controller->submitTest($token, $data);

    http_response_code(isset($result['error']) ? 401 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}
