CREATE DATABASE nom_appli;
USE nom_appli;
CREATE TABLE `users` (
  `username` varchar(35) PRIMARY KEY,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
