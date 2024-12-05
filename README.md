## Projet 

## Présentation de l'application
Cette application est une plateforme éducative permettant aux utilisateurs de consulter et de suivre divers modules d'apprentissage. Conçue avec une interface utilisateur réactive et une fonctionnalité d'authentification, elle est développée en React pour le frontend et une API Symfony pour le backend.

# Brief
L'application permet aux utilisateurs de se connecter de manière sécurisée et de découvrir une liste de modules éducatifs. Les utilisateurs authentifiés peuvent consulter les informations détaillées de chaque module, incluant le titre, la description et la date de création.

# Endpoints

GET /api/modules : Récupère la liste des modules disponibles.
POST /api/login : Authentifie un utilisateur et retourne un token JWT.
GET /api/user/{id} : Récupère les informations d’un utilisateur spécifique.

## Installation du projet

# Prérequis : 

Node.js et npm pour le frontend
PHP 8+ et Composer pour le backend
Serveur MySQL 

# Installation

Cloner le projet :


git clone https://github.com/adamKHTML/ProjectModulesADK.git 

cd PROJET_MODULES_ADK

Installation du backend Symfony :

cd app
composer install

Migration de la base de données :

php bin/console doctrine:migrations:migrate

 php bin/console d:f:l    

symfony serve --no-tls

Installation du frontend React :

cd client
npm install
npm run dev

## Stacks techniques
Frontend : React
Backend : Symfony API Platform
Base de données : MySQL
Authentification : JWT (JSON Web Token)

## Structure de la base de donnée  

# Tables principales : 

Utilisateur (user)

id : int, identifiant unique
first_name : varchar(255), prénom de l'utilisateur
last_name : varchar(255), nom de famille de l'utilisateur
email : varchar(255), adresse email unique de l'utilisateur
token_api : varchar(255), token pour l’API utilisé lors de l'authentification
roles : json, rôles attribués à l'utilisateur
password : varchar(255), mot de passe crypté de l’utilisateur


Module (module)

id : int, identifiant unique
title : varchar(255), titre du module
description : longtext, description détaillée du module
created_at : datetime, date de création

Association (user_module) : 

user_id : int, identifiant de l’utilisateur
module_id : int, identifiant du module


# Diagramme de la base de données


## Features 

# Fonctionnalités principales

Connexion sécurisée et accès aux modules : Les utilisateurs peuvent se connecter de manière sécurisée et accéder à une liste de modules.
Détail des modules : Affiche les informations détaillées de chaque module.

# Authentification JWT
L'application utilise JSON Web Tokens (JWT) pour gérer l'authentification et sécuriser les requêtes API.

# Connexion de l’utilisateur :

Lorsqu'un utilisateur envoie une requête POST à l’endpoint /api/login avec ses identifiants, un JWT est généré et renvoyé en cas de succès.

# Stockage et gestion du token JWT :

Une fois le token reçu, il est stocké côté client (dans localStorage, sessionStorage ou géré par un store d’état comme Redux).
Un provider ou un store est utilisé pour faciliter l'accès global au token JWT et aux données utilisateur.
Ce token est ensuite inclus dans l’en-tête Authorization (Bearer {token}) pour toutes les requêtes nécessitant une authentification.

# Accès aux endpoints protégés :

Pour accéder aux ressources protégées, telles que les modules, le client envoie le token dans l’en-tête Authorization.
Si le token est valide, le serveur autorise l’accès ; sinon, une réponse d’erreur est renvoyée.

# Récupération des modules : 
Les modules sont récupérés via un appel à l’API sur l’endpoint /api/modules, et gérés côté client via un provider ou un store. Cela permet de centraliser la récupération et l’affichage des modules, ainsi que de synchroniser les données entre les composants de l’application.

# Processus côté client :
Le client envoie une requête GET vers /api/modules, incluant le token JWT dans l’en-tête Authorization.
Le provider ou store reçoit et stocke la liste des modules, permettant une mise à jour automatique de l'interface utilisateur.
Chaque composant de l’application accède aux données des modules via le store, simplifiant la gestion de l’état global.

### Wirerames 





