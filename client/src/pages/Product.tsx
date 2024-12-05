import React, { useState } from 'react';
import { useGetProductsQuery } from '../api/endpoints/product';
import { Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import Navbar from '../components/NavBar';
import Filter from '../components/Filter';

const Product: React.FC = () => {
    const { data: productsData, isLoading } = useGetProductsQuery();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [filters, setFilters] = useState<{
        category?: string;
        priceFilter?: string;
        dateOrder?: 'recent' | 'old' | undefined;
    }>({
        category: '',
        priceFilter: '',
        dateOrder: undefined,
    });

    const productList = Array.isArray(productsData) ? productsData : productsData?.products || [];
    const categories = Array.isArray(productsData)
        ? [...new Set(productList.map((product) => product.category))]  // Extraction des catégories uniques
        : [];

    const getImageSrc = (image: string | null) => {
        const basePath = 'http://localhost:8000';
        return image && image.trim() !== ''
            ? `${basePath}${image}`
            : 'https://via.placeholder.com/300/333333/FFFFFF/?text=Image+Indisponible';
    };

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    const filteredProducts = productList
        .filter((product) => {
            if (filters.category && product.category !== filters.category) return false;
            if (filters.priceFilter) {
                if (filters.priceFilter === 'asc') return product.price; // Tri ascendant
                if (filters.priceFilter === 'desc') return -product.price; // Tri descendant
                if (filters.priceFilter === '15' && product.price > 15) return false; // Moins de 15€
                if (filters.priceFilter === '30' && product.price > 30) return false; // Moins de 30€
            }
            return true;
        })
        .sort((a, b) => {
            if (filters.priceFilter === 'asc') return a.price - b.price; // Ascendant
            if (filters.priceFilter === 'desc') return b.price - a.price; // Descendant

            if (filters.dateOrder === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (filters.dateOrder === 'old') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

            return 0;
        });

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="loader">Chargement...</div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Liste des produits</h2>

                <Filter
                    categories={categories.map((category, index) => ({ id: index.toString(), name: category }))}
                    onFilterChange={handleFilterChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative border rounded-lg overflow-hidden shadow-lg"
                            >
                                <div className="relative h-56 w-full">
                                    <img
                                        src={getImageSrc(product.image)}
                                        alt={product.name || 'Image produit'}
                                        className="object-cover w-full h-full group-hover:opacity-75 transition duration-300 ease-in-out"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900">{product.name}</span>
                                        <span className="text-lg font-semibold text-blue-500">${product.price}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-2">{product.category}</div>
                                    <div className="text-sm text-gray-500 mt-2 opacity-0">{product.createdAt}</div> {/* Date cachée */}
                                </div>
                                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center">
                                    <Link
                                        to={`/product/edit/${product.id}`}
                                        className="text-white font-semibold text-xl"
                                    >
                                        Plus en détails
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucun produit correspondant trouvé.</p>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsFormVisible(true)}
                        className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                        aria-label="Ajouter un produit"
                    >
                        Ajouter un produit
                    </button>
                </div>

                {isFormVisible && <ProductForm onClose={() => setIsFormVisible(false)} />}
            </div>
        </>
    );
};

export default Product;
