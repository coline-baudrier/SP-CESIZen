<?php

class RelaxationActivity
{
    private $pdo;
    private $table = "relaxation_activities";

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
            $sql = "SELECT * FROM " . $this->table . " WHERE is_active = 1 ORDER BY id ASC";
            $query = $this->pdo->prepare($sql);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération des activités"];
        }
    }

    public function getById($id)
    {
        try {
            $sql = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':id' => $id]);
            return $query->fetch(PDO::FETCH_ASSOC) ?: ["error" => "Activité non trouvée"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération de l'activité"];
        }
    }

    public function create($name, $description)
    {
        if ($this->getByName($name)) {
            return ["error" => "Une activité avec ce nom existe déjà"];
        }

        try {
            $sql = "INSERT INTO " . $this->table . " (name, description) VALUES (:name, :description)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':name' => $name,
                ':description' => $description
            ]);
            return ["message" => "Activité ajoutée avec succès"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de l'ajout de l'activité"];
        }
    }

    public function update($id, $name, $description)
    {
        if ($this->getByName($name)) {
            return ["error" => "Une activité avec ce nom existe déjà"];
        }

        try {
            $sql = "UPDATE " . $this->table . " 
                    SET name = :name, description = :description 
                    WHERE id = :id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':id' => $id,
                ':name' => $name,
                ':description' => $description
            ]);
            return ["message" => "Activité mise à jour"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour de l'activité"];
        }
    }

    public function toggleStatus($id)
    {
        try {
            $sql = "SELECT is_active FROM " . $this->table . " WHERE id = :id LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':id' => $id]);
            $activity = $query->fetch(PDO::FETCH_ASSOC);

            if (!$activity) {
                return ["error" => "Activité non trouvée"];
            }

            $newStatus = $activity['is_active'] == 1 ? 0 : 1;
            $sql = "UPDATE " . $this->table . " SET is_active = :status WHERE id = :id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':status' => $newStatus,
                ':id' => $id
            ]);

            return ["message" => "Activité " . ($newStatus ? "réactivée" : "désactivée")];

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors du changement de statut"];
        }
    }

}
