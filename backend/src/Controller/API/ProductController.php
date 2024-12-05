<?php

namespace App\Controller\API;

use App\Entity\Product;
use App\Entity\Category;
use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;

class ProductController extends AbstractController
{   
    // Route pour obtenir les produits
    #[Route('/api/products', name: 'app_products', methods: ['GET'])] 
    public function index(EntityManagerInterface $em): JsonResponse 
    {
        $products = $em->getRepository(Product::class)->findAll();

        $productsArray = array_map(function(Product $product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'createdAt' => $product->getCreatedAt() ? $product->getCreatedAt()->format('Y-m-d') : null,
                'category' => $product->getCategory() ? $product->getCategory()->getName() : null,
                'image' => $this->getImageSrc($product->getImage()),
            ];
        }, $products);

        return new JsonResponse(['products' => $productsArray]);
    }

      // Route pour créer/ajouter  des catégories 

    #[Route('/api/products', methods: ['POST'])] 
    public function createProduct(
        Request $request,
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = $request->request->all();

        $constraints = new Assert\Collection([
            'name' => new Assert\NotBlank(),
            'description' => new Assert\NotBlank(),
            'price' => [new Assert\NotBlank(), new Assert\Positive()],
            'category' => new Assert\NotBlank(),
        ]);

        $errors = $validator->validate($data, $constraints);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $category = $entityManager->getRepository(Category::class)->find($data['category']);
        if (!$category) {
            return new JsonResponse(['error' => 'Category not found'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'User not found or not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $uploadedFile = $request->files->get('image');
        $newFilename = null;

        if ($uploadedFile) {
            $destination = $this->getParameter('kernel.project_dir') . '/public/uploads';
            $newFilename = uniqid() . '.' . $uploadedFile->guessExtension();
            try {
                $uploadedFile->move($destination, $newFilename);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Failed to upload image'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        $product = new Product();
        $product->setName($data['name'])
            ->setDescription($data['description'])
            ->setPrice($data['price'])
            ->setCategory($category)
            ->setCreatedAt(new \DateTime())
            ->setImage($newFilename)
            ->setUser($user);

        $entityManager->persist($product);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Product created successfully'], Response::HTTP_CREATED);
    }

     // Route pour obtenir un produit selectionné 
    #[Route('/api/products/{id}', methods: ['GET'])]
    public function getProduct(int $id, EntityManagerInterface $em): JsonResponse
    {
        $product = $em->getRepository(Product::class)->find($id);

        if (!$product) {
            return new JsonResponse(['message' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $productData = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'createdAt' => $product->getCreatedAt() ? $product->getCreatedAt()->format('Y-m-d') : null,
            'category' => $product->getCategory() ? $product->getCategory()->getName() : null,
            'image' => $this->getImageSrc($product->getImage()),
        ];

        return new JsonResponse($productData);
    }

      // Route pour mettre à jour des produits - Ne marche pas malheuresement

    #[Route('/api/products/{id}', methods: ['PUT'])]
    public function updateProduct(Request $request, int $id, EntityManagerInterface $em, ValidatorInterface $validator): JsonResponse
    {
        $product = $em->getRepository(Product::class)->find($id);

        if (!$product) {
            throw new NotFoundHttpException('Produit non trouvé');
        }

        $data = $request->request->all();

        $constraints = new Assert\Collection([
            'name' => new Assert\NotBlank(),
            'description' => new Assert\NotBlank(),
            'price' => [new Assert\NotBlank(), new Assert\Positive()],
            'category' => new Assert\NotBlank(),
        ]);

        $errors = $validator->validate($data, $constraints);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);
        $product->setCategory($data['category']);

        if ($request->files->has('image')) {
            $uploadedFile = $request->files->get('image');
            $destination = $this->getParameter('kernel.project_dir') . '/public/uploads';
            $newFilename = uniqid() . '.' . $uploadedFile->guessExtension();
            $uploadedFile->move($destination, $newFilename);

            $product->setImage($newFilename);
        }

        $em->flush();

        return new JsonResponse(['product' => $product], Response::HTTP_OK);
    }

    
     // Route pour supprimer des produits

    #[Route('/api/products/{id}', methods: ['DELETE'])] 
    public function deleteProduct(
        int $id,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $product = $entityManager->getRepository(Product::class)->find($id);
        if (!$product) {
            return new JsonResponse(['message' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $imagePath = $this->getParameter('kernel.project_dir') . '/public/uploads/' . $product->getImage();
        if ($product->getImage() && file_exists($imagePath)) {
            unlink($imagePath);
        }

        $entityManager->remove($product);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Product deleted successfully']);
    }

    private function getImageSrc($image): ?string
    {
        $basePath = '/uploads/';
        if ($image && $image !== '') {
            return $basePath . $image;
        }
        return 'https://via.placeholder.com/300/333333/FFFFFF/?text=Image+Indisponible';
    }
}
