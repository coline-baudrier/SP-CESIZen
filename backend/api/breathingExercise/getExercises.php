<?php
require_once '../../database.php';
require_once '../controllers/BreathingExerciseController.php';
require_once '../cors-header.php';

try {
    $db = Database::getConnection();
    $controller = new BreathingExerciseController($db);
    $result = $controller->getExercises();

    http_response_code(200);
    echo json_encode($result);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
