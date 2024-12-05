import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery, useDeleteProductMutation } from '../api/endpoints/product';
import Navbar from './NavBar';
import ProductForm from './ProductForm';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, error, isLoading } = useGetProductQuery(Number(id));
    const [deleteProduct] = useDeleteProductMutation();
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const getImageSrc = (image: string | null) => {
        const basePath = 'http://localhost:8000/';
        return image && image.trim() !== '' ? `${basePath}${image}` : 'https://via.placeholder.com/300/333333/FFFFFF/?text=Image+Indisponible';
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error || !product) {
        return <div>Error fetching product details</div>;
    }

    const handleDeleteProduct = async () => {
        if (isConfirmDelete) {
            await deleteProduct(product.id);
            navigate('/products');
        } else {
            setIsConfirmDelete(true);
        }
    };

    const handleUpdateProduct = () => {
        setIsEditing(true);
    };

    const handleCloseForm = () => {
        setIsEditing(false);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                {!isEditing ? (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{product.name}</h2>
                        <div className="flex gap-6">
                            <div className="w-1/2">
                                <img src={getImageSrc(product.image)} alt={product.name} className="object-cover w-full h-96" />
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold text-gray-700">Price: ${product.price}</h3>
                                <p className="text-sm text-gray-600 mt-4">{product.description}</p>
                                <div className="text-lg text-gray-500 mt-2">Category: {product.category}</div>
                                <div className="mt-4 flex gap-4">
                                    <button
                                        onClick={handleUpdateProduct}
                                        className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={handleDeleteProduct}
                                        className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        {isConfirmDelete ? 'Confirmer la suppression' : 'Supprimer'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <ProductForm onClose={handleCloseForm} product={product} />
                )}
            </div>
        </>
    );
};

export default ProductDetail;
