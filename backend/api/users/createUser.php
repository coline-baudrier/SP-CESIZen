<?php

require_once '../../database.php';
require_once '../models/User.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

try {
    $db = Database::getConnection();
    $userModel = new User($db);

    // Récupérer les données envoyées en JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Vérifier si les données sont bien présentes
    if (!isset($data['username'], $data['email'], $data['password'])) {
        http_response_code(400);
        echo json_encode(["error" => "Données incomplètes"]);
        exit;
    }

    // Vérifier si l'email est déjà utilisé
    if ($userModel->getUserByEmail($data['email'])) {
        http_response_code(409);
        echo json_encode(["error" => "Email déjà utilisé"]);
        exit;
    }

    // Vérifier si le username est déjà utilisé
    if ($userModel->getUserByUsername($data['username'])) {
        http_response_code(409);
        echo json_encode(["error" => "Username déjà pris"]);
        exit;
    }

    // Créer l'utilisateur
    $success = $userModel->create($data['username'], $data['email'], $data['password']);

    if ($success) {
        http_response_code(201);
        echo json_encode(["message" => "Utilisateur créé"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Erreur lors de la création de l'utilisateur"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
