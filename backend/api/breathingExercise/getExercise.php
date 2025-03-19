<?php
require_once '../../database.php';
require_once '../controllers/BreathingExerciseController.php';
require_once '../cors-header.php';

try {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "ID requis"]);
        exit;
    }

    $db = Database::getConnection();
    $controller = new BreathingExerciseController($db);
    $result = $controller->getExerciseById($_GET['id']);

    http_response_code(isset($result['error']) ? 404 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
