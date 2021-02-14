-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 08 fév. 2021 à 13:18
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.24-(to be removed in future macOS)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS pizza_delivery;
GRANT ALL PRIVILEGES on pizza_delivery.* TO 'pizza'@'%' IDENTIFIED BY 'pizza' WITH GRANT OPTION;
USE pizza_delivery;

--
-- Base de données : `pizza_delivery`
--

-- --------------------------------------------------------

--
-- Structure de la table `allocation`
--

CREATE TABLE `allocation` (
  `orderId` int NOT NULL,
  `deliveryManId` int NOT NULL,
  `vehicleId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `deliveryman`
--

CREATE TABLE `deliveryman` (
  `id` int NOT NULL,
  `firstName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vehicle`
--

CREATE TABLE `vehicle` (
  `id` int NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `plate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `allocation`
--
ALTER TABLE `allocation`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `deliveryManId` (`deliveryManId`,`vehicleId`),
  ADD KEY `allocation_ibfk_2` (`vehicleId`);

--
-- Index pour la table `deliveryman`
--
ALTER TABLE `deliveryman`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `deliveryman`
--
ALTER TABLE `deliveryman`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `allocation`
--
ALTER TABLE `allocation`
  ADD CONSTRAINT `allocation_ibfk_1` FOREIGN KEY (`deliveryManId`) REFERENCES `deliveryman` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `allocation_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;
