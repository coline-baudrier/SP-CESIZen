<?php

class StressTest
{
    private $pdo;
    private $table_tests = 'stress_tests';
    private $table_questions = 'stress_test_questions';
    private $table_diagnostics = 'stress_diagnostics';

    public function __construct($db)
    {
        $this->pdo = $db;
    }

    // Récupérer tous les tests
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

    // Récupérer les questions d'un test spécifique
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

    // Ajouter un test (Admin uniquement)
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

    // Ajouter une question à un test
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

    // Enregistrer un diagnostic (Utilisateur connecté)
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

    // Récupérer l'historique des diagnostics d'un utilisateur
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

    public function updateQuestion($questionId, $question, $value)
    {
        try {
            $sql = "UPDATE stress_test_questions SET question = :question, value = :value WHERE id = :question_id";
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
            $sql = "DELETE FROM stress_test_questions WHERE id = :question_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([':question_id' => $questionId]);
            return ["message" => "Question supprimée avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la suppression de la question"];
        }
    }

    public function getAllDiagnosticsByUser($userId)
    {
        try {
            $sql = "SELECT id, score, diagnosis_date FROM stress_diagnostics WHERE user_id = :user_id ORDER BY diagnosis_date DESC";
            $query = $this->pdo->prepare($sql);
            $query->execute([':user_id' => $userId]);
            return ["diagnostics" => $query->fetchAll(PDO::FETCH_ASSOC) ?: []];

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération des diagnostics"];
        }
    }


}
