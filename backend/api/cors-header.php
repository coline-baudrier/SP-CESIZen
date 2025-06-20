<?php
// Autorisation de l'origine des requêtes
$allowedOrigins = [
    'exp://192.168.1.172:8081',
    'http://192.168.1.172:8081',
    'http://192.168.10.92:8081',
    'http://localhost:8081',
    'http://172.18.0.3:8081', // Ajoutez aussi l'URL HTTP si nécessaire
    'http://172.18.0.2:8081',
    'http://172.18.0.1:8081',
    'http://localhost:19006',
    'http://79.137.33.245:19006'

];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

// Autorisation des méthodes HTTP
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

// Autorisation des headers personnalisés
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Autorisation des cookies / credentials
header("Access-Control-Allow-Credentials: true");

// Type de contenu par défaut
header("Content-Type: application/json; charset=UTF-8");

// Gestion des requêtes OPTIONS (prévol)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}