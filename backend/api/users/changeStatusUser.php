<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PATCH");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../../database.php';
require_once '../controllers/UserController.php';

try {
    $db = Database::getConnection();
    $userController = new UserController($db);

    // Récupérer les données envoyées en JSON
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['user_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "L'ID de l'utilisateur est requis"]);
        exit;
    }

    $result = $userController->changeStatus($data['user_id']);

    http_response_code(isset($result['error']) ? 400 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
