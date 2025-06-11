<?php

class UserFavoriteActivity
{
    private $pdo;
    private $table = "user_favorite_activities";

    public function __construct($db)
    {
        $this->pdo = $db;
    }

    public function isFavorite($userId, $activityId)
    {
        try {
            $sql = "SELECT * FROM " . $this->table . " WHERE user_id = :user_id AND activity_id = :activity_id LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':user_id' => $userId, ':activity_id' => $activityId]);
            return $query->fetch(PDO::FETCH_ASSOC) ? true : false;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function add($userId, $activityId)
    {
        if ($this->isFavorite($userId, $activityId)) {
            return ["error" => "Cette activité est déjà dans vos favoris"];
        }

        try {
            $sql = "INSERT INTO " . $this->table . " (user_id, activity_id) VALUES (:user_id, :activity_id)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':user_id' => $userId,
                ':activity_id' => $activityId
            ]);
            return ["message" => "Activité ajoutée aux favoris"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de l'ajout aux favoris"];
        }
    }

    public function getFavorites($userId)
    {
        try {
            $sql = "SELECT r.* FROM " . $this->table . " ufa 
                    JOIN relaxation_activities r ON ufa.activity_id = r.id 
                    WHERE ufa.user_id = :user_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([':user_id' => $userId]);
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: [];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la récupération des favoris"];
        }
    }

    public function remove($userId, $activityId)
    {
        try {
            $sql = "DELETE FROM " . $this->table . " WHERE user_id = :user_id AND activity_id = :activity_id";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':user_id' => $userId,
                ':activity_id' => $activityId
            ]);
            return ["message" => "Activité retirée des favoris"];
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la suppression des favoris"];
        }
    }
}
