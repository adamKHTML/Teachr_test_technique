import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../api/endpoints/logout';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Gérer l'état de connexion localement

    // Vérifier si l'utilisateur est connecté en vérifiant la présence du token dans localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Si un token existe, l'utilisateur est connecté
    }, []);

    // Détection du scroll pour changer la transparence de la navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout().unwrap(); // Exécuter la mutation de déconnexion
            localStorage.removeItem('token'); // Supprimer le token du localStorage
            setIsLoggedIn(false); // Mettre à jour l'état local pour indiquer que l'utilisateur est déconnecté
            navigate('/login'); // Rediriger vers la page de connexion
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <nav
            className={`Navbar-header ${isScrolled ? 'bg-opacity-80 bg-blue-500' : 'bg-blue-500'}`}
            style={{ transition: 'background-color 0.3s ease' }}
        >
            {/* Logo ou lien vers la Home */}
            <div className="flex items-center">
                <h1 className="text-white text-lg font-bold">
                    <Link to="/">Teach'r</Link>
                </h1>
            </div>

            {/* Liens et actions */}
            <div className="flex items-center space-x-4">
                {/* Lien Dashboard si connecté */}
                {isLoggedIn && (
                    <Link to="/dashboard" className="text-white text-xl">
                        🏠
                    </Link>
                )}

                {/* Connexion/Déconnexion */}
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Déconnexion
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                    >
                        Connexion
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
