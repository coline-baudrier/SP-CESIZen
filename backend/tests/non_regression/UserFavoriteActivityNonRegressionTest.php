<?php

use Firebase\JWT\JWT;
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../../api/controllers/UserFavoriteActivityController.php';
require_once __DIR__ . '/../../api/models/UserFavoriteActivity.php';

class UserFavoriteActivityNonRegressionTest extends TestCase
{
    private $mockPDO;
    private $controller;
    private $mockToken;

    protected function setUp(): void
    {
        $this->mockPDO = new PDO('sqlite::memory:');
        $this->mockPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->mockPDO->exec("CREATE TABLE relaxation_activities (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);");
        $this->mockPDO->exec("CREATE TABLE user_favorite_activities (user_id INTEGER, activity_id INTEGER);");

        $this->mockPDO->exec("INSERT INTO relaxation_activities (name) VALUES ('Yoga'), ('Méditation')");

        $this->controller = new UserFavoriteActivityController($this->mockPDO);

        // Définition correcte de JWT_SECRET
        putenv("JWT_SECRET=test_secret_key");
        $_ENV['JWT_SECRET'] = getenv('JWT_SECRET');

        // Génération correcte du token
        $this->mockToken = JWT::encode(["sub" => 1], $_ENV['JWT_SECRET'], 'HS256');

        print_r("JWT_SECRET utilisé : " . $_ENV['JWT_SECRET'] . "\n"); // Vérification
    }

    private function getFavorites()
    {
        $result = $this->controller->getFavorites($this->mockToken);
        return is_string($result) ? json_decode($result, true) ?? [] : $result;
    }

    public function testAddFavoriteNonRegression()
    {
        $this->controller->addFavorite($this->mockToken, ['activity_id' => 1]);
        sleep(1);
        $this->controller->addFavorite($this->mockToken, ['activity_id' => 2]);

        $result = $this->getFavorites();
        usort($result, fn($a, $b) => $b['id'] - $a['id']);

        print_r($result);

        $this->assertCount(2, $result, "Le journal des favoris devrait contenir 2 activités");
        $this->assertEquals('Méditation', $result[0]['name']);
        $this->assertEquals('Yoga', $result[1]['name']);
    }

    public function testRemoveFavoriteNonRegression()
    {
        $this->controller->addFavorite($this->mockToken, ['activity_id' => 1]);
        sleep(1);
        $this->controller->addFavorite($this->mockToken, ['activity_id' => 2]);

        $favorites = $this->getFavorites();
        usort($favorites, fn($a, $b) => $b['id'] - $a['id']);
        $activityIdToRemove = $favorites[0]['id'];

        $this->controller->removeFavorite($this->mockToken, ['activity_id' => $activityIdToRemove]);

        $newFavorites = $this->getFavorites();
        usort($newFavorites, fn($a, $b) => $b['id'] - $a['id']);

        print_r($newFavorites);

        $this->assertCount(1, $newFavorites, "Il ne devrait rester qu'une seule activité");
        $this->assertEquals('Yoga', $newFavorites[0]['name'], "L'activité restante devrait être 'Yoga'");
    }
}
