<?php
require_once '../models/BreathingExercise.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class BreathingExerciseController
{
    private $exerciseModel;

    public function __construct($db)
    {
        $this->exerciseModel = new BreathingExercise($db);
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

    public function getExercises()
    {
        return $this->exerciseModel->getAll();
    }

    public function getExerciseById($id)
    {
        return $this->exerciseModel->getById($id);
    }


    public function createExercise($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        // Vérifier si l'exercice existe déjà
        if ($this->exerciseModel->getByName($data['name'])) {
            return ["error" => "Un exercice avec ce nom existe déjà"];
        }

        return $this->exerciseModel->create($data['name'], $data['inhale_duration'], $data['hold_duration'], $data['exhale_duration']);
    }


    public function updateExercise($token, $id, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        return $this->exerciseModel->update($id, $data['name'], $data['inhale_duration'], $data['hold_duration'], $data['exhale_duration']);
    }

    public function deleteExercise($token, $id)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        if ($auth->role !== 2) {
            return ["error" => "Accès refusé"];
        }

        return $this->exerciseModel->delete($id);
    }
}
