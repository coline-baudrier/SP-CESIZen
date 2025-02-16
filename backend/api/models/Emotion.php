<?php

class Emotion {
    private $pdo;
    private $table = "emotions";

    public function __construct($db)
    {
        $this->pdo = $db;
    }

    public function getAll() {
        try {
            $sql = "SELECT * FROM " . $this->table;
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC)  ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getBaseEmotions() {
        try {
            $sql = "SELECT * FROM base_emotions";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getEmotionsByBase($base_id) {
        try {
            $sql = "SELECT e.*, b.name AS base_emotion_name
                FROM emotions e
                JOIN base_emotions b ON e.base_emotion_id = b.id
                WHERE e.base_emotion_id = :base_id";

            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':base_id', $base_id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getEmotionByName($name_emotion) {
        try {
            $sql = "SELECT e.*, be.name as base_emotion_name
                FROM " . $this->table . " e
                JOIN base_emotions be ON e.base_emotion_id = be.id
                WHERE e.name = :name_emotion";

            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':name_emotion', $name_emotion, PDO::PARAM_STR);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getEmotionById($id) {
        try {
            $sql = "SELECT e.*, be.name as base_emotion_name
                FROM " . $this->table . " e
                JOIN base_emotions be ON e.base_emotion_id = be.id
                WHERE e.id = :id
                LIMIT 1";

            $query = $this->pdo->prepare($sql);
            $query->bindParam(":id", $id, PDO::PARAM_INT);
            $query->execute();

            $emotion = $query->fetch(PDO::FETCH_ASSOC);
            return $emotion ?: null;

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function create($name, $base_id) {
        try {
            $sqlVerif = "SELECT COUNT(*) FROM " . $this->table . " WHERE name = :name";
            $queryVerif = $this->pdo->prepare($sqlVerif);
            $queryVerif->execute([':name' => $name]);
            $count = $queryVerif->fetchColumn();

            if ($count > 0) {
                return "Erreur : cette émotion existe déjà.";
            }

            $sql = "INSERT INTO " . $this->table . " (name, base_emotion_id) VALUES (:name, :base_id)";
            $query = $this->pdo->prepare($sql);
            return $query->execute([':name' => $name, ':base_id' => $base_id]) ? "Émotion ajoutée !" : "Erreur lors de l'ajout.";
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return "Erreur lors de l'exécution.";
        }
    }

    public function update($id, $data) {
        try {
            $allowedFields = ["name", "base_emotion_id"];
            $updates = [];
            $params = ['id' => $id];

            foreach ($data as $field => $value) {
                if (!in_array($field, $allowedFields)) {
                    continue;
                }

                if ($field == "name") {
                    $existingEmotion = $this->getEmotionByName($value);
                    if ($existingEmotion && $existingEmotion['id'] != $id) {
                        return ["error" => "Emotion déjà existante."];
                    }
                }

                $updates[] = "$field = :$field";
                $params[":$field"] = is_numeric($value) ? intval($value) : $value;
            }

            if (empty($updates)) {
                return ["error" => "Aucun champ valide à mettre à jour"];
            }

            $sql = "UPDATE " . $this->table . " SET " . implode(", ", $updates) . " WHERE id = :id";
            $query = $this->pdo->prepare($sql);
            $query->execute($params);

            return ["message" => "Emotion mise à jour"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour"];
        }
    }

    public function changeStatus($id) {
        try {
            // Récupérer le statut actuel
            $sql = "SELECT is_active FROM " . $this->table . " WHERE id = :id LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':id' => $id]);
            $emotion = $query->fetch(PDO::FETCH_ASSOC);

            if (!$emotion) {
                return ["error" => "Emotion non trouvée"];
            }

            // Basculer le statut (si 1 → 0, si 0 → 1)
            $newStatus = $emotion['is_active'] == 1 ? 0 : 1;

            // Mettre à jour le statut
            $sql = "UPDATE " . $this->table . " SET is_active = :status WHERE id = :id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':status' => $newStatus,
                ':id' => $id
            ]);

            return ["message" => "Statut mis à jour", "new_status" => $newStatus];

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour du statut"];
        }
    }
}