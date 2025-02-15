<?php
require_once '../../database.php';
require_once '../controllers/RelaxationActivityController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

try {
    $db = Database::getConnection();
    $controller = new RelaxationActivityController($db);
    $result = $controller->getAllActivities();

    http_response_code(200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
