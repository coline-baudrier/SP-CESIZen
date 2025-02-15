<?php

class User
{
    private $pdo;
    private $table = 'users';

    public function __construct($db)
    {
        $this->pdo = $db;
    }

    public function createUser($username, $email, $password, $role = 1)
    {
        try {
            if ($this->getUserByEmail($email)) {
                return ["error" => "Email déjà utilisé"];
            }

            if ($this->getUserByUsername($username)) {
                return ["error" => "Nom d'utilisateur déjà pris"];
            }

            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $sql = "INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, :role)";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':username' => $username,
                ':email' => $email,
                ':password' => $hashedPassword,
                ':role' => $role
            ]);

            return ["message" => "Utilisateur créé avec succès", "role" => $role];

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la création du compte"];
        }
    }

    public function updateUser($id, $data)
    {
        try {
            $allowedFields = ['username', 'email', 'password'];
            $updates = [];
            $params = [':id' => $id];

            foreach ($data as $field => $value) {
                if (!in_array($field, $allowedFields)) {
                    return ["error" => "Champ non autorisé : $field"];
                }

                if ($field === 'email' && $this->getUserByEmail($value)) {
                    return ["error" => "Email déjà utilisé"];
                }

                if ($field === 'username' && $this->getUserByUsername($value)) {
                    return ["error" => "Username déjà pris"];
                }

                if ($field === 'password') {
                    $value = password_hash($value, PASSWORD_BCRYPT);
                }

                $updates[] = "$field = :$field";
                $params[":$field"] = $value;
            }

            if (empty($updates)) {
                return ["error" => "Aucun champ valide à mettre à jour"];
            }

            $sql = "UPDATE " . $this->table . " SET " . implode(", ", $updates) . " WHERE id = :id";
            $query = $this->pdo->prepare($sql);
            $query->execute($params);

            return ["message" => "Profil mis à jour"];

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour"];
        }
    }

    public function delete($id) {
        try {
            $sql = "DELETE FROM " . $this->table . " WHERE id = :id";
            $query = $this->pdo->prepare($sql);
            return $query->execute([':id' => $id]);
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getAll() {
        try {
            $sql = "SELECT * FROM " . $this->table . " ORDER BY id DESC";
            $query = $this->pdo->prepare($sql);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getUserByEmail($email)
    {
        try {
            $sql = "SELECT * FROM " . $this->table . " WHERE email = :email LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':email' => $email]);
            return $query->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getUserByUsername($username)
    {
        try {
            $sql = "SELECT * FROM " . $this->table . " WHERE username = :username LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':username' => $username]);
            return $query->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function getUserById($id) {
        try {
            $sql = "SELECT id, username, email, role, created_at FROM " . $this->table . " WHERE id = :id LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':id' => $id]);
            return $query->fetch(PDO::FETCH_ASSOC) ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return null;
        }
    }

    public function changeStatus($id)
    {
        try {
            // Récupérer le statut actuel
            $sql = "SELECT is_active FROM " . $this->table . " WHERE id = :id LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':id' => $id]);
            $user = $query->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return ["error" => "Utilisateur non trouvé"];
            }

            // Basculer le statut (si 1 → 0, si 0 → 1)
            $newStatus = $user['is_active'] == 1 ? 0 : 1;

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

    public function passwordForgot($email, $newPassword)
    {
        try {
            // Vérifier si l'email existe
            $sql = "SELECT id FROM " . $this->table . " WHERE email = :email LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':email' => $email]);
            $user = $query->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return ["error" => "Email non trouvé"];
            }

            // Hash du nouveau mot de passe
            $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

            // Mise à jour du mot de passe
            $sql = "UPDATE " . $this->table . " SET password = :newPassword WHERE email = :email";
            $query = $this->pdo->prepare($sql);
            $query->execute([
                ':newPassword' => $hashedPassword,
                ':email' => $email
            ]);

            return ["message" => "Mot de passe mis à jour avec succès"];

        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return ["error" => "Erreur lors de la mise à jour du mot de passe"];
        }
    }


}
