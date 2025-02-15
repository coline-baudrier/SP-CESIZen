<?php
require_once '../../database.php';
require_once '../controllers/BreathingExerciseController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

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
