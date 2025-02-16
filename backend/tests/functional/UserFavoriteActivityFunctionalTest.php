<?php

use PHPUnit\Framework\TestCase;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../api/controllers/UserFavoriteActivityController.php';
require_once __DIR__ . '/../../api/models/UserFavoriteActivity.php';

class UserFavoriteActivityFunctionalTest extends TestCase
{
    private $mockPDO;
    private $mockFavoriteActivity;
    private $controller;
    private $mockToken;

    protected function setUp(): void
    {
        // Simuler une connexion à la base SQLite en mémoire
        $this->mockPDO = new PDO('sqlite::memory:');
        $this->mockPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Créer une table temporaire pour stocker les favoris
        $this->mockPDO->exec("
            CREATE TABLE user_favorite_activities (
                user_id INTEGER,
                activity_id INTEGER
            );
        ");

        // Créer une table temporaire pour les activités
        $this->mockPDO->exec("
            CREATE TABLE relaxation_activities (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            );
        ");

        // Ajouter des activités fictives
        $this->mockPDO->exec("INSERT INTO relaxation_activities (name) VALUES ('Yoga'), ('Méditation')");

        // Initialisation du modèle et du contrôleur
        $this->mockFavoriteActivity = new UserFavoriteActivity($this->mockPDO);
        $this->controller = new UserFavoriteActivityController($this->mockPDO);

        // Générer un JWT fictif
        $this->mockToken = $this->generateMockToken(1); // Utilisateur ID = 1

        putenv("JWT_SECRET=test_secret_key");
        $_ENV['JWT_SECRET'] = "test_secret_key";
    }

    private function generateMockToken($userId)
    {
        $payload = ['sub' => $userId];
        return JWT::encode($payload, "test_secret_key", 'HS256');
    }

    // Test : Ajouter une activité aux favoris (Succès)
    public function testAddFavoriteSuccess()
    {
        $data = ['activity_id' => 1];
        $result = $this->controller->addFavorite($this->mockToken, $data);

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Activité ajoutée aux favoris', $result['message']);
    }

    // Test : Récupérer les activités favorites
    public function testGetFavoritesSuccess()
    {
        $this->mockPDO->exec("INSERT INTO user_favorite_activities (user_id, activity_id) VALUES (1, 1)");

        $result = $this->controller->getFavorites($this->mockToken);

        $this->assertIsArray($result);
        $this->assertNotEmpty($result);
        $this->assertEquals('Yoga', $result[0]['name']);
    }

    // Test : Supprimer une activité des favoris
    public function testRemoveFavoriteSuccess()
    {
        $this->mockPDO->exec("INSERT INTO user_favorite_activities (user_id, activity_id) VALUES (1, 1)");

        $data = ['activity_id' => 1];
        $result = $this->controller->removeFavorite($this->mockToken, $data);

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Activité retirée des favoris', $result['message']);
    }
}
