<?php

require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController
{
    private $userModel;
    private $jwtSecret;

    public function __construct($db)
    {
        $this->userModel = new User($db);
        $this->jwtSecret = $_ENV['JWT_SECRET'] ?? 'secret_key'; // Fallback si ENV est manquant
    }

    public function register($data)
    {
        if (!isset($data['username'], $data['email'], $data['password'])) {
            return ["error" => "Données incomplètes"];
        }

        if ($this->userModel->getUserByEmail($data['email'])) {
            return ["error" => "Email déjà utilisé"];
        }

        return $this->userModel->createUser($data['username'], $data['email'], $data['password']);
    }

    public function login($data)
    {
        if (!isset($data['email'], $data['password'])) {
            return ["error" => "Données incomplètes"];
        }

        $user = $this->userModel->getUserByEmail($data['email']);
        if (!$user || !password_verify($data['password'], $user['password'])) {
            return ["error" => "Identifiants incorrects"];
        }

        $payload = [
            "iss" => "CESIZen",
            "iat" => time(),
            "exp" => time() + 3600,
            "sub" => $user['id'],
            "username" => $user['username'],
            "email" => $user['email'],
            "role" => $user['role'],
        ];

        try {
            $token = JWT::encode($payload, $this->jwtSecret, 'HS256');
            return ["token" => $token];
        } catch (Exception $e) {
            return ["error" => "Erreur lors de la génération du token JWT"];
        }
    }
}
