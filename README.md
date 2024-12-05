# Projet Teach'r - Test Technique

## Présentation de l'application

L'application **Teach'r** est une plateforme permettant de gérer des produits et leurs catégories, avec une interface frontend réalisée en React et un backend en Symfony. Elle offre des fonctionnalités d'ajout, de modification, de suppression et de filtrage des produits et des catégories. L'authentification est sécurisée via JSON Web Token (JWT) pour protéger les endpoints sensibles.

---

## Brief

L'objectif de cette application est de créer un système de gestion de produits et de catégories, avec une interface conviviale, sécurisée et performante. L'API backend est construite en utilisant Symfony avec API Platform, tandis que le frontend est développé avec React.js et Tailwind CSS.

---

## Endpoints API

Voici un résumé des principaux endpoints de l'API Symfony (RESTful) :

### Authentification

- `POST /api/login` : Génère un JWT pour l'authentification de l'utilisateur.
- `POST /api/register` : Permet à un utilisateur de s'enregistrer.

### Produits

- `GET /api/products` : Récupère la liste des produits.
- `POST /api/products` : Crée un nouveau produit.
- `PUT /api/products/{id}` : Met à jour un produit existant.
- `DELETE /api/products/{id}` : Supprime un produit.

### Catégories

- `GET /api/categories` : Récupère la liste des catégories.
- `POST /api/categories` : Crée une nouvelle catégorie.
- `PUT /api/categories/{id}` : Met à jour une catégorie existante.
- `DELETE /api/categories/{id}` : Supprime une catégorie.

---

## Installation du projet

### Prérequis

Avant de commencer l'installation, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js et npm** pour le frontend
- **PHP 8+** et **Composer** pour le backend
- **Serveur MySQL** pour la base de données
- **Extension `fileinfo`** activée pour PHP

---

### Installation

#### 1. Cloner le projet

Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/adamKHTML/Teachr_test_technique.git
```


#### Installation du backend (Symfony)

Allez dans le répertoire du backend et installez les dépendances :

```bash
cd backend
composer install
```


#### Migration de la base de données

Ensuite, effectuez les migrations de la base de données pour créer les tables nécessaires :

```bash
php bin/console doctrine:migrations:migrate
php bin/console d:f:l 
```
#### Démarrer le serveur Symfony

Lancez le serveur Symfony pour que votre API soit accessible localement :
```bash
symfony serve --no-tls
```



####  Installation du frontend (React)

Allez dans le répertoire client et installez les dépendances :

```bash
cd client
npm install
npm run dev

```

### Stacks techniques

Frontend : React.js, Tailwind CSS
Backend : Symfony avec API Platform
Base de données : MySQL
Authentification : JWT (JSON Web Token)
## Structure de la base de données

La base de données de l'application est constituée de plusieurs tables essentielles : **category**, **product**, **user**, et quelques autres pour la gestion de l'API et des migrations.

### Tables principales :

#### 1. Utilisateur (`user`)

- **id** : Identifiant unique de l'utilisateur (clé primaire).
- **first_name** : Prénom de l'utilisateur.
- **last_name** : Nom de l'utilisateur.
- **email** : Adresse e-mail de l'utilisateur (doit être unique).
- **password** : Mot de passe haché de l'utilisateur.
- **roles** : Liste des rôles de l'utilisateur (au format JSON), par exemple `["ROLE_USER"]`.

#### 2. Catégorie (`category`)

- **id** : Identifiant unique de la catégorie (clé primaire).
- **name** : Nom de la catégorie (par exemple : Fruits, Légumes, etc.).

#### 3. Produit (`product`)

- **id** : Identifiant unique du produit (clé primaire).
- **user_id** : Identifiant de l'utilisateur qui a créé le produit (clé étrangère référencée de la table `user`).
- **category_id** : Identifiant de la catégorie à laquelle appartient le produit (clé étrangère référencée de la table `category`).
- **name** : Nom du produit (par exemple : Banane, Gomu Gomu no Mi).
- **description** : Description du produit.
- **price** : Prix du produit.
- **created_at** : Date de création du produit.
- **image** : URL de l'image du produit.



### Associations entre les tables :

- **Produit** (`product`) et **Utilisateur** (`user`) :
  - Chaque produit est associé à un utilisateur, via la clé étrangère `user_id` dans la table `product` qui fait référence à la colonne `id` de la table `user`.

- **Produit** (`product`) et **Catégorie** (`category`) :
  - Chaque produit est également associé à une catégorie via la clé étrangère `category_id` dans la table `product`, qui fait référence à la colonne `id` de la table `category`.

### Diagramme de la base de données

Un diagramme relationnel de la base de données pourrait illustrer les relations suivantes :

- **Produit** -> **Utilisateur** (relation plusieurs à un)
- **Produit** -> **Catégorie** (relation plusieurs à un)
  
Ainsi, chaque produit appartient à une catégorie et est créé par un utilisateur. Un utilisateur peut créer plusieurs produits, mais chaque produit n'appartient qu'à une seule catégorie.


## Features 

### Authentification sécurisée

L'application utilise JSON Web Tokens (JWT) pour authentifier les utilisateurs. Après une connexion réussie, un JWT est généré et envoyé au client. Ce token est ensuite inclus dans l'en-tête Authorization de chaque requête nécessitant des privilèges d'administrateur.


### Gestion des produits et des catégories

Affichage des produits et des catégories via l'API.
CRUD complet pour les produits : ajouter, modifier, supprimer, lister.
CRUD complet pour les catégories : ajouter, modifier, supprimer, lister.

### Connexion de l’utilisateur :

Lorsqu'un utilisateur envoie une requête POST à l’endpoint /api/login avec ses identifiants, un JWT est généré et renvoyé en cas de succès.

### Filtres et Recherche


Filtrage des produits par catégorie.
Tri des produits par prix (croissant/décroissant) et par date (récent/ancien).

## Diagramme de séquence : Login et récupération du JWT

![Untitled diagram-2024-11-23-171348](https://github.com/user-attachments/assets/e7f321df-ddfd-4261-9d18-e2c8f6a252e6)

## Charte graphique 

Pour la charte graphique et la typographie, je me suis inspiré du site Teach'r, tout en y ajoutant ma propre touche pour refléter la dimension produit. Voici les inspirations qui m'ont guidé dans ce processus. 

## Wirerames  - Maquette

![Group 1 (3)](https://github.com/user-attachments/assets/1a520afd-d3dc-4edf-81ef-b3dd19582507)

## Problèmes connus
Mise à jour des produits : Actuellement, la mise à jour des produits n'est pas opérationnelle. Ce problème est en cours de résolution.



## N.B

