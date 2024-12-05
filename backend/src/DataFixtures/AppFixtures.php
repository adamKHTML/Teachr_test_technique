<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Création des utilisateurs avec le rôle 'ROLE_USER'
        $this->createUser($manager, 'alan@alan.fr', 'Alan', 'Doe', 'pass_1234');
        $this->createUser($manager, 'alice@example.com', 'Alice', 'Smith', 'pass_1234');
        $this->createUser($manager, 'bob@example.com', 'Bob', 'Johnson', 'pass_5678');
        $this->createUser($manager, 'charlie@example.com', 'Charlie', 'Williams', 'pass_9012');

        // Ajout des catégories diversifiées
        $this->createCategory($manager, 'Fruits');
        $this->createCategory($manager, 'Légumes');
        $this->createCategory($manager, 'Boissons');
        $this->createCategory($manager, 'Produits laitiers');
        $this->createCategory($manager, 'Électroménager'); // Catégorie diversifiée
        $this->createCategory($manager, 'Vêtements'); // Catégorie diversifiée

        $manager->flush();
    }

    // Méthode pour créer un utilisateur avec le rôle 'ROLE_USER'
    private function createUser(ObjectManager $manager, string $email, string $firstName, string $lastName, string $plainPassword): void
    {
        $user = new User();
        $user->setEmail($email);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);

        // Hashage du mot de passe
        $password = $this->hasher->hashPassword($user, $plainPassword);
        $user->setPassword($password);

        // Attribution du rôle 'ROLE_USER' uniquement
        $user->setRoles(['ROLE_USER']);

        $manager->persist($user); // Persister l'utilisateur
    }

    // Méthode pour créer une catégorie
    private function createCategory(ObjectManager $manager, string $name): void
    {
        $category = new Category();
        $category->setName($name);

        $manager->persist($category); // Persister la catégorie
    }
}
