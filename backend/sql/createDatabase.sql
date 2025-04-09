-- Vérification de la base de données 
DROP DATABASE IF EXISTS cesi_zen;
CREATE DATABASE cesi_zen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sélection de la base de données
USE cesi_zen;

-- Suppression des tables existantes dans le bon ordre pour éviter les erreurs de contraintes de clés étrangères
DROP TABLE IF EXISTS stress_diagnostics;
DROP TABLE IF EXISTS stress_test_questions;
DROP TABLE IF EXISTS stress_test_results;
DROP TABLE IF EXISTS stress_tests;
DROP TABLE IF EXISTS breathing_exercises;
DROP TABLE IF EXISTS user_favorite_activities;
DROP TABLE IF EXISTS relaxation_activities;
DROP TABLE IF EXISTS emotion_tracker;
DROP TABLE IF EXISTS emotions;
DROP TABLE IF EXISTS base_emotions;
DROP TABLE IF EXISTS users;

-- Création des tables
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE base_emotions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE emotions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT 1, 
    base_emotion_id INTEGER NOT NULL,
    FOREIGN KEY (base_emotion_id) REFERENCES base_emotions(id) ON DELETE CASCADE
);

CREATE TABLE emotion_tracker (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    emotion_id INTEGER NOT NULL,
    intensity INTEGER NOT NULL CHECK (intensity BETWEEN 1 AND 10),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (emotion_id) REFERENCES emotions(id) ON DELETE CASCADE
);

CREATE TABLE stress_tests (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL
);

CREATE TABLE stress_test_results (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    stress_test_id INTEGER NOT NULL,
    min_score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    interpretation TEXT NOT NULL,
    FOREIGN KEY (stress_test_id) REFERENCES stress_tests(id) ON DELETE CASCADE
);

CREATE TABLE stress_test_questions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    stress_test_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    value INTEGER NOT NULL CHECK (value >= 0),
    FOREIGN KEY (stress_test_id) REFERENCES stress_tests(id) ON DELETE CASCADE
);

CREATE TABLE stress_diagnostics (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    stress_test_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    diagnosis_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (stress_test_id) REFERENCES stress_tests(id) ON DELETE CASCADE
);

CREATE TABLE breathing_exercises (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    inhale_duration INTEGER NOT NULL,
    hold_duration INTEGER NOT NULL,
    exhale_duration INTEGER NOT NULL
);

CREATE TABLE relaxation_activities (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE user_favorite_activities (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES relaxation_activities(id) ON DELETE CASCADE
);
