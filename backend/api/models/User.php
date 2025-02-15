<?php

require_once __DIR__ . '/../../config/database.php';

class User {
    private $pdo;
    private $table = 'users';

    public function __construct() {
        global $pdo;
        $this->pdo = $pdo;
    }

    /**
     * Lire tous les enregistrements d'une table
     *
     * @return array Renvoie un tableau d'enregistrements ou un tableau vide si aucun résultat.
     * @throws Exception
     */
    public function readAll() {
        try {
            $sql = "SELECT * FROM " . $this->table;
            $query = $this->pdo->prepare($sql);
            $query->execute();

            return $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            throw new Exception("Une erreur s'est produite lors de la récupération des données utilisateurs.");
        }
    }

    /**
     * Créer un nouvel utilisateur
     *
     * @param string $username
     * @param string $email
     * @param string $password
     * @return bool
     * @throws Exception
     */
    public function create($username, $email, $password) {
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
            throw new Exception("Erreur lors de la création de l'utilisateur.");
        }
    }

    /**
     * Récupérer un utilisateur par email
     *
     * @param string $email
     * @return array|null
     * @throws Exception
     */
    public function getUserByEmail($email) {
        try {
            $sql = "SELECT * FROM " . $this->table . " WHERE email = :email LIMIT 1";
            $query = $this->pdo->prepare($sql);
            $query->execute([':email' => $email]);

            $user = $query->fetch(PDO::FETCH_ASSOC);
            return $user ?: null;
        } catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            throw new Exception("Erreur lors de la récupération de l'utilisateur.");
        }
    }
}