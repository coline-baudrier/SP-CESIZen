<?php

class EmotionTracker
{
    private $pdo;
    private $table = "emotion_tracker";

    public function __construct($db)
    {
        $this->pdo = $db;
    }

    public function getJournal($userId)
    {
        try {
            $sql = "SELECT e.id, et.emotion_id, em.name AS emotion_name, et.intensity, et.note, et.created_at, et.updated_at 
                    FROM " . $this->table . " et
                    JOIN emotions em ON et.emotion_id = em.id
                    WHERE et.user_id = :user_id
                    ORDER BY et.created_at DESC";
            $query = $this->pdo->prepare($sql);
            $query->execute([':user_id' => $userId]);
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération du journal"];
        }
    }

    public function add($userId, $emotionId, $intensity, $note)
    {
        try {
            $sql = "INSERT INTO " . $this->table . " (user_id, emotion_id, intensity, note) 
                    VALUES (:user_id, :emotion_id, :intensity, :note)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':user_id' => $userId,
                ':emotion_id' => $emotionId,
                ':intensity' => $intensity,
                ':note' => $note
            ]);
            return ["message" => "Émotion ajoutée au journal"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de l'ajout au journal"];
        }
    }

    public function getEntryById($userId, $entryId)
    {
        try {
            $sql = "SELECT et.id, et.emotion_id, em.name AS emotion_name, et.intensity, et.note, et.created_at, et.updated_at 
                FROM " . $this->table . " et
                JOIN emotions em ON et.emotion_id = em.id
                WHERE et.id = :id AND et.user_id = :user_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':id' => $entryId,
                ':user_id' => $userId
            ]);

            return $query->fetch(PDO::FETCH_ASSOC) ?: ["error" => "Entrée non trouvée"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération de l'entrée"];
        }
    }

    public function update($userId, $entryId, $data)
    {
        try {
            $fields = [];
            $params = [':id' => $entryId, ':user_id' => $userId];

            if (isset($data['intensity'])) {
                $fields[] = "intensity = :intensity";
                $params[':intensity'] = $data['intensity'];
            }

            if (isset($data['note'])) {
                $fields[] = "note = :note";
                $params[':note'] = $data['note'];
            }

            if (empty($fields)) {
                return ["error" => "Aucune modification envoyée"];
            }

            $sql = "UPDATE " . $this->table . " SET " . implode(', ', $fields) . ", updated_at = CURRENT_TIMESTAMP 
                WHERE id = :id AND user_id = :user_id";
            $query = $this->pdo->prepare($sql);
            $query->execute($params);

            return ["message" => "Émotion mise à jour"];

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour"];
        }
    }


    public function remove($userId, $entryId)
    {
        try {
            $sql = "DELETE FROM " . $this->table . " WHERE id = :id AND user_id = :user_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':id' => $entryId,
                ':user_id' => $userId
            ]);
            return ["message" => "Émotion supprimée du journal"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la suppression"];
        }
    }

    public function getJournalByPeriod($userId, $period)
    {
        try {
            $sql = "SELECT et.id, et.emotion_id, em.name AS emotion_name, et.intensity, et.note, et.created_at, et.updated_at 
                FROM " . $this->table . " et
                JOIN emotions em ON et.emotion_id = em.id
                WHERE et.user_id = :user_id";

            switch ($period) {
                case "day":
                    $sql .= " AND DATE(et.created_at) = CURATE()";
                    break;
                case "week":
                    $sql .= " AND YEAR WEEK(et.created_at, 1) = YEAR WEEK(NOW(), 1)";
                    break;
                case "month":
                    $sql .= " AND MONTH(et.created_at) = MONTH(NOW()) AND YEAR(et.created_at) = YEAR(NOW())";
                    break;
                case "year":
                    $sql .= " AND YEAR(et.created_at) = YEAR(NOW())";
                    break;
                default:
                    return ["error" => "Période invalide"];
            }

            $sql .= " ORDER BY et.created_at DESC";

            $query = $this->pdo->prepare($sql);
            $query->execute([':user_id' => $userId]);
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: [];

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération des émotions"];
        }
    }

}
