-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 14 fév. 2025 à 02:51
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `start-alarm-bdd`
--

-- --------------------------------------------------------

--
-- Structure de la table `devis`
--

DROP TABLE IF EXISTS `devis`;
CREATE TABLE IF NOT EXISTS `devis` (
  `id_devis` int NOT NULL AUTO_INCREMENT,
  `id_projet` int NOT NULL,
  `total_ht` decimal(10,2) NOT NULL,
  `tva` decimal(10,2) NOT NULL,
  `total_ttc` decimal(10,2) NOT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_devis`),
  KEY `id_projet` (`id_projet`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `equipements`
--

DROP TABLE IF EXISTS `equipements`;
CREATE TABLE IF NOT EXISTS `equipements` (
  `id_equipement` int NOT NULL AUTO_INCREMENT,
  `nom_equipement` varchar(100) NOT NULL,
  `categorie` varchar(50) DEFAULT NULL,
  `description` text,
  `Coefficient_efficacite` decimal(10,1) NOT NULL DEFAULT '0.0',
  `prix` decimal(10,1) NOT NULL,
  PRIMARY KEY (`id_equipement`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `equipements`
--

INSERT INTO `equipements` (`id_equipement`, `nom_equipement`, `categorie`, `description`, `Coefficient_efficacite`, `prix`) VALUES
(7, 'Détecteur d’ouverture avec choc', '', 'Sur ouverture porte ou fenêtre', 0.8, 94.5),
(8, 'Détecteur d’ouverture', NULL, 'Porte d’entrée, porte fenêtre, porte de service, galandage, fenêtre', 0.8, 85.5),
(9, 'Détecteur d’ouverture double', NULL, 'Baies coulissantes', 0.8, 171.0);

-- --------------------------------------------------------

--
-- Structure de la table `ouvertures`
--

DROP TABLE IF EXISTS `ouvertures`;
CREATE TABLE IF NOT EXISTS `ouvertures` (
  `id_ouverture` int NOT NULL AUTO_INCREMENT,
  `type_ouverture` varchar(50) NOT NULL,
  `materiau` varchar(50) NOT NULL,
  `Coefficient_vulnerabilite` decimal(10,1) NOT NULL DEFAULT '1.0',
  PRIMARY KEY (`id_ouverture`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `ouvertures`
--

INSERT INTO `ouvertures` (`id_ouverture`, `type_ouverture`, `materiau`, `Coefficient_vulnerabilite`) VALUES
(1, 'Fenêtre à la française', 'Bois', 0.2),
(2, 'Fenêtre à la française', 'PVC', 0.2),
(3, 'Coulissant ', 'Alu', 0.2),
(4, 'Galandage simple', '?', 0.2),
(5, 'Glandage double', '?', 0.2),
(6, 'Porte de garage sectionnelle', '?', 0.2),
(7, 'Volet de garage roulant', '?', 0.2),
(8, 'Porte de garage baie coulissante', '?', 0.2),
(9, 'Imposte vitré', '?', 0.2),
(10, 'Fenêtre avec barreaux', '?', 0.2),
(11, 'Porte d’entrée', 'Bois', 0.2),
(12, 'Porte d’entrée', 'PVC', 0.2),
(13, 'Porte d’entrée', 'Alu', 0.2);

-- --------------------------------------------------------

--
-- Structure de la table `projets`
--

DROP TABLE IF EXISTS `projets`;
CREATE TABLE IF NOT EXISTS `projets` (
  `id_projet` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `nom_projet` varchar(100) NOT NULL,
  `etat` enum('en cours','validé','archivé') NOT NULL,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_modification` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_projet`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` char(60) NOT NULL,
  `role` enum('administrateur','client','utilisateur') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'utilisateur',
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `email`, `mot_de_passe`, `role`, `date_creation`) VALUES
(1, 'pomme@pomme.pomme', 'pomme', 'utilisateur', '2025-01-07 11:49:29'),
(5, 'test@example.com', '$2b$10$rRY39K.EqmFbTkhX8PpN1eNUxsFr5J1Hy4FkqBayzk54CFAZ7RFCW', 'utilisateur', '2025-01-08 14:53:01'),
(6, 'a@a.a', '$2b$10$8tqmmGCAta1Yvp3SSVTO5.3iZKP9.UwcAkfbyrJu.282c/bnnjxj.', 'utilisateur', '2025-01-08 14:57:04'),
(13, 'a@a.adadz', '$2b$10$guYDfBwEQfSDtuUvCh8fae2aF.YUp9J8MRiHDn5WVBZcmDEJHjvaK', 'utilisateur', '2025-01-08 15:23:08'),
(14, 'tg@mail.a', '$2b$10$lZqaWpVs6jUqLQJe4x4alObH3JvxgrTbjxC6s5QycrcRyztsCwIp6', 'utilisateur', '2025-02-14 03:49:13');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
