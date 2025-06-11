<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../../api/controllers/AuthController.php';
require_once __DIR__ . '/../../api/models/User.php';

class UserNonRegressionTest extends TestCase
{
    private $mockPDO;
    private $mockUser;
    private $authController;

    protected function setUp(): void
    {
        $this->mockPDO = $this->createMock(PDO::class);
        $this->mockUser = new User($this->mockPDO);
        $this->authController = new AuthController($this->mockPDO);

        putenv("JWT_SECRET=test_secret_key");
        $_ENV['JWT_SECRET'] = getenv('JWT_SECRET');

        print_r("JWT_SECRET utilisé : " . $_ENV['JWT_SECRET'] . "\n");
    }


    public function testPasswordForgotDoesNotAffectLogin()
    {
        // Simulation de la mise à jour du mot de passe
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('fetch')->willReturn([
            'id' => 1,
            'username' => 'testuser',
            'email' => 'test@example.com',
            'role' => 1, // 1 = utilisateur standard
            'password' => password_hash('newPassword', PASSWORD_DEFAULT)
        ]);

        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('rowCount')->willReturn(1);

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $this->mockUser->passwordForgot('test@example.com', 'newPassword');

        // Test du login avec AuthController
        $result = $this->authController->login(['email' => 'test@example.com', 'password' => 'newPassword']);


        $this->assertArrayHasKey('token', $result);
    }
}
