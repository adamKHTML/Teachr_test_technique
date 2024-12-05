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
       
        $user = $this->getUser();

       
        if (!$user instanceof UserInterface) {
            return new JsonResponse(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

       
        return new JsonResponse([
            'roles' => $user->getRoles(),  
            'email' => $user->getUserIdentifier(), 
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),   
        ]);
    }

    // Route pour se déconnecter (logout)
    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        
        return new JsonResponse(['message' => 'User logged out successfully'], Response::HTTP_OK);
    }
}
