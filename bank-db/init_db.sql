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

CREATE DATABASE IF NOT EXISTS pizza_bank;
GRANT ALL PRIVILEGES on pizza_bank.* TO 'pizza'@'%' IDENTIFIED BY 'pizza' WITH GRANT OPTION;
USE pizza_bank;

--
-- Base de données : `pizza_bank`
--

-- --------------------------------------------------------

--
-- Structure de la table `userbalance`
--

CREATE TABLE `userbalance` (
  `userId` int NOT NULL,
  `balance` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `userbalance`
--
ALTER TABLE `userbalance`
  ADD PRIMARY KEY (`userId`);
COMMIT;
