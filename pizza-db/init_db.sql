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

CREATE DATABASE IF NOT EXISTS pizza_pizza;
GRANT ALL PRIVILEGES on pizza_pizza.* TO 'pizza'@'%' IDENTIFIED BY 'pizza' WITH GRANT OPTION;
USE pizza_pizza;

--
-- Base de données : `pizza_pizza`
--

-- --------------------------------------------------------

--
-- Structure de la table `Ingredient`
--

CREATE TABLE `Ingredient` (
  `id` int NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Pizza`
--

CREATE TABLE `Pizza` (
  `id` int NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `basePrice` int NOT NULL,
  `path` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `PizzaIngredient`
--

CREATE TABLE `PizzaIngredient` (
  `pizzaId` int NOT NULL,
  `ingredientId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Ingredient`
--
ALTER TABLE `Ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Pizza`
--
ALTER TABLE `Pizza`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `PizzaIngredient`
--
ALTER TABLE `PizzaIngredient`
  ADD PRIMARY KEY (`pizzaId`,`ingredientId`),
  ADD KEY `ingredientId` (`ingredientId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Ingredient`
--
ALTER TABLE `Ingredient`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Pizza`
--
ALTER TABLE `Pizza`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `PizzaIngredient`
--
ALTER TABLE `PizzaIngredient`
  ADD CONSTRAINT `pizzaingredient_ibfk_1` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pizzaingredient_ibfk_2` FOREIGN KEY (`pizzaId`) REFERENCES `Pizza` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
