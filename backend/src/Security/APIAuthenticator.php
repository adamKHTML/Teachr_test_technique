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
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager; 

class APIAuthenticator extends AbstractAuthenticator
{
    private JWTManager $jwtManager; 

    public function __construct(JWTManager $jwtManager)
    {
        $this->jwtManager = $jwtManager;  
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

        
        $userData = [
            'roles' => $user->getRoles(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
        ];

       
        $jwt = $this->jwtManager->create($user);  

        return new JsonResponse([
            'message' => 'Authentication successful.',
            'token' => $jwt,  
            'user' => $userData  
        ], Response::HTTP_OK);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse([
            'message' => $exception->getMessage()
        ], Response::HTTP_UNAUTHORIZED);
    }
}
