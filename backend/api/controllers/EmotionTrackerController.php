<?php
require_once __DIR__ . '/../models/EmotionTracker.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class EmotionTrackerController
{
    private $emotionTrackerModel;

    public function __construct($db)
    {
        $this->emotionTrackerModel = new EmotionTracker($db);
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

    public function getJournal($token)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->emotionTrackerModel->getJournal($auth->sub);
    }

    public function addEmotion($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->emotionTrackerModel->add($auth->sub, $data['emotion_id'], $data['intensity'], $data['note']);
    }

    public function getEntryById($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->emotionTrackerModel->getEntryById($auth->sub, $data['id']);
    }

    public function updateEmotion($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->emotionTrackerModel->update($auth->sub, $data['id'], $data);
    }


    public function removeEmotion($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->emotionTrackerModel->remove($auth->sub, $data['id']);
    }

    public function getJournalByPeriod($token, $period)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->emotionTrackerModel->getJournalByPeriod($auth->sub, $period);
    }

}
