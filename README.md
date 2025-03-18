# 🌿 SP-CESIZen – Gestion du Stress et Santé Mentale

> **CESIZen** est une application conçue pour téléphone et pour navigateur. Elle permet de suivre ses émotions et gérer son stress. Elle est développée en **PHP et MySQL** pour le backend, **Vue.js(Ionic) + TypeScript** pour le frontend.

---

## 🚀 Fonctionnalités Principales
✅ **Authentification sécurisée** (JWT)  
✅ **Tracker d'émotions** pour suivre son bien-être  
✅ **Exercices de respiration** interactifs  
✅ **Tests de stress** pour mieux comprendre son état mental  
✅ **PWA : Installation sur mobile & offline**  
✅ **API RESTful pour interagir avec la base de données**  
✅ **Gestion des favoris et historique personnel**

---

## 💂️ Installation & Setup
### Prérequis
- Node.js 18+
- PHP 8.1+
- MySQL 8+
- Android Studio (pour build Android)
### 1. Cloner le projet
```bash
git clone https://github.com/coline-baudrier/SP-CESIZen.git
cd SP-CESIZen
```
### 2. Backend (PHP + MySQL)
```bash
cd backend
composer install
cp config/.env.example config/.env  # Configurer la BDD et la secret key
php -S localhost:8000 -t api
```
**L'API sera disponible sur** `http://localhost:8000`

---

### 3. Frontend (Vue.js + TypeScript)
```bash
cd frontend
ionic build
ionic serve
```

Pour lancer l'application directement sur téléphone :
```bash
# Initialiser Android (une seule fois)
ionic capacitor add android

# Après chaque modification
ionic build
ionic capacitor sync android 

# Lancer sur l'appareil connecté
ionic capacitor run android
```
- Soit lancer sur un téléphone android branché
- Soit lancer sur un émulateur 

📐 **L'application sera disponible sur** `http://localhost:8100`

---

## 🛠️ Tests & Qualité
```bash
backend/tests/
├── unit/  # Tests unitaires (isolés, avec mocks)
│   ├── UserTest.php
│   ├── AuthTest.php
│   ├── EmailTest.php
├── functional/  # Tests fonctionnels (simulent des scénarios complets)
│   ├── AuthFunctionalTest.php
│   ├── EmotionTrackerFunctionalTest.php
├── non_regression/  # Tests de non-régression (vérifient les anciens comportements)
│   ├── UserNonRegressionTest.php
│   ├── AuthNonRegressionTest.php
│   ├── GlobalFunctionalitiesTest.php
```
### ✅ Tests Backend (PHPUnit)
```bash
cd backend
vendor/bin/phpunit --testdox --colors=always --configuration phpunit.xml
```

### ✅ Tests Frontend (Vitest)
```bash
cd frontend
npm run test
```

---

## 🔧 Workflow Git & CI/CD
**Branches principales :**
- `main` → **Production**
- `dev` → **Développement**
- `test` → **Tests avant merge**

**Convention des branches :**
- `feature/nom-fonctionnalité` (Ajout de nouvelle fonctionnalité)
- `fix/nom-bug` (Correction de bug)

---

## 💌 Contact & Contributeurs
👩‍💻 **Développé par** [@coline-baudrier](https://github.com/coline-baudrier)  
📩 **Contact :** coline.baudrier@outlook.com
