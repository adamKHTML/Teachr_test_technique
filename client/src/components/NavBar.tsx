import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../api/endpoints/logout';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

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
            await logout().unwrap();
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <nav
            className={`Navbar-header ${isScrolled ? 'bg-opacity-80 bg-blue-500' : 'bg-blue-500'}`}
            style={{ transition: 'background-color 0.3s ease' }}
        >
            <div className="flex items-center">
                <h1 className="text-white text-lg font-bold">
                    {isLoggedIn ? (
                        <Link to="/dashboard">🏠</Link>
                    ) : (
                        <Link to="/">Teach'r</Link>
                    )}
                </h1>
            </div>
            <div className="flex items-center space-x-4">
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
