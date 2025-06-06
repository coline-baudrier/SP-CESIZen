<?php

require_once '../../database.php';
require_once '../controllers/UserFavoriteActivityController.php';
require_once '../cors-header.php';

try {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token manquant"]);
        exit;
    }

    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $db = Database::getConnection();
    $controller = new UserFavoriteActivityController($db);
    $result = $controller->getFavorites($token);

    http_response_code(200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
