<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHandler {
    private static $secret = null;

    public static function generateToken($user) {
        self::$secret = $_ENV['JWT_SECRET'];
        $payload = [
            'iss' => "CESIZen",
            "iat" => time(),
            "exp" => time() + 7200,
            "sub" => $user['id'],
        ];
        return JWT::encode($payload, self::$secret, 'HS256');
    }

    public static function verifyToken($token) {
        try {
            self::$secret = $_ENV['JWT_SECRET'];
            return JWT::decode($token, new Key(self::$secret, 'HS256'));
        } catch (Exception $e) {
            return null;
        }
    }
}