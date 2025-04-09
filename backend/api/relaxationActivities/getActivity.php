<?php
require_once '../../database.php';
require_once '../controllers/RelaxationActivityController.php';
require_once '../cors-header.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "ID requis"]);
        exit;
    }

    $db = Database::getConnection();
    $controller = new RelaxationActivityController($db);
    $result = $controller->getActivityById($data['id']);

    http_response_code(isset($result['error']) ? 404 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
