<?php

class StressTest
{
    private $pdo;
    private $table_tests = 'stress_tests';
    private $table_questions = 'stress_test_questions';
    private $table_diagnostics = 'stress_diagnostics';
    private $table_results = 'stress_test_results';

    public function __construct($db)
    {
        $this->pdo = $db;
    }

    // ===================== GESTION DES TESTS =====================

    public function getAllTests()
    {
        try {
            $sql = "SELECT * FROM " . $this->table_tests . " ORDER BY id DESC";
            $query = $this->pdo->prepare($sql);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération des tests"];
        }
    }

    public function createTest($name, $description)
    {
        try {
            $sql = "INSERT INTO " . $this->table_tests . " (name, description) VALUES (:name, :description)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':name' => $name,
                ':description' => $description
            ]);
            return ["message" => "Test ajouté avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de l'ajout du test"];
        }
    }

    // ===================== GESTION DES QUESTIONS =====================

    public function getTestQuestions($testId)
    {
        try {
            $sql = "SELECT id, question, value FROM " . $this->table_questions . " WHERE stress_test_id = :test_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([':test_id' => $testId]);
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération des questions"];
        }
    }

    public function addQuestion($testId, $question, $value)
    {
        try {
            $sql = "INSERT INTO " . $this->table_questions . " (stress_test_id, question, value) VALUES (:test_id, :question, :value)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':test_id' => $testId,
                ':question' => $question,
                ':value' => $value
            ]);
            return ["message" => "Question ajoutée avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de l'ajout de la question"];
        }
    }

    public function updateQuestion($questionId, $question, $value)
    {
        try {
            $sql = "UPDATE " . $this->table_questions . " SET question = :question, value = :value WHERE id = :question_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':question' => $question,
                ':value' => $value,
                ':question_id' => $questionId
            ]);
            return ["message" => "Question mise à jour avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour de la question"];
        }
    }

    public function deleteQuestion($questionId)
    {
        try {
            $sql = "DELETE FROM " . $this->table_questions . " WHERE id = :question_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([':question_id' => $questionId]);
            return ["message" => "Question supprimée avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la suppression de la question"];
        }
    }

    // ===================== GESTION DES DIAGNOSTICS =====================

    public function saveDiagnostic($userId, $testId, $score)
    {
        try {
            $sql = "INSERT INTO " . $this->table_diagnostics . " (user_id, stress_test_id, score) VALUES (:user_id, :test_id, :score)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':user_id' => $userId,
                ':test_id' => $testId,
                ':score' => $score
            ]);
            return ["message" => "Diagnostic enregistré avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de l'enregistrement du diagnostic"];
        }
    }

    public function getDiagnosticsByUser($userId)
    {
        try {
            $sql = "SELECT d.id, t.name AS test_name, d.score, d.diagnosis_date 
                    FROM " . $this->table_diagnostics . " d 
                    JOIN " . $this->table_tests . " t ON d.stress_test_id = t.id 
                    WHERE d.user_id = :user_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([':user_id' => $userId]);
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération des diagnostics"];
        }
    }

    // ===================== GESTION DES INTERPRÉTATIONS DE SCORES =====================

    public function getScoreInterpretation($testId, $score)
    {
        try {
            $sql = "SELECT interpretation 
                    FROM " . $this->table_results . " 
                    WHERE stress_test_id = :test_id 
                    AND :score BETWEEN min_score AND max_score 
                    LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':test_id' => $testId,
                ':score' => $score
            ]);
            return $query->fetch(PDO::FETCH_ASSOC)['interpretation'] ?? "Interprétation non disponible";
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération de l'interprétation du score"];
        }
    }

    public function addTestResult($testId, $minScore, $maxScore, $interpretation)
    {
        try {
            $sql = "INSERT INTO " . $this->table_results . " (stress_test_id, min_score, max_score, interpretation) 
                VALUES (:test_id, :min_score, :max_score, :interpretation)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':test_id' => $testId,
                ':min_score' => $minScore,
                ':max_score' => $maxScore,
                ':interpretation' => $interpretation
            ]);
            return ["message" => "Résultat ajouté avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de l'ajout du résultat du test"];
        }
    }

    public function deleteTestResult($resultId)
    {
        try {
            $sql = "DELETE FROM " . $this->table_results . " WHERE id = :result_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([':result_id' => $resultId]);
            return ["message" => "Résultat supprimé avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la suppression du résultat du test"];
        }
    }

    public function updateTestResult($resultId, $minScore, $maxScore, $interpretation)
    {
        try {
            $sql = "UPDATE " . $this->table_results . " 
                SET min_score = :min_score, max_score = :max_score, interpretation = :interpretation 
                WHERE id = :result_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':min_score' => $minScore,
                ':max_score' => $maxScore,
                ':interpretation' => $interpretation,
                ':result_id' => $resultId
            ]);
            return ["message" => "Résultat mis à jour avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour du résultat du test"];
        }
    }


}
