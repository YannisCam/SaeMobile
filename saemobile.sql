-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 10 avr. 2026 à 02:18
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `saemobile`
--

-- --------------------------------------------------------

--
-- Structure de la table `ac`
--

CREATE TABLE `ac` (
  `id_ac` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ac`
--

INSERT INTO `ac` (`id_ac`, `nom`) VALUES
(1, '24.06 hébergement'),
(2, '25.01 gestion de projet'),
(3, '24.03 integration');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id_etudiant` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `numero_groupe` int(11) DEFAULT NULL,
  `note` double DEFAULT NULL,
  `id_grp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id_etudiant`, `nom`, `prenom`, `numero_groupe`, `note`, `id_grp`) VALUES
(8, 'CAMELIN', 'YANNIS', NULL, 18, 9),
(9, 'RAKOTOMAVO', 'MATHIAS', NULL, 18, 9),
(10, 'SOM', 'YOHAN', NULL, 15, 10),
(11, 'LOPERE', 'ALEXANDRE', NULL, 15, 10),
(12, '1', '11', NULL, 12, 11),
(13, '2', '22', NULL, 12, 11);

-- --------------------------------------------------------

--
-- Structure de la table `galerie`
--

CREATE TABLE `galerie` (
  `id_galerie` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `lien_google_drive` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `galerie`
--

INSERT INTO `galerie` (`id_galerie`, `description`, `lien_google_drive`, `titre`) VALUES
(5, NULL, 'https://drive.google.com/file/d/1RLfzsPmxNoJPMXxd5LPEb2gyNm6Gi0VZ/view?usp=drive_link', 'IMAGE'),
(6, NULL, 'https://drive.google.com/file/d/1RLfzsPmxNoJPMXxd5LPEb2gyNm6Gi0VZ/view?usp=drive_link', 'IMAGE');

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `id_grp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`id_grp`) VALUES
(9),
(10),
(11);

-- --------------------------------------------------------

--
-- Structure de la table `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `identifiant` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `login`
--

INSERT INTO `login` (`id_login`, `identifiant`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `ressource`
--

CREATE TABLE `ressource` (
  `id_ressource` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prof` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ressource`
--

INSERT INTO `ressource` (`id_ressource`, `nom`, `prof`) VALUES
(1, 'React', 'Dupont'),
(2, 'Spring Boot', 'Martin');

-- --------------------------------------------------------

--
-- Structure de la table `sae`
--

CREATE TABLE `sae` (
  `id_sae` int(11) NOT NULL,
  `annee` int(11) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `semestre` varchar(255) DEFAULT NULL,
  `taux_reussite` double DEFAULT NULL,
  `referents` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sae`
--

INSERT INTO `sae` (`id_sae`, `annee`, `date_debut`, `date_fin`, `nom`, `semestre`, `taux_reussite`, `referents`) VALUES
(5, 2025, '2025-05-05', '2026-05-05', 'SAE 1', 'S2', 0, NULL),
(6, 2026, '2023-02-02', '2024-02-02', 'SAE 2', 'S6', 0, NULL),
(7, 2025, '2023-02-02', '2023-02-02', 'SAE 3 ', 'S3', 0, 'LAROUSSI ENCORE');

-- --------------------------------------------------------

--
-- Structure de la table `sae_ac`
--

CREATE TABLE `sae_ac` (
  `id` int(11) NOT NULL,
  `id_ac` int(11) DEFAULT NULL,
  `id_sae` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sae_ac`
--

INSERT INTO `sae_ac` (`id`, `id_ac`, `id_sae`) VALUES
(7, 1, 5),
(8, 2, 5),
(9, 2, 6),
(10, 3, 6),
(11, 1, 7),
(12, 2, 7);

-- --------------------------------------------------------

--
-- Structure de la table `sae_galerie`
--

CREATE TABLE `sae_galerie` (
  `id` int(11) NOT NULL,
  `id_galerie` int(11) DEFAULT NULL,
  `id_sae` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sae_galerie`
--

INSERT INTO `sae_galerie` (`id`, `id_galerie`, `id_sae`) VALUES
(5, 5, 5),
(6, 6, 6);

-- --------------------------------------------------------

--
-- Structure de la table `sae_grp`
--

CREATE TABLE `sae_grp` (
  `id` int(11) NOT NULL,
  `lien_code` varchar(255) DEFAULT NULL,
  `lien_site` varchar(255) DEFAULT NULL,
  `id_grp` int(11) DEFAULT NULL,
  `id_sae` int(11) DEFAULT NULL,
  `note` double DEFAULT NULL,
  `numero_groupe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sae_grp`
--

INSERT INTO `sae_grp` (`id`, `lien_code`, `lien_site`, `id_grp`, `id_sae`, `note`, `numero_groupe`) VALUES
(7, 'https://drive.google.com/file/d/1RLfzsPmxNoJPMXxd5LPEb2gyNm6Gi0VZ/view?usp=drive_link', 'https://drive.google.com/file/d/1RLfzsPmxNoJPMXxd5LPEb2gyNm6Gi0VZ/view?usp=drive_link', 9, 5, 18, 1),
(8, 'https://drive.google.com/file/d/1RLfzsPmxNoJPMXxd5LPEb2gyNm6Gi0VZ/view?usp=drive_link', 'https://drive.google.com/file/d/1RLfzsPmxNoJPMXxd5LPEb2gyNm6Gi0VZ/view?usp=drive_link', 10, 6, 15, 1),
(9, 'https://drive.google.com/file/d/1RLfzsPmxNoJPMXxd5LPEb2gyNm6Gi0VZ/view?usp=drive_link', 'https://drive.google.com/file/d/1RLfzsPmxNoJPMXxd5LPEb2gyNm6Gi0VZ/view?usp=drive_link', 11, 7, 12, 1);

-- --------------------------------------------------------

--
-- Structure de la table `sae_ressource`
--

CREATE TABLE `sae_ressource` (
  `id` int(11) NOT NULL,
  `id_ressource` int(11) DEFAULT NULL,
  `id_sae` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sae_ressource`
--

INSERT INTO `sae_ressource` (`id`, `id_ressource`, `id_sae`) VALUES
(5, 1, 5),
(6, 1, 6),
(7, 2, 7);

-- --------------------------------------------------------

--
-- Structure de la table `sae_ue`
--

CREATE TABLE `sae_ue` (
  `id` int(11) NOT NULL,
  `id_sae` int(11) DEFAULT NULL,
  `id_ue` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sae_ue`
--

INSERT INTO `sae_ue` (`id`, `id_sae`, `id_ue`) VALUES
(8, 5, 2),
(9, 5, 3),
(10, 6, 2),
(11, 6, 3),
(12, 7, 3),
(13, 7, 5);

-- --------------------------------------------------------

--
-- Structure de la table `ue`
--

CREATE TABLE `ue` (
  `id_ue` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ue`
--

INSERT INTO `ue` (`id_ue`, `nom`) VALUES
(1, 'Entreprendre'),
(2, 'Comprendre'),
(3, 'Concevoir'),
(4, 'Exprimer\r\n'),
(5, 'Developper\r\n');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ac`
--
ALTER TABLE `ac`
  ADD PRIMARY KEY (`id_ac`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id_etudiant`),
  ADD KEY `FKn956pi50ck5ge5k6cjratvkq7` (`numero_groupe`),
  ADD KEY `FKih9b37ayv1p19ic5wd6f2pqd5` (`id_grp`);

--
-- Index pour la table `galerie`
--
ALTER TABLE `galerie`
  ADD PRIMARY KEY (`id_galerie`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id_grp`);

--
-- Index pour la table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`);

--
-- Index pour la table `ressource`
--
ALTER TABLE `ressource`
  ADD PRIMARY KEY (`id_ressource`);

--
-- Index pour la table `sae`
--
ALTER TABLE `sae`
  ADD PRIMARY KEY (`id_sae`);

--
-- Index pour la table `sae_ac`
--
ALTER TABLE `sae_ac`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkjdtaxp9912f2g9uqoadb9r6e` (`id_ac`),
  ADD KEY `FKh7k9bbtr7njyly6cgtf1j59u8` (`id_sae`);

--
-- Index pour la table `sae_galerie`
--
ALTER TABLE `sae_galerie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkyl0adg7sx83my4lyji2kivsf` (`id_galerie`),
  ADD KEY `FKe90lf9t0opxka8bxxo9fdn1d2` (`id_sae`);

--
-- Index pour la table `sae_grp`
--
ALTER TABLE `sae_grp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjv9vb7aj8fmg8dxlxj07e4a4f` (`id_grp`),
  ADD KEY `FKlrw7833ittuwppf03q6po36uw` (`id_sae`);

--
-- Index pour la table `sae_ressource`
--
ALTER TABLE `sae_ressource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9kt1k394hux80qgaydb3f393a` (`id_ressource`),
  ADD KEY `FKh5k0iio6f8clvwt7imwsi3smt` (`id_sae`);

--
-- Index pour la table `sae_ue`
--
ALTER TABLE `sae_ue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKe1en40wx416e9kda7p6eact1u` (`id_sae`),
  ADD KEY `FKkll7wljwxkvp959aceu77xkp5` (`id_ue`);

--
-- Index pour la table `ue`
--
ALTER TABLE `ue`
  ADD PRIMARY KEY (`id_ue`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ac`
--
ALTER TABLE `ac`
  MODIFY `id_ac` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id_etudiant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `galerie`
--
ALTER TABLE `galerie`
  MODIFY `id_galerie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id_grp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `ressource`
--
ALTER TABLE `ressource`
  MODIFY `id_ressource` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `sae`
--
ALTER TABLE `sae`
  MODIFY `id_sae` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `sae_ac`
--
ALTER TABLE `sae_ac`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `sae_galerie`
--
ALTER TABLE `sae_galerie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `sae_grp`
--
ALTER TABLE `sae_grp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `sae_ressource`
--
ALTER TABLE `sae_ressource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `sae_ue`
--
ALTER TABLE `sae_ue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `ue`
--
ALTER TABLE `ue`
  MODIFY `id_ue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD CONSTRAINT `FKih9b37ayv1p19ic5wd6f2pqd5` FOREIGN KEY (`id_grp`) REFERENCES `groupe` (`id_grp`),
  ADD CONSTRAINT `FKn956pi50ck5ge5k6cjratvkq7` FOREIGN KEY (`numero_groupe`) REFERENCES `groupe` (`id_grp`);

--
-- Contraintes pour la table `sae_ac`
--
ALTER TABLE `sae_ac`
  ADD CONSTRAINT `FKh7k9bbtr7njyly6cgtf1j59u8` FOREIGN KEY (`id_sae`) REFERENCES `sae` (`id_sae`),
  ADD CONSTRAINT `FKkjdtaxp9912f2g9uqoadb9r6e` FOREIGN KEY (`id_ac`) REFERENCES `ac` (`id_ac`);

--
-- Contraintes pour la table `sae_galerie`
--
ALTER TABLE `sae_galerie`
  ADD CONSTRAINT `FKe90lf9t0opxka8bxxo9fdn1d2` FOREIGN KEY (`id_sae`) REFERENCES `sae` (`id_sae`),
  ADD CONSTRAINT `FKkyl0adg7sx83my4lyji2kivsf` FOREIGN KEY (`id_galerie`) REFERENCES `galerie` (`id_galerie`);

--
-- Contraintes pour la table `sae_grp`
--
ALTER TABLE `sae_grp`
  ADD CONSTRAINT `FKjv9vb7aj8fmg8dxlxj07e4a4f` FOREIGN KEY (`id_grp`) REFERENCES `groupe` (`id_grp`),
  ADD CONSTRAINT `FKlrw7833ittuwppf03q6po36uw` FOREIGN KEY (`id_sae`) REFERENCES `sae` (`id_sae`);

--
-- Contraintes pour la table `sae_ressource`
--
ALTER TABLE `sae_ressource`
  ADD CONSTRAINT `FK9kt1k394hux80qgaydb3f393a` FOREIGN KEY (`id_ressource`) REFERENCES `ressource` (`id_ressource`),
  ADD CONSTRAINT `FKh5k0iio6f8clvwt7imwsi3smt` FOREIGN KEY (`id_sae`) REFERENCES `sae` (`id_sae`);

--
-- Contraintes pour la table `sae_ue`
--
ALTER TABLE `sae_ue`
  ADD CONSTRAINT `FKe1en40wx416e9kda7p6eact1u` FOREIGN KEY (`id_sae`) REFERENCES `sae` (`id_sae`),
  ADD CONSTRAINT `FKkll7wljwxkvp959aceu77xkp5` FOREIGN KEY (`id_ue`) REFERENCES `ue` (`id_ue`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
