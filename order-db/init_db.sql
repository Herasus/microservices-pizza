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

CREATE DATABASE IF NOT EXISTS pizza_order;
GRANT ALL PRIVILEGES on pizza_order.* TO 'pizza'@'%' IDENTIFIED BY 'pizza' WITH GRANT OPTION;
USE pizza_order;

--
-- Base de données : `pizza_order`
--

-- --------------------------------------------------------

--
-- Structure de la table `customerorder`
--

CREATE TABLE `customerorder` (
  `id` int NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderDate` timestamp NOT NULL,
  `deliveryDate` timestamp NULL DEFAULT NULL,
  `totalPrice` int NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pizzaorder`
--

CREATE TABLE `pizzaorder` (
  `orderId` int NOT NULL,
  `pizzaId` int NOT NULL,
  `size` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `customerorder`
--
ALTER TABLE `customerorder`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pizzaorder`
--
ALTER TABLE `pizzaorder`
  ADD PRIMARY KEY (`orderId`,`pizzaId`,`size`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `customerorder`
--
ALTER TABLE `customerorder`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `pizzaorder`
--
ALTER TABLE `pizzaorder`
  ADD CONSTRAINT `pizzaorder_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `customerorder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
