<?php

use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../../api/models/EmotionTracker.php';

class EmotionTrackerTest extends TestCase
{
    private $mockPDO;
    private $mockTracker;

    protected function setUp(): void
    {
        $this->mockPDO = $this->createMock(PDO::class);
        $this->mockTracker = new EmotionTracker($this->mockPDO);
    }

    // Test : Ajouter une émotion au tracker
    public function testAddEmotionToTrackerSuccess()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('rowCount')->willReturn(1);

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockTracker->add(1, 5, 10, "Je suis bien !");

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Émotion ajoutée au journal', $result['message']);
    }

    // Test : Récupérer les émotions d'un utilisateur
    public function testGetEmotionsByUserSuccess()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('fetchAll')->willReturn([
            ['emotion_id' => 5, 'name' => 'Motivé', 'base_emotion_name' => 'Joie']
        ]);

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockTracker->getJournal(1);

        $this->assertIsArray($result);
        $this->assertNotEmpty($result);
        $this->assertEquals('Motivé', $result[0]['name']);
    }

    // Test : Supprimer une émotion du tracker
    public function testRemoveEmotionSuccess()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('rowCount')->willReturn(1);

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockTracker->remove(1, 10);

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Émotion supprimée du journal', $result['message']);
    }

}
