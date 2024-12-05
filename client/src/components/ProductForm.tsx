import React, { useEffect, useState } from 'react';
import { useCreateProductMutation, useUpdateProductMutation } from '../api/endpoints/product';
import { useGetCategoriesQuery } from '../api/endpoints/category';

interface ProductFormProps {
    onClose: () => void;
    product?: {
        id: number;
        name: string;
        description: string;
        price: number;
        category: string;
        image: string | null;
    };
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, product }) => {
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const { data: categoriesData, error: categoryError, isLoading: isLoadingCategories } = useGetCategoriesQuery();

    const categoryList = Array.isArray(categoriesData) ? categoriesData : categoriesData?.categories || [];

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: null as File | null,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                image: null,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            category: e.target.value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const file = input.files![0];
        if (file && file.type.startsWith("image/")) {
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
        } else {
            alert("Veuillez télécharger une image valide.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('price', formData.price.toString());
        productData.append('category', formData.category);

        if (formData.image) {
            productData.append('image', formData.image);
        }

        if (product) {
            productData.append('id', product.id.toString()); // Ajoute l'ID si on est en mode édition
        }

        try {
            if (product) {
                await updateProduct(productData).unwrap();
            } else {
                await createProduct(productData).unwrap();
            }
            onClose();
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du produit:', error);
        }
    };

    if (isLoadingCategories) {
        return <div>Chargement des catégories...</div>;
    }

    if (categoryError) {
        return <div>Erreur lors du chargement des catégories</div>;
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">
                    {product ? 'Modifier le produit' : 'Ajouter un produit'}
                </h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Prix</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleCategoryChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            {categoryList.length > 0 ? (
                                categoryList.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Aucune catégorie disponible</option>
                            )}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Image actuelle</label>
                        {product?.image && (
                            <img
                                src={`http://localhost:8000${product.image}`}
                                alt="Aperçu de l'image actuelle"
                                className="w-full h-32 object-cover mb-2 border"
                            />
                        )}
                        <label className="block text-sm font-medium text-gray-700">Changer l'image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {product ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
