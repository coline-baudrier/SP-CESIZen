<?php

use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../../api/models/UserFavoriteActivity.php';

class UserFavoriteActivityTest extends TestCase
{
    private $mockPDO;
    private $mockFavoriteActivity;

    protected function setUp(): void
    {
        $this->mockPDO = $this->createMock(PDO::class);
        $this->mockFavoriteActivity = new UserFavoriteActivity($this->mockPDO);
    }

    // Test : Vérifier si une activité est dans les favoris
    public function testIsFavoriteSuccess()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('fetch')->willReturn(['user_id' => 1, 'activity_id' => 2]); // Activité existante

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockFavoriteActivity->isFavorite(1, 2);

        $this->assertTrue($result);
    }

    // Test : Ajouter une activité aux favoris (Succès)
    public function testAddFavoriteSuccess()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('rowCount')->willReturn(1);

        $this->mockFavoriteActivity = $this->getMockBuilder(UserFavoriteActivity::class)
            ->setConstructorArgs([$this->mockPDO])
            ->onlyMethods(['isFavorite'])
            ->getMock();
        $this->mockFavoriteActivity->method('isFavorite')->willReturn(false); // L'activité n'est pas encore dans les favoris

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockFavoriteActivity->add(1, 2);

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Activité ajoutée aux favoris', $result['message']);
    }

    // Test : Récupérer les favoris d'un utilisateur
    public function testGetFavoritesSuccess()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('fetchAll')->willReturn([
            ['id' => 2, 'name' => 'Yoga'],
            ['id' => 3, 'name' => 'Méditation']
        ]);

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockFavoriteActivity->getFavorites(1);

        $this->assertIsArray($result);
        $this->assertNotEmpty($result);
        $this->assertEquals('Yoga', $result[0]['name']);
    }

}
