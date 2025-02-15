<?php
require_once '../models/RelaxationActivity.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class RelaxationActivityController
{
    private $activityModel;

    public function __construct($db)
    {
        $this->activityModel = new RelaxationActivity($db);
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
            return (object)["error" => "Token invalide ou expiré"];
        }
    }

    public function getAllActivities()
    {
        return $this->activityModel->getAll();
    }

    public function getActivityById($id)
    {
        return $this->activityModel->getById($id);
    }

    public function createActivity($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        return $this->activityModel->create($data['name'], $data['description']);
    }

    public function updateActivity($token, $id, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        return $this->activityModel->update($id, $data['name'], $data['description']);
    }

    public function toggleActivityStatus($token, $id)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        return $this->activityModel->toggleStatus($id);
    }
}
