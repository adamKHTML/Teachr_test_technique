import React, { useState } from 'react';
import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from '../api/endpoints/category';
import Navbar from '../components/NavBar';

const Category: React.FC = () => {
    const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [formData, setFormData] = useState<{ id: number; name: string } | { id?: undefined; name: string }>({
        name: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, name: e.target.value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.id) {

            await updateCategory(formData);
        } else {

            await createCategory({ name: formData.name });
        }

        setFormData({ id: undefined, name: '' });
    };

    const handleEditClick = (category: { id: number; name: string }) => {
        setFormData(category);
    };

    const handleDeleteClick = async (id: number) => {
        await deleteCategory(id);
    };

    if (isLoading) return <div className="text-center">Chargement...</div>;
    if (error) return <div className="text-center text-red-500">Erreur lors du chargement des catégories</div>;

    const categoryList = Array.isArray(categoriesData) ? categoriesData : categoriesData?.categories || [];

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gérer les Catégories</h2>

                {/* Formulaire d'ajout/modification */}
                <form onSubmit={handleFormSubmit} className="mb-6">
                    <div className="flex gap-4 items-center">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Nom de la catégorie"
                            className="border p-2 rounded w-full"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {formData.id ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>

                {/* Liste des catégories */}
                <div className="section">
                    <div className="flex flex-col gap-4">
                        {categoryList.length > 0 ? (
                            categoryList.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between p-4 bg-white border-4 border-blue-500 rounded-lg shadow-lg"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-500 rounded-lg mr-4"></div>
                                        <span className="text-lg font-bold text-blue-500">{category.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditClick(category)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-400"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(category.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Aucune catégorie disponible.</p>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Category;
