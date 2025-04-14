# SP-CESIZen – Gestion du Stress et Santé Mentale

> **CESIZen** est une application conçue pour téléphone. Elle permet de suivre ses émotions et gérer son stress. Elle est développée en **PHP et MySQL** pour le backend, **React Native** pour le frontend.

---

## Fonctionnalités Principales

- [ ] Authentification en utilisateur ou en administrateur
- [ ] Utilisation en tant qu'invité
- [ ] Tracker d'émotions journalier
- [ ] Visualisation d'activités de relaxation (favoris sauvegardés)
- [ ] Réalisation de tests de stress (avec sauvegarde de résultats)
- [ ] Réalisation d'exercices de respiration
- [ ] Création de nouveaux exercices de respiration
- [ ] Gestion en administrateur :
  - [ ] Gestion des tests de stress
  - [ ] Gestion des exercices de respiration
  - [ ] Gestion des activités de relaxation
  - [ ] Gestion des utilisateurs (supprimer un compte, création administrateur)

---

## Installation & Setup

### Prérequis

- Node.js 18+
- PHP 8.3+
- MySQL 8+
- Expo CLI
- Android Studio (pour émuler une application mobile)

### 1. Cloner le projet

```bash
git clone https://github.com/coline-baudrier/SP-CESIZen.git
cd SP-CESIZen
```

### 2. Backend (PHP + MySQL)

```bash
cd backend
composer install
cp .env.example .env  # Configurer la BDD et la secret key
php -S localhost:8000 -t api
```

Les scripts SQL sont trouvables dans `backend/sql/createDatabase.sql` et `backend/sql/insertInDatabase.sql`

**L'API sera disponible sur** `http://51.178.183.31/cesizen/api/`

---

### 3. Frontend (React Native avec Expo)

```bash
cd frontend
npm install
npm run android # Pour lancer sur votre émulateur
```

L'application démarrera directement sur l'émulateur (ou votre téléphone).

---

## Tests & Qualité

```bash
backend/tests/
├── unit/  # Tests unitaires (isolés, avec mocks)
│   ├── UserTest.php
│   ├── EmotionTrackerTest.php
│   ├── UserFavoriteActivityTest.php
├── functional/  # Tests fonctionnels (simulent des scénarios complets)
│   ├── AuthFunctionalTest.php
│   ├── EmotionTrackerFunctionalTest.php
│   ├── UserFavoriteActivityFunctionalTest.php
├── non_regression/  # Tests de non-régression (vérifient les anciens comportements)
│   ├── UserNonRegressionTest.php
│   ├── UserFavoriteActivityNonRegressionTest.php
│   ├── EmotionTrackerNonRegressionTest.php
```

### Tests Backend (PHPUnit)

```bash
cd backend
vendor/bin/phpunit --testdox --colors=always --configuration phpunit.xml
```

### Tests Frontend

A mettre en place.

---

## Workflow Git & CI/CD

**Branches principales :**

- `main` → **Production**
- `dev` → **Développement**
- `test` → **Vérification et réalisation de test avant passage en production**

**Convention des branches :**

- `frontend/nom-view` (Ajout dans la partie frontend)
- `backend/nom-feature` (Ajout dans la partie backend)
- `api/nom-feature` (Ajout dans l'API)

---

## Contact & Contributeurs

👩‍💻 **Développé par** [@coline-baudrier](https://github.com/coline-baudrier)  
📩 **Contact :** coline.baudrier@outlook.com
