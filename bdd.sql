-- Table : Utilisateurs
CREATE TABLE Utilisateurs (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    pseudo VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe CHAR(60) NOT NULL,
    role ENUM('administrateur', 'client', 'utilisateur') NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table : Projets
CREATE TABLE Projets (
    id_projet INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    nom_projet VARCHAR(100) NOT NULL,
    etat ENUM('en cours', 'validé', 'archivé') NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_modification DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateurs(id_utilisateur)
);

-- Table : Equipements
CREATE TABLE Equipements (
    id_equipement INT AUTO_INCREMENT PRIMARY KEY,
    nom_equipement VARCHAR(100) NOT NULL,
    categorie VARCHAR(50),
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL
);

-- Table : Devis
CREATE TABLE Devis (
    id_devis INT AUTO_INCREMENT PRIMARY KEY,
    id_projet INT NOT NULL,
    total_ht DECIMAL(10, 2) NOT NULL,
    tva DECIMAL(10, 2) NOT NULL,
    total_ttc DECIMAL(10, 2) NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_projet) REFERENCES Projets(id_projet)
);
