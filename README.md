# 🌿 SP-CESIZen – Gestion du Stress et Santé Mentale

> **SP-CESIZen** est une application PWA conçue pour aider à la gestion du stress et au suivi des émotions. Développée en **Vue.js + TypeScript** pour le frontend et **PHP + MySQL** pour le backend.

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
### 🔄 1. Cloner le projet
```bash
git clone https://github.com/coline-baudrier/SP-CESIZen.git
cd SP-CESIZen
```

### 🚀 2. Backend (PHP + MySQL)
```bash
cd backend
composer install
cp config/.env.example config/.env  # Configurer la BDD et la secret key
php -S localhost:8000 -t api
```
📐 **L'API sera disponible sur** `http://localhost:8000`

---

### 🎨 3. Frontend (Vue.js + TypeScript)
```bash
cd frontend
npm install
npm run dev
```
📐 **L'application sera disponible sur** `http://localhost:5173`

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
- `hotfix/nom-patch` (Correction urgente en production)

✅ **CI/CD avec GitHub Actions :**
- **Lint & Tests** à chaque push
- **Déploiement automatique** (en production)

---

## 💪 TODO & Améliorations
- [ ] Ajouter la gestion des notifications 📩
- [ ] Améliorer l’UI avec des animations ⚡
- [ ] Ajouter un mode sombre 🌙

📌 **Propose tes idées en créant une issue !** 🛠️

---

## 📄 Licence
Ce projet est sous licence **MIT**.

---

## 💌 Contact & Contributeurs
👩‍💻 **Développé par** [@coline-baudrier](https://github.com/coline-baudrier)  
📩 **Contact :** coline.baudrier@outlook.com
