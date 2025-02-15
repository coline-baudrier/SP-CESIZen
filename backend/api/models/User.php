<?php

class User
{
    private $pdo;
    private $table = 'users';

    public function __construct($db)
    {
        $this->pdo = $db;
    }

    public function create($username, $email, $password)
    {
        try {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $sql = "INSERT INTO " . $this->table . " (username, email, password) VALUES (:username, :email, :password)";
            $query = $this->pdo->prepare($sql);
            return $query->execute([
                ':username' => $username,
                ':email' => $email,
                ':password' => $hashedPassword
            ]);
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return false;
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


}
