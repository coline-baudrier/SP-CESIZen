<?php

require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;

class AuthController
{
    private $userModel;

    public function __construct($db)
    {
        $this->userModel = new User($db);
    }

    public function register($data)
    {
        if (!isset($data['username'], $data['email'], $data['password'])) {
            return json_encode(["error" => "Données incomplètes"]);
        }

        if ($this->userModel->getUserByEmail($data['email'])) {
            return json_encode(["error" => "Email déjà utilisé"]);
        }

        $success = $this->userModel->create($data['username'], $data['email'], $data['password']);

        return json_encode($success ? ["message" => "Utilisateur créé"] : ["error" => "Erreur lors de l'inscription"]);
    }

    public function login($data)
    {
        if (!isset($data['email'], $data['password'])) {
            return json_encode(["error" => "Données incomplètes"]);
        }

        $user = $this->userModel->getUserByEmail($data['email']);
        if (!$user || !password_verify($data['password'], $user['password'])) {
            return json_encode(["error" => "Identifiants incorrects"]);
        }

        $payload = [
            "iss" => "CESIZen",
            "iat" => time(),
            "exp" => time() + 3600,
            "sub" => $user['id']
        ];
        $token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

        return json_encode(["token" => $token]);
    }
}
