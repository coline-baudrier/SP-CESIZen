<?php
require_once __DIR__ . '/../models/UserFavoriteActivity.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UserFavoriteActivityController
{
    private $favoriteModel;

    public function __construct($db)
    {
        $this->favoriteModel = new UserFavoriteActivity($db);
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

    public function getFavorites($token)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->favoriteModel->getFavorites($auth->sub);
    }

    public function addFavorite($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->favoriteModel->add($auth->sub, $data['activity_id']);
    }

    public function removeFavorite($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->favoriteModel->remove($auth->sub, $data['activity_id']);
    }
}
