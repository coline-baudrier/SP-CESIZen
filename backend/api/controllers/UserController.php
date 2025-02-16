<?php
require_once '../models/User.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UserController
{
    private $userModel;

    public function __construct($db)
    {
        $this->userModel = new User($db);
    }

    private function checkAuth($token)
    {
        try {
            if (!$token) {
                return ["error" => "Token manquant"];
            }

            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            return $decoded;
        } catch (Exception $e) {
            return (object) ["error" => "Token invalide ou expiré"];
        }
    }

    public function getProfile($token)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        $userId = $auth->sub;

        $user = $this->userModel->getUserById($userId);
        if (!$user) {
            return ["error" => "Utilisateur non trouvé"];
        }

        unset($user['password']);
        return ["profile" => $user];
    }

    public function deleteUser($token, $userId)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        $user = $this->userModel->delete($userId);
        if (!$user) {
            return ["error" => "Utilisateur non trouvé"];
        }

        return ["message" => "Utilisateur supprimé."];
    }

    public function updateUser($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        $userId = $auth->sub;

        return $this->userModel->updateUser($userId, $data);
    }

    public function changeStatus($token, $userId)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        $result = $this->userModel->changeStatus($userId);

        if (!$result) {
            return ["error" => "Utilisateur non trouvé ou mise à jour échouée"];
        }

        return $result;
    }

    public function getUsers($token) {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            if ($decoded->role !== 2) {
                return ["error" => "Accès refusé"];
            }

            $result = $this->userModel->getAll();

            if (!$result) {
                return ["error" => "Aucun utilisateur trouvé."];
            }

            return $result;
        } catch (Exception $e) {
            return ["error" => "Erreur lors de la récupération des utilisateurs"];
        }
    }


    public function changePassword($email, $newPassword)
    {
        $result = $this->userModel->passwordForgot($email, $newPassword);

        if (!$result) {
            return ["error" => "Utilisateur non trouvé ou mise à jour échouée"];
        }

        return $result;
    }

    public function createAdmin($token, $data)
    {
        try {
            $auth = $this->checkAuth($token);
            if (isset($auth->error)) {
                return ["error" => $auth->error];
            }

            if ($auth->role !== 2) { // 🔹 Vérification Admin
                return ["error" => "Accès refusé"];
            }

            $username = $data['username'] ?? null;
            $email = $data['email'] ?? null;
            $password = $data['password'] ?? null;

            if (!$username || !$email || !$password) {
                return ["error" => "Données incomplètes"];
            }

            // Création d'un utilisateur avec `role = 2` (Admin)
            return $this->userModel->createUser($username, $email, $password, 2);

        } catch (Exception $e) {
            return ["error" => "Erreur lors de la création de l'administrateur"];
        }
    }

}
