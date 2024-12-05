import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useLoginMutation } from "../api/endpoints/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const LoginPage: React.FC = () => {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password }).unwrap();
      if (response.token) {

        console.log("Login successful!", response.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMessage("Email ou mot de passe incorrect.");
      console.error("Login error:", err);
    }
  };

  return (
    <>

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <Navbar />
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-6">Se connecter</h2>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
          )}
          <LoginForm onLogin={handleLogin} />
          {isLoading && (
            <p className="text-center text-gray-500">Connexion en cours...</p>
          )}
          {isSuccess && (
            <p className="text-center text-green-500">Connexion réussie!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
