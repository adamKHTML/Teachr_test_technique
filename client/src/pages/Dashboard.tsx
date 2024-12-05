import React from 'react';
import { useGetUserInfoQuery } from '../api/endpoints/user';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const Dashboard: React.FC = () => {
    const { data: userData, error, isLoading } = useGetUserInfoQuery({});
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Erreur de récupération des données utilisateur</p>;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col justify-center items-center p-8">
                <div className="bg-white p-8 w-full max-w-3xl text-center">
                    <h1 className="text-3xl font-semibold mb-6 text-[#1e4f9b]">
                        Bienvenue à vous, {userData?.firstName || 'Utilisateur'} {/* Affiche le firstName */}
                    </h1>
                    <p className="text-black mb-8">
                        Nous sommes ravis de vous voir ici. Choisissez une option ci-dessous pour commencer.
                    </p>

                    <div className="flex flex-col gap-4">
                        <div
                            onClick={() => navigate('/products')}
                            className="flex items-center justify-start p-4 bg-white border-4 border-blue-500 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
                        >
                            <div className="w-10 h-10 bg-blue-500 rounded-lg mr-4"></div>
                            <span className="text-lg font-bold text-blue-500">Produits</span>
                        </div>

                        <div
                            onClick={() => navigate('/categories')}
                            className="flex items-center justify-start p-4 bg-white border-4 border-orange-500 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
                        >
                            <div className="w-10 h-10 bg-orange-500 rounded-lg mr-4"></div>
                            <span className="text-lg font-bold text-orange-500">Catégories</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
