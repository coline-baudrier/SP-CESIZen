<?php

class BreathingExercise
{
    private $pdo;
    private $table = "breathing_exercises";

    public function __construct($db)
    {
        $this->pdo = $db;
    }

    public function getByName($name)
    {
        try {
            $sql = "SELECT * FROM " . $this->table . " WHERE name = :name LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':name' => $name]);
            return $query->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getAll()
    {
        try {
            $sql = "SELECT * FROM " . $this->table . " ORDER BY id ASC";
            $query = $this->pdo->prepare($sql);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération des exercices"];
        }
    }

    public function getById($id)
    {
        try {
            $sql = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':id' => $id]);
            return $query->fetch(PDO::FETCH_ASSOC) ?: ["error" => "Exercice non trouvé"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération de l'exercice"];
        }
    }


    public function create($name, $inhale, $hold, $exhale)
    {
        if ($this->getByName($name)) {
            return ["error" => "Un exercice avec ce nom existe déjà"];
        }

        try {
            $sql = "INSERT INTO " . $this->table . " (name, inhale_duration, hold_duration, exhale_duration) 
                    VALUES (:name, :inhale, :hold, :exhale)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':name' => $name,
                ':inhale' => $inhale,
                ':hold' => $hold,
                ':exhale' => $exhale
            ]);
            return ["message" => "Exercice ajouté avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de l'ajout de l'exercice"];
        }
    }

    public function update($id, $name, $inhale, $hold, $exhale)
    {
        try {
            $sql = "UPDATE " . $this->table . " 
                    SET name = :name, inhale_duration = :inhale, hold_duration = :hold, exhale_duration = :exhale 
                    WHERE id = :id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':id' => $id,
                ':name' => $name,
                ':inhale' => $inhale,
                ':hold' => $hold,
                ':exhale' => $exhale
            ]);
            return ["message" => "Exercice mis à jour"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour de l'exercice"];
        }
    }

    public function delete($id)
    {
        try {
            $sql = "DELETE FROM " . $this->table . " WHERE id = :id";
            $query = $this->pdo->prepare($sql);
            $query->execute([':id' => $id]);
            return ["message" => "Exercice supprimé avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la suppression de l'exercice"];
        }
    }
}
