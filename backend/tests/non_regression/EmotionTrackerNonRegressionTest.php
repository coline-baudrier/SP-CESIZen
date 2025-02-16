<?php

use PHPUnit\Framework\TestCase;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../api/controllers/EmotionTrackerController.php';
require_once __DIR__ . '/../../api/models/EmotionTracker.php';

class EmotionTrackerNonRegressionTest extends TestCase
{
    private $mockPDO;
    private $controller;
    private $mockToken;

    protected function setUp(): void
    {
        $this->mockPDO = new PDO('sqlite::memory:');
        $this->mockPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->mockPDO->exec("CREATE TABLE emotions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);");
        $this->mockPDO->exec("CREATE TABLE emotion_tracker (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        emotion_id INTEGER,
        intensity INTEGER,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );");

        $this->mockPDO->exec("INSERT INTO emotions (name) VALUES ('Joie'), ('Tristesse')");

        $this->controller = new EmotionTrackerController($this->mockPDO);

        // Définition correcte de JWT_SECRET
        putenv("JWT_SECRET=test_secret_key");
        $_ENV['JWT_SECRET'] = getenv('JWT_SECRET');

        // Génération correcte du token
        $this->mockToken = JWT::encode(["sub" => 1], $_ENV['JWT_SECRET'], 'HS256');

        print_r("JWT_SECRET utilisé : " . $_ENV['JWT_SECRET'] . "\n"); // Vérification
    }

    private function getJournal()
    {
        $result = $this->controller->getJournal($this->mockToken);
        if (is_string($result)) {
            $result = json_decode($result, true) ?? [];
        }
        return is_array($result) ? $result : [];
    }

    public function testAddEmotionNonRegression()
    {
        $this->controller->addEmotion($this->mockToken, ['emotion_id' => 1, 'intensity' => 8, 'note' => 'Très heureux']);
        sleep(1);
        $this->controller->addEmotion($this->mockToken, ['emotion_id' => 2, 'intensity' => 3, 'note' => 'Un peu triste']);

        $result = $this->getJournal();
        print_r($result);

        $this->assertCount(2, $result, "Le journal devrait contenir 2 entrées");
    }

    public function testUpdateEmotionNonRegression()
    {
        $this->controller->addEmotion($this->mockToken, ['emotion_id' => 1, 'intensity' => 7, 'note' => 'Content']);
        sleep(1);
        $journal = $this->getJournal();
        usort($journal, fn($a, $b) => strtotime($b['created_at']) - strtotime($a['created_at']));
        $entryId = $journal[0]['id'] ?? null;

        $this->assertNotNull($entryId, "L'ID de l'entrée ne devrait pas être null");

        $this->controller->updateEmotion($this->mockToken, ['id' => $entryId, 'note' => 'Hyper content']);

        $newJournal = $this->getJournal();
        usort($newJournal, fn($a, $b) => strtotime($b['created_at']) - strtotime($a['created_at']));

        print_r($newJournal);

        $this->assertArrayHasKey('note', $newJournal[0]);
        $this->assertEquals('Hyper content', $newJournal[0]['note'], "La note de l'émotion devrait être mise à jour");
    }

    public function testRemoveEmotionNonRegression()
    {
        $this->controller->addEmotion($this->mockToken, ['emotion_id' => 1, 'intensity' => 6, 'note' => 'Fatigué']);
        sleep(1);
        $this->controller->addEmotion($this->mockToken, ['emotion_id' => 2, 'intensity' => 4, 'note' => 'Pensif']);

        $journal = $this->getJournal();
        usort($journal, fn($a, $b) => strtotime($b['created_at']) - strtotime($a['created_at']));
        $entryId = $journal[0]['id'] ?? null;

        $this->assertNotNull($entryId, "L'ID de l'entrée ne devrait pas être null");

        $this->controller->removeEmotion($this->mockToken, ['id' => $entryId]);

        $newJournal = $this->getJournal();
        usort($newJournal, fn($a, $b) => strtotime($b['created_at']) - strtotime($a['created_at']));

        print_r($newJournal);

        $this->assertCount(1, $newJournal, "Il ne devrait rester qu'une seule entrée");
        $this->assertArrayHasKey('note', $newJournal[0]);
        $this->assertEquals('Fatigué', $newJournal[0]['note'], "L'entrée restante devrait être 'Fatigué'");
    }
}
