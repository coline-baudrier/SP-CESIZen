<?php
require_once '../../database.php';
require_once '../controllers/AuthController.php';
require_once '../cors-header.php';

try {
    $db = Database::getConnection();
    $authController = new AuthController($db);

    // Vérifie si la requête contient du JSON valide
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(["error" => "Format JSON invalide"]);
        exit();
    }

    $result = $authController->login($data);

    // Retourne un code 200 si OK, sinon 401
    http_response_code(isset($result['error']) ? 401 : 200);
    echo json_encode($result);

} catch (Exception $e) {
    error_log("Erreur serveur: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur interne"]);
}
