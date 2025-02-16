<?php
require_once '../models/StressTest.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class StressDiagnosisTest
{
    private $stressTestModel;

    public function __construct($db)
    {
        $this->stressTestModel = new StressTest($db);
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

    // Récupérer la liste des tests (Accès public)
    public function getTests()
    {
        try {
            $tests = $this->stressTestModel->getAllTests();

            if (!$tests) {
                return ["error" => "Aucun test trouvé."];
            }

            return $tests;
        } catch (Exception $e) {
            return ["error" => "Erreur lors de la récupération des tests"];
        }
    }

    // Récupérer les questions d’un test spécifique (Accès public)
    public function getTestQuestions($data)
    {
        try {
            $testId = isset($data['test_id']) ? $data['test_id'] : null;

            if (!$testId) {
                return ["error" => "Test ID requis"];
            }

            $questions = $this->stressTestModel->getTestQuestions($testId);

            if (!$questions) {
                return ["error" => "Aucune question trouvée pour ce test"];
            }

            return $questions;
        } catch (Exception $e) {
            return ["error" => "Erreur lors de la récupération des questions"];
        }
    }

    // Enregistrer un diagnostic (JWT requis)
    public function submitTest($token, $data)
    {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $userId = $decoded->sub;

            $testId = isset($data['test_id']) ? $data['test_id'] : null;
            $score = isset($data['score']) ? $data['score'] : null;

            if (!$testId || !$score) {
                return ["error" => "Données incomplètes"];
            }

            return $this->stressTestModel->saveDiagnostic($userId, $testId, $score);
        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    // Récupérer l'historique des diagnostics d'un utilisateur (JWT requis)
    public function getDiagnostics($token)
    {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $userId = $decoded->sub;

            $diagnostics = $this->stressTestModel->getDiagnosticsByUser($userId);

            if (!$diagnostics) {
                return ["error" => "Aucun diagnostic trouvé"];
            }

            return $diagnostics;
        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    // Ajouter un test (Admin uniquement)
    public function createTest($token, $data)
    {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            if ($decoded->role !== 2) { // 2 = Admin
                return ["error" => "Accès refusé"];
            }

            $name = isset($data['name']) ? $data['name'] : null;
            $description = isset($data['description']) ? $data['description'] : null;

            if (!$name || !$description) {
                return ["error" => "Données incomplètes"];
            }

            return $this->stressTestModel->createTest($name, $description);
        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    // Ajouter une question à un test (Admin uniquement)
    public function addQuestion($token, $data)
    {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            if ($decoded->role !== 2) {
                return ["error" => "Accès refusé"];
            }

            $testId = isset($data['test_id']) ? $data['test_id'] : null;
            $question = isset($data['question']) ? $data['question'] : null;
            $value = isset($data['value']) ? $data['value'] : null;

            if (!$testId || !$question || !$value) {
                return ["error" => "Données incomplètes"];
            }

            return $this->stressTestModel->addQuestion($testId, $question, $value);
        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    public function updateQuestion($token, $data)
    {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            if (!isset($decoded->role) || $decoded->role !== 2) {
                return ["error" => "Accès refusé"];
            }

            $questionId = $data['question_id'] ?? null;
            $question = $data['question'] ?? null;
            $value = $data['value'] ?? null;

            if (!$questionId || !$question || !$value) {
                return ["error" => "Données incomplètes"];
            }

            return $this->stressTestModel->updateQuestion($questionId, $question, $value);
        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    public function deleteQuestion($token, $data)
    {
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            if (!isset($decoded->role) || $decoded->role !== 2) {
                return ["error" => "Accès refusé"];
            }

            $questionId = $data['question_id'] ?? null;

            if (!$questionId) {
                return ["error" => "Données incomplètes"];
            }

            return $this->stressTestModel->deleteQuestion($questionId);
        } catch (Exception $e) {
            return ["error" => "Token invalide"];
        }
    }

    public function getAllStressDiagnostics($token)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) {
            return ["error" => $auth->error];
        }

        return $this->stressTestModel->getAllDiagnosticsByUser($auth->sub);
    }


}
