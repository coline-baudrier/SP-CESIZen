<?php
require_once '../../database.php';
require_once '../controllers/UserFavoriteActivityController.php';
require_once '../cors-header.php';

try {
    $headers = getallheaders();
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $data = json_decode(file_get_contents("php://input"), true);

    $db = Database::getConnection();
    $controller = new UserFavoriteActivityController($db);
    $result = $controller->addFavorite($token, $data);

    http_response_code(isset($result['error']) ? 400 : 201);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
