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

    public function getProfile($token)
    {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $userId = $decoded->sub;

            $user = $this->userModel->getUserById($userId);
            if (!$user) {
                return ["error" => "Utilisateur non trouvé"];
            }

            unset($user['password']);
            return ["profile" => $user];

        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    public function deleteUser($token) {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $userId = $decoded->sub;

            $user = $this->userModel->delete($userId);
            if (!$user) {
                return ["error" => "Utilisateur non trouvé"];
            }

            return ["message" => "Utilisateur supprimé."];
        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    public function updateUser($token, $data)
    {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $userId = $decoded->sub;

            return $this->userModel->updateUser($userId, $data);

        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    public function changeStatus($userId)
    {
        try {
            $result = $this->userModel->changeStatus($userId);

            if (!$result) {
                return ["error" => "Utilisateur non trouvé ou mise à jour échouée"];
            }

            return $result;
        } catch (Exception $e) {
            return ["error" => "Erreur lors de la mise à jour du statut"];
        }
    }

    public function getUsers() {
        try {
            $result = $this->userModel->getAll();

            if (!$result) {
                return ["error" => "Aucun utilisateur trouvé."];
            }

            return $result;
        } catch (Exception $e) {
            return ["error" => "Erreur lors de la récupération des  utilisateurs"];
        }
    }

    public function changePassword($userEmail, $newPassword)
    {
        try {
            $result = $this->userModel->passwordForgot($userEmail, $newPassword);

            if (!$result) {
                return ["error" => "Utilisateur non trouvé ou mise à jour échouée"];
            }

            return $result;
        }catch (Exception $e) {
            return ["error" => "Erreur lors de la mise à jour du mot de passe"];
        }
    }

}