<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../api/controllers/AuthController.php';
require_once __DIR__ . '/../../api/models/User.php';

class AuthFunctionalTest extends TestCase
{
    private $mockPDO;
    private $authController;

    protected function setUp(): void
    {
        $this->mockPDO = new PDO('sqlite::memory:'); // Utilisation d'une base SQLite en mémoire pour le test
        $this->mockPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Création de la table users temporaire pour le test
        $this->mockPDO->exec("
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT,
                email TEXT UNIQUE,
                password TEXT
            )
        ");

        $this->authController = new AuthController($this->mockPDO);

        // 🔥 Définition d'une clé JWT pour éviter les erreurs
        putenv("JWT_SECRET=test_secret_key");
        $_ENV['JWT_SECRET'] = "test_secret_key";
    }

    public function testUserCanRegisterAndLogin()
    {
        // 🔹 Simulation de l'inscription
        $registerData = [
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => 'password123'
        ];

        $registerResponse = json_decode($this->authController->register($registerData), true);

        // Vérifier que l'inscription a bien fonctionné
        $this->assertArrayHasKey('message', $registerResponse);
        $this->assertEquals('Utilisateur créé', $registerResponse['message']);

        // 🔹 Vérifier que l'utilisateur est bien en base de données
        $stmt = $this->mockPDO->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$registerData['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->assertNotEmpty($user, "L'utilisateur devrait être en base après l'inscription");

        // 🔹 Simulation de la connexion avec les mêmes identifiants
        $loginData = ['email' => 'test@example.com', 'password' => 'password123'];
        $loginResponse = json_decode($this->authController->login($loginData), true);

        // Vérifier que le token JWT est bien retourné
        $this->assertArrayHasKey('token', $loginResponse);
    }
}
