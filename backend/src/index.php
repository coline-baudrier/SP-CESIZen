<?php
// require __DIR__ . '/../database.php';     
// require_once __DIR__ . '/../vendor/autoload.php';

// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
// $dotenv->load();

// try {
//     // Remplacez ces valeurs par vos informations de connexion
//     $dbHost = $_ENV['DB_HOST'];
//     $dbName = $_ENV['DB_NAME'];
//     $dbUser = $_ENV['DB_USER'];
//     $dbPass = $_ENV['DB_PASS'];
    
//     $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
//     echo "<p style='color: green;'>Connexion à la base de données réussie!</p>";
// } catch (PDOException $e) {
//     echo "<p style='color: red;'>Erreur de connexion à la base de données: " . $e->getMessage() . "</p>";
// }

// // Vérification que PHP fonctionne
// echo "<h1>Backend Opérationnel</h1>";
// echo "<p>Si vous voyez ce message, PHP fonctionne correctement.</p>";

// // Vérification des dépendances (si nécessaire)
// $requiredExtensions = ['pdo_mysql', 'json']; // Ajoutez les extensions nécessaires
// foreach ($requiredExtensions as $ext) {
//     if (!extension_loaded($ext)) {
//         echo "<p style='color: orange;'>Attention: L'extension $ext n'est pas chargée.</p>";
//     } else {
//         echo "<p style='color: green;'>Extension $ext chargée avec succès.</p>";
//     }
// }

// // Information sur le serveur (utile pour le débogage)
// echo "<h2>Informations serveur</h2>";
// echo "<pre>";
// echo "PHP Version: " . phpversion() . "\n";
// echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "\n";
// echo "</pre>";
