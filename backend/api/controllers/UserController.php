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

    public function getUsers($token)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        $result = $this->userModel->getAll();
        if (!$result) {
            return ["error" => "Aucun utilisateur trouvé."];
        }

        return $result;
    }

    public function changePassword($email, $newPassword)
    {
        $result = $this->userModel->passwordForgot($email, $newPassword);

        if (!$result) {
            return ["error" => "Utilisateur non trouvé ou mise à jour échouée"];
        }

        return $result;
    }
}
