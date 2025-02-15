<?php
require_once '../models/Emotion.php';
require_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class EmotionController {

    private $emotionModel;

    public function __construct($db) {
        $this->emotionModel = new Emotion($db);
    }

    private function checkAuth($token) {
        try {
            if (!$token) {
                return ["error" => "Token manquant"];
            }

            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            return $decoded;

        } catch (Exception $e) {
            return (object) ["error" => "Token invalide ou expiré"]; // Retourne un objet au lieu d'un tableau
        }
    }


    public function getEmotions($token) {
        try {
            $auth = $this->checkAuth($token);
            if (isset($auth->error)) {
                return ["error" => $auth->error];
            }


            $emotions = $this->emotionModel->getAll();
            if (!$emotions) {
                return ["error" => "Aucune émotion trouvée"];
            }

            return ["emotions" => $emotions];

        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    public function getBaseEmotions($token) {
        try {
            $auth = $this->checkAuth($token);
            if (isset($auth->error)) {
                return ["error" => $auth->error];
            }


            $baseEmotions = $this->emotionModel->getBaseEmotions();
            if (!$baseEmotions) {
                return ["error" => "Aucune émotion de base trouvée"];
            }

            return ["base_emotions" => $baseEmotions];

        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    public function getEmotionsByBase($token, $base_id) {
        try {
            $auth = $this->checkAuth($token);
            if (isset($auth->error)) {
                return ["error" => $auth->error];
            }

            $emotions = $this->emotionModel->getEmotionsByBase($base_id);
            if (!$emotions) {
                return ["error" => "Aucune émotion trouvée pour cette base"];
            }

            return ["emotions" => $emotions];

        } catch (Exception $e) {
            return ["error" => "Erreur lors de la récupération des émotions"];
        }
    }

    public function getEmotionById($token, $id) {
        try {
            $auth = $this->checkAuth($token);
            if (isset($auth->error)) {
                return ["error" => $auth->error];
            }

            $emotion = $this->emotionModel->getEmotionById($id);
            if (!$emotion) {
                return ["error" => "Émotion non trouvée."];
            }

            return ["emotion" => $emotion];

        } catch (Exception $e) {
            return ["error" => "Erreur lors de l'ajout au tracker"];
        }
    }

    public function createEmotion($token, $name, $base_id) {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        $result = $this->emotionModel->create($name, $base_id);

        if ($result === "Erreur : cette émotion existe déjà.") {
            return ["error" => "Cette émotion existe déjà."];
        }

        if (!$result) {
            return ["error" => "Erreur lors de l'ajout de l'émotion"];
        }

        return ["message" => "Émotion ajoutée avec succès"];
    }


    public function updateEmotion($token, $id, $data) {
        try {
            $auth = $this->checkAuth($token);
            if (isset($auth->error)) {
                return ["error" => $auth->error];
            }

            $emotion = $this->emotionModel->update($id, $data);
            if (isset($emotion['error'])) {
                return $emotion; // Retourner directement l'erreur de `update()`
            }

            return ["message" => "Emotion mise à jour"];

        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }


    public function changeStatus($token, $id) {
        try {
            $auth = $this->checkAuth($token);
            if (isset($auth->error)) {
                return ["error" => $auth->error];
            }

            $emotion = $this->emotionModel->changeStatus($id);
            if (!$emotion) {
                return ["error" => "Emotion non trouvée."];
            }

            return  ["message" => "Emotion invalidée."];
        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }
}