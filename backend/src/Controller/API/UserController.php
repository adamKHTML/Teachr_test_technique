<?php

namespace App\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserController extends AbstractController
{
    // Route pour obtenir les informations de l'utilisateur authentifié
    #[Route('/api/me', name: 'api_me')]
    #[IsGranted("ROLE_USER")] 
    public function me(): JsonResponse 
    {
        // Récupérer l'utilisateur authentifié
        $user = $this->getUser();

        // Vérifier si l'utilisateur est authentifié
        if (!$user instanceof UserInterface) {
            return new JsonResponse(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        // Retourner les données de l'utilisateur au format JSON
        return new JsonResponse([
            'roles' => $user->getRoles(),  // Récupérer les rôles de l'utilisateur
            'email' => $user->getUserIdentifier(), // Utiliser getUserIdentifier() pour l'email (ou getEmail() selon ton choix)
            'firstName' => $user->getFirstName(), // Récupérer le prénom
            'lastName' => $user->getLastName(),   // Récupérer le nom de famille
        ]);
    }

    // Route pour se déconnecter (logout)
    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        // Symfony gère automatiquement le logout, donc cette méthode peut être vide
        return new JsonResponse(['message' => 'User logged out successfully'], Response::HTTP_OK);
    }
}
