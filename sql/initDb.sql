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


-- Alimentation des tables

-- Insertion des utilisateurs
INSERT INTO users (username, email, password, role) VALUES
('asaki', 'asaki@dofus.com', '$2b$12$4VAoUFLlTkLTJ3Va.9kqDeXm8PZ/BsTtAlFn1WDfXdOJSN/JDjtAK', 1),
('elayli', 'elayli@dofus.com', '$2b$12$IRfT8RWuu.ZtTy1xi3fSeODTG.UId5/FSUHs5htHErrO9FKDuYCWG', 1),
('john_doe', 'john.doe@cesi.com', '$2b$12$mRbzZNVpWEAMsSUc2YbI7.hvA9XzhfqVIhMRxEyAuhO5TuJFc5tjq', 2);

-- Insertion des émotions de base
INSERT INTO base_emotions (name) VALUES 
('Joie'), ('Colère'), ('Peur'), ('Tristesse'), ('Surprise'), ('Dégoût');

-- Insertion des émotions détaillées (sans doublon)
INSERT INTO emotions (name, base_emotion_id) VALUES 
('Fierté', 1), ('Contentement', 1), ('Enchantement', 1), ('Excitation', 1), ('Admiration', 1), ('Gratitude', 1),
('Frustration', 2), ('Irritation', 2), ('Rage', 2), ('Ressentiment', 2), ('Agacement', 2), ('Hostilité', 2),
('Inquiétude', 3), ('Anxiété', 3), ('Terreur', 3), ('Appréhension', 3), ('Panique', 3), ('Crainte', 3),
('Chagrin', 4), ('Mélancolie', 4), ('Abattement', 4), ('Désespoir', 4), ('Solitude', 4), ('Dépression', 4),
('Étonnement', 5), ('Stupéfaction', 5), ('Sidération', 5), ('Incrédulité', 5), ('Surprise intense', 5),
('Confusion', 6), ('Répulsion', 6), ('Déplaisir', 6), ('Nausée', 6), ('Dégoût profond', 6);

-- Insertion des exercices de respiration
INSERT INTO breathing_exercises (name, inhale_duration, hold_duration, exhale_duration) VALUES 
('748', 7, 4, 8),
('55', 5, 0, 5),
('46', 4, 0, 6);

-- Insertion des activités de détente
INSERT INTO relaxation_activities (name, description) VALUES 
('Méditation guidée', 'Écouter une méditation guidée pour la relaxation'),
('Yoga doux', 'Pratiquer une série de postures de yoga adaptées à la détente'),
('Musique relaxante', 'Écouter une playlist de musique apaisante'),
('Lecture', 'Lire un livre ou un article inspirant'),
('Balade en nature', 'Se promener en plein air pour se ressourcer');

-- Ajout d'émotions pour les utilisateurs
INSERT INTO emotion_tracker (user_id, emotion_id, intensity, note) VALUES 
(1, 1, 8, 'Journée productive !'),
(1, 3, 5, 'Un peu de stress avant une réunion importante'),
(2, 2, 6, 'Agacé par un contretemps'),
(2, 4, 7, 'Sensation de solitude ce matin');

-- Insertion des types de tests
INSERT INTO stress_tests (name, description) VALUES 
('Échelle de Holmes et Rahe', 'Évaluation du stress basé sur des événements de vie'),
('Test de Burnout', 'Évaluation du niveau d épuisement professionnel');


-- Ajout de diagnostics de stress
INSERT INTO stress_diagnostics (user_id, stress_test_id, score) VALUES 
(1, 1, 32),
(2, 1, 45);

-- Ajout des activités favorites
INSERT INTO user_favorite_activities (user_id, activity_id) VALUES 
(1, 1),
(1, 3),
(2, 2),
(2, 4);


-- Insertion des résultats de tests
INSERT INTO stress_test_results (stress_test_id, min_score, max_score, interpretation) VALUES
(1, 300, 10000, "Vos risques de développer une maladie somatique sont très élevés. N'hésitez pas à consulter un professionnel."),
(1, 100, 299, "Votre niveau de stress est significatif, prenez soin de vous et essayez de réduire vos sources de stress."),
(1, 0, 99, "Votre niveau de stress est faible, continuez à adopter de bonnes habitudes pour votre bien-être.");


-- Insertion des événements stressants
INSERT INTO stress_test_questions (stress_test_id, question, value) VALUES 
(1,'Mort du conjoint', 100),
(1,'Divorce', 73),
(1,'Séparation des époux', 65),
(1,'Mort d’un parent proche', 63),
(1,'Période de prison', 63),
(1,'Blessure corporelle ou maladie', 53),
(1,'Mariage', 50),
(1,'Licenciement', 47),
(1,'Réconciliation entre époux', 45),
(1,'Départ à la retraite', 45),
(1,'Changement dans la santé d’un membre de la famille', 44),
(1,'Grossesse', 40),
(1,'Difficultés sexuelles', 39),
(1,'Arrivée d’un nouveau membre dans la famille', 39),
(1,'Changement dans l’univers du travail', 39),
(1,'Changement au niveau financier', 38),
(1,'Mort d’un ami proche', 37),
(1,'Changement de fonction professionnelle', 36),
(1,'Modification de la fréquence des scènes de ménage', 35),
(1,'Hypothèque ou emprunt de plus de 3.000 €', 31),
(1,'Saisie sur hypothèque ou sur prêt', 30),
(1,'Changement de responsabilité dans le travail', 29),
(1,'Départ du foyer d’une fille ou d’un fils', 29),
(1,'Difficultés avec les beaux-parents', 29),
(1,'Succès exceptionnel', 28),
(1,'Conjoint commençant ou cessant de travailler', 26),
(1,'Début ou fin des études', 26),
(1,'Changement dans les conditions de vie', 25),
(1,'Changement d’habitudes', 24),
(1,'Difficultés avec son employeur/son manager', 23),
(1,'Changement d’horaires ou de conditions de travail', 20),
(1,'Changement de domicile', 20),
(1,'Changement de lieu d’étude', 20),
(1,'Changement dans les loisirs', 19),
(1,'Changement dans les activités de la paroisse', 19),
(1,'Changement dans les activités sociales', 19),
(1,'Hypothèque ou emprunt de moins de 3.000€', 17),
(1,'Changement dans les habitudes de sommeil', 16),
(1,'Changement du nombre de réunions de famille', 15),
(1,'Changement dans les habitudes alimentaires', 15),
(1,'Vacances', 13),
(1,'Noël', 12),
(1,'Infractions mineures à la loi, contraventions', 11);

-- Insertion des questions pour le test de Burnout
INSERT INTO stress_test_questions (stress_test_id, question, value) VALUES 
(2, 'Je me sens épuisé(e) émotionnellement à cause de mon travail', 10),
(2, 'Je ressens un manque de motivation pour aller au travail', 8),
(2, 'Je trouve mon travail insignifiant et sans intérêt', 7),
(2, 'J’ai des douleurs physiques liées au stress professionnel', 9);