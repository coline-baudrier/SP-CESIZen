<?php
require_once '../../database.php';
require_once '../controllers/RelaxationActivityController.php';
require_once '../cors-header.php';

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
