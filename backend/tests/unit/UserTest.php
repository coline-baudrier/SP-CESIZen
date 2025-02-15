<?php

use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../../api/models/User.php';

class UserTest extends TestCase
{
    private $mockPDO;
    private $mockUser;

    protected function setUp(): void
    {
        $this->mockPDO = $this->createMock(PDO::class);
        $this->mockUser = new User($this->mockPDO);
    }

    public function testPasswordForgotSuccess()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('fetch')->willReturn(['id' => 1]);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('rowCount')->willReturn(1);

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockUser->passwordForgot('test@example.com', 'newPassword123');

        $this->assertArrayHasKey('message', $result);
        $this->assertEquals('Mot de passe mis à jour avec succès', $result['message']);
    }

    public function testPasswordForgotEmailNotFound()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('fetch')->willReturn(null);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('rowCount')->willReturn(0);

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockUser->passwordForgot('notfound@example.com', 'newPassword123');

        $this->assertArrayHasKey('error', $result);
        $this->assertEquals('Email non trouvé', $result['error']);
    }

    public function testChangeStatusUserNotFound()
    {
        $mockStatement = $this->createMock(PDOStatement::class);
        $mockStatement->method('fetch')->willReturn(null);
        $mockStatement->method('execute')->willReturn(true);
        $mockStatement->method('rowCount')->willReturn(0);

        $this->mockPDO->method('prepare')->willReturn($mockStatement);

        $result = $this->mockUser->changeStatus(999);

        $this->assertArrayHasKey('error', $result);
        $this->assertEquals('Utilisateur non trouvé', $result['error']);
    }
}
