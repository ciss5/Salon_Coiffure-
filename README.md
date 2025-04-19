# 💇‍♀️ Mon Salon de Coiffure - Système de Réservation en Ligne

## 🧠 Présentation

Ce projet est une application web complète pour un salon de coiffure permettant aux **clients** de réserver un créneau et aux **administrateurs** de gérer les réservations.  
Il a été réalisé dans le cadre d'un projet de fin d'études avec Angular, PHP et MySQL.

---

## 🎯 Objectifs fonctionnels

### 🔒 Utilisateurs :
- Créer un compte et se connecter.
- Consulter les disponibilités (dates/horaires).
- Recevoir une confirmation après réservation.

### 🧑‍💼 Administrateurs :
- Se connecter avec un compte admin.
- Accéder à la liste des réservations.
- Approuver ou annuler une réservation.

## 🧰 Contraintes techniques

- **Frontend** : Angular, HTML, CSS
- **Backend** : PHP
- **Base de données** : MySQL

### 🖥️ Compatibilité
- Navigateurs : Chrome, Firefox
- Responsive : Oui (ordinateur / smartphone)

### 🔐 Sécurité
- Validation des entrées pour éviter les failles XSS/SQL
- Hachage des mots de passe (`password_hash()` en PHP)

## 📅 Déroulement du projet

| Phase         | Description                                | Durée        |
|---------------|--------------------------------------------|--------------|
| Phase 1       | Planification,approfondure  Angular        | Semaines 1-2 |
| Phase 2       | Backend en PHP + connexion base de données | Semaines 3-4 |
| Phase 3       | Frontend Angular + pages HTML/CSS          | Semaines 5-7 |
| Phase 4       | Tests & rédaction documentation            | Semaine 8    |

---

## 🗃️ Modèle de données (Base de données)

### 🔸 Table `users`
| Champ     | Type     | Détail         |
|-----------|----------|----------------|
| id        | int      | Primary key    |
| name      | varchar  | Nom complet    |
| email     | varchar  | Unique         |
| password  | varchar  | Haché          |
| role      | varchar  |'user'ou'admin' |

### 🔹 Table `reservations`
| Champ     | Type     | Détail                    |
|-----------|----------|---------------------------|
| id        | int      | Primary key               |
| user_id   | int      | Foreign key → users.id    |
| date      | date     | Date de la réservation    |
| time      | time     | Heure de début            |
| end_time  | time     | Heure de fin              |
| status    | varchar  |pending/approved/cancelled |

### 🔹 Table `consentements`
| Champ             | Type       | Description               |
|-------------------|------------|---------------------------|
| id                | INT        | Clé primaire              |
| ip_utilisateur    | VARCHAR    | Adresse IP client         |
| statut            | VARCHAR    | Accepté/Refusé            |
| date_consentement | DATETIME   | Horodatage                |

## 🎨 Design & Maquettes

### Accueil
- Présentation du salon
- Bouton "Se connecter" / "S'inscrire"

### Réservation (Client)
- Sélection de la date et heure
- Confirmation ou message d’erreur

### Tableau de bord (Admin)
- Liste des réservations
- Boutons : Approuver / Annuler

## 👤 Guide Utilisateur

### 💁‍♂️ Pour les clients :
1. Créer un compte via la page d'inscription.
2. Se connecter avec son email et mot de passe.
3. Consulter les créneaux disponibles.
4. Faire une réservation.
5. Recevoir une confirmation par email.

### 👨‍💼 Pour les administrateurs :
1. Se connecter avec un compte admin.
2. Accéder au tableau de bord.
3. Voir toutes les réservations.
4. Approuver ou annuler une réservation.
5. Un email automatique est envoyé à l'utilisateur.

## ⚙️ Guide Technique
## ⚙️ Installation
### Prérequis
- Node.js 14+
- PHP 8.0+
- MySQL 5.7+
- Composer
- Git

### 🚀 Déploiement rapide

1. **Cloner le dépôt**
```bash
https://github.com/ciss5/Salon_Coiffure-.git
cd mon-salon-coiffure
### 📂 Structure des dossiers :
.
├── backend/
│   ├── app/               # Logique métier
│   ├── database/          # Migrations & seeds
│   ├── public/            # Point d'entrée API
│   └── .env.example       # Configuration
├── frontend/
│   ├── src/
│   │   ├── app/           # Composants Angular
│   │   ├── assets/        # Styles/images
│   │   └── environments/  # Configs
│   └── angular.json       # Configuration Angular
└── README.md              # Ce fichier

### 📡 Backend (PHP)
- `users.php` : Connexion, inscription, vérification admin
- `reservation.php` : Création, annulation, approbation


### ⚙️ Frontend (Angular)
- `auth.service.ts` : Authentification & rôle admin
- `admin.guard.ts` : Protège les routes réservées aux admins
- `calendar.component.ts` : Affiche les créneaux avec FullCalendar
- `reservation.component.ts` : Formulaire client

### 🧪 Tests
- Tests manuels avec différents rôles
- Vérification responsive
- Tests de conflits (double réservation)

