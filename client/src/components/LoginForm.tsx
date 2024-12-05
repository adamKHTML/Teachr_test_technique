
import React, { useState } from 'react';


interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const validate = () => {
        let valid = true;
        if (!email) {
            setEmailError('Email est requis');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email invalide');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Mot de passe est requis');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onLogin(email, password);
        }
    };

    return (



        <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Se connecter
            </button>
        </form>

    );
};

export default LoginForm;
