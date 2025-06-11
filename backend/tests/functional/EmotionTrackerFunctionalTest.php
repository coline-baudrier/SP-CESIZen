<?php

use PHPUnit\Framework\TestCase;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../api/controllers/EmotionTrackerController.php';
require_once __DIR__ . '/../../api/models/EmotionTracker.php';

class EmotionTrackerFunctionalTest extends TestCase
{
    private $mockPDO;
    private $mockEmotionTracker;
    private $controller;
    private $mockToken;

    protected function setUp(): void
    {
        // Simuler une connexion à la base SQLite en mémoire
        $this->mockPDO = new PDO('sqlite::memory:');
        $this->mockPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Création de la table temporaire pour le journal émotionnel
        $this->mockPDO->exec("
            CREATE TABLE emotion_tracker (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                emotion_id INTEGER,
                intensity INTEGER,
                note TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Création de la table des émotions
        $this->mockPDO->exec("
            CREATE TABLE emotions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            )
        ");

        // Ajouter une émotion fictive
        $this->mockPDO->exec("INSERT INTO emotions (name) VALUES ('Joie')");

        // Initialisation du modèle et du contrôleur
        $this->mockEmotionTracker = new EmotionTracker($this->mockPDO);
        $this->controller = new EmotionTrackerController($this->mockPDO);

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

    // Test : Ajouter une émotion au journal (Succès)
    public function testAddEmotionSuccess()
    {
        $data = ['emotion_id' => 1, 'intensity' => 7, 'note' => 'Je me sens bien !'];
        $result = $this->controller->addEmotion($this->mockToken, $data);

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Émotion ajoutée au journal', $result['message']);
    }

    // Test : Mettre à jour une émotion du journal (Succès)
    public function testUpdateEmotionSuccess()
    {
        $this->mockPDO->exec("INSERT INTO emotion_tracker (user_id, emotion_id, intensity, note) VALUES (1, 1, 6, 'Fatigué')");

        $data = ['id' => 1, 'intensity' => 9, 'note' => 'Motivé !'];
        $result = $this->controller->updateEmotion($this->mockToken, $data);

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Émotion mise à jour', $result['message']);
    }

    // Test : Supprimer une émotion du journal (Succès)
    public function testRemoveEmotionSuccess()
    {
        $this->mockPDO->exec("INSERT INTO emotion_tracker (user_id, emotion_id, intensity, note) VALUES (1, 1, 5, 'Neutre')");

        $data = ['id' => 1];
        $result = $this->controller->removeEmotion($this->mockToken, $data);

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Émotion supprimée du journal', $result['message']);
    }
}
