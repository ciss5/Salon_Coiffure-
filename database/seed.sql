-- Création de la base de données
CREATE DATABASE IF NOT EXISTS salon_coiffure;
USE salon_coiffure;

-- Table : users
CREATE TABLE IF NOT EXISTS users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
    );

-- Table : reservations
CREATE TABLE IF NOT EXISTS reservations (
                                            id INT AUTO_INCREMENT PRIMARY KEY,
                                            user_id INT NOT NULL,
                                            date DATE NOT NULL,
                                            time TIME NOT NULL,
                                            end_time TIME NOT NULL,
                                            status ENUM('pending', 'approved', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );

-- Table : consentements
CREATE TABLE IF NOT EXISTS consentements (
                                             id INT AUTO_INCREMENT PRIMARY KEY,
                                             ip_utilisateur VARCHAR(45) NOT NULL,
    statut VARCHAR(10) NOT NULL,
    date_consentement DATETIME DEFAULT CURRENT_TIMESTAMP
    );
