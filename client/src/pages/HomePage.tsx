import React from 'react';
import Navbar from '../components/NavBar';

const HomePage: React.FC = () => {
    return (
        <div className="homepage-container">
            <header className="header">
                <div className="blue-band"></div>
                <Navbar />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ED7A59" fillOpacity="1" d="M0,32L120,69.3C240,107,480,181,720,213.3C960,245,1200,235,1320,229.3L1440,224L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
                    <path fill="#0099ff" fillOpacity="1" d="M0,192L80,213.3C160,235,320,277,480,245.3C640,213,800,107,960,85.3C1120,64,1280,128,1360,160L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </header>


            <div className="main-content">
                <img src="/image/Logo1.svg" alt="Dev Logo SVG" className="img-fluid radius-image-curve " />
                <div className="text-content">
                    <h1 className="homepage-title">Découvrez le service e-commerce de Teach'r</h1>
                    <p className="homepage-description">
                        Bienvenue sur notre plateforme ! Avec l’application e-commerce de Teach'r, vous pouvez
                        <strong> gérer facilement vos produits et leurs catégories</strong>.
                        En quelques clics.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
