<?php
require_once '../models/StressTest.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class StressTestController
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

    // ==================== GESTION DES TESTS ====================

    public function getTests()
    {
        return $this->stressTestModel->getAllTests();
    }

    public function createTest($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];
        if ($auth->role !== 2) return ["error" => "Accès refusé"];

        $name = $data['name'] ?? null;
        $description = $data['description'] ?? null;

        if (!$name || !$description) {
            return ["error" => "Données incomplètes"];
        }

        return $this->stressTestModel->createTest($name, $description);
    }

    // ==================== GESTION DES QUESTIONS ====================

    public function getTestQuestions($data)
    {
        $testId = $data['test_id'] ?? null;
        if (!$testId) return ["error" => "Test ID requis"];

        return $this->stressTestModel->getTestQuestions($testId);
    }

    public function addQuestion($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];
        if ($auth->role !== 2) return ["error" => "Accès refusé"];

        $testId = $data['test_id'] ?? null;
        $question = $data['question'] ?? null;
        $value = $data['value'] ?? null;

        if (!$testId || !$question || !$value) {
            return ["error" => "Données incomplètes"];
        }

        return $this->stressTestModel->addQuestion($testId, $question, $value);
    }

    public function updateQuestion($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];
        if ($auth->role !== 2) return ["error" => "Accès refusé"];

        $questionId = $data['question_id'] ?? null;
        $question = $data['question'] ?? null;
        $value = $data['value'] ?? null;

        if (!$questionId || !$question || !$value) {
            return ["error" => "Données incomplètes"];
        }

        return $this->stressTestModel->updateQuestion($questionId, $question, $value);
    }

    public function deleteQuestion($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];
        if ($auth->role !== 2) return ["error" => "Accès refusé"];

        $questionId = $data['question_id'] ?? null;

        if (!$questionId) {
            return ["error" => "Données incomplètes"];
        }

        return $this->stressTestModel->deleteQuestion($questionId);
    }

    // ==================== GESTION DES DIAGNOSTICS ====================

    public function submitTest($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];

        $userId = $auth->sub;
        $testId = $data['test_id'] ?? null;
        $score = $data['score'] ?? null;

        if (!$testId || !$score) {
            return ["error" => "Données incomplètes"];
        }

        return $this->stressTestModel->saveDiagnostic($userId, $testId, $score);
    }

    public function getDiagnostics($token)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];

        return $this->stressTestModel->getDiagnosticsByUser($auth->sub);
    }

    // ==================== GESTION DES RÉSULTATS DES TESTS ====================

    public function addTestResult($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];
        if ($auth->role !== 2) return ["error" => "Accès refusé"];

        $testId = $data['test_id'] ?? null;
        $minScore = $data['min_score'] ?? null;
        $maxScore = $data['max_score'] ?? null;
        $interpretation = $data['interpretation'] ?? null;

        if (!$testId || !$minScore || !$maxScore || !$interpretation) {
            return ["error" => "Données incomplètes"];
        }

        return $this->stressTestModel->addTestResult($testId, $minScore, $maxScore, $interpretation);
    }

    public function updateTestResult($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];
        if ($auth->role !== 2) return ["error" => "Accès refusé"];

        $resultId = $data['result_id'] ?? null;
        $minScore = $data['min_score'] ?? null;
        $maxScore = $data['max_score'] ?? null;
        $interpretation = $data['interpretation'] ?? null;

        if (!$resultId || !$minScore || !$maxScore || !$interpretation) {
            return ["error" => "Données incomplètes"];
        }

        return $this->stressTestModel->updateTestResult($resultId, $minScore, $maxScore, $interpretation);
    }

    public function deleteTestResult($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];
        if ($auth->role !== 2) return ["error" => "Accès refusé"];

        $resultId = $data['result_id'] ?? null;

        if (!$resultId) {
            return ["error" => "Données incomplètes"];
        }

        return $this->stressTestModel->deleteTestResult($resultId);
    }

    public function getScoreInterpretation($token, $data)
    {
        $auth = $this->checkAuth($token);
        if (isset($auth->error)) return ["error" => $auth->error];

        $testId = $data['test_id'] ?? null;
        $score = $data['score'] ?? null;

        if (!$testId || !$score) {
            return ["error" => "Données incomplètes"];
        }

        return ["interpretation" => $this->stressTestModel->getScoreInterpretation($testId, $score)];
    }
}
