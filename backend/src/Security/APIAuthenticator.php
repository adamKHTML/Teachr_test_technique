<?php
namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Core\User\UserInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager; // Importer la classe JWTManager

class APIAuthenticator extends AbstractAuthenticator
{
    private JWTManager $jwtManager;  // Déclarer une propriété pour le service JWTManager

    public function __construct(JWTManager $jwtManager)
    {
        $this->jwtManager = $jwtManager;  // Injection du service JWTManager
    }

    public function supports(Request $request): ?bool
    {
        return $request->headers->has('Authorization') && str_contains($request->headers->get('Authorization'), 'Bearer');
    }

    public function authenticate(Request $request): Passport
    {
        $identifier = trim(str_replace('Bearer', '', $request->headers->get('Authorization')));
        return new SelfValidatingPassport(new UserBadge($identifier));
    }

    public function createToken(Passport $passport, string $firewallName): TokenInterface
    {
        // Créez un token authentifié avec les informations du passeport
        return new PreAuthenticatedToken(
            $passport->getUser(),
            $firewallName,
            $passport->getUser()->getRoles()
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        $user = $token->getUser();

        if (!$user instanceof UserInterface) {
            return new JsonResponse(['message' => 'User not found.'], Response::HTTP_UNAUTHORIZED);
        }

        // Créer un JWT avec les informations utilisateur (incluant firstName)
        $userData = [
            'roles' => $user->getRoles(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
        ];

        // Créer le token JWT
        $jwt = $this->jwtManager->create($user);  // Cette méthode utilise le User pour générer un token

        return new JsonResponse([
            'message' => 'Authentication successful.',
            'token' => $jwt,  // Retourner le token dans la réponse
            'user' => $userData  // Vous pouvez aussi retourner les informations supplémentaires de l'utilisateur
        ], Response::HTTP_OK);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse([
            'message' => $exception->getMessage()
        ], Response::HTTP_UNAUTHORIZED);
    }
}
