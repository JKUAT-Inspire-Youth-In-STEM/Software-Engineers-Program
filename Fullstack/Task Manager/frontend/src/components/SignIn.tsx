import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { AxiosError } from 'axios';

interface SignInProps{
    onLogin: (token: string) => void;
    signupMessage: string | null;
}

export const SignIn: React.FC<SignInProps> = ({ onLogin, signupMessage }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try{
            const response = loginUser({ username, password });
            if(response.data.token){
                onLogin(response.data.token);
                navigate('/dashboard');
            }
        }catch(err){
            const axiosError = err as AxiosError<{ msg?: string }>;
            setError(axiosError.response?.data.msg ?? 'Registration failed');
        };
    };

    return(
        <div className='flex items-center justify-center min-h-screen'>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-96'>

                <h2 className='text-2xl font-bold mb-4'>Sign In</h2>
                { signupMessage && <p className='text-green-500 mb-4'>{signupMessage}</p> }
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full p-2 mb-4 border rounded'
                    type="text"
                    placeholder="Enter your username"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-2 mb-4 border rounded'
                    type="password"
                    placeholder="Enter your password"
                />
                { error && <p className='text-red-500 mb-4'>{error}</p> }
                <button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600' type="submit" onClick={handleSubmit}>Sign In</button>
            </form>
            {/* Links to go back to landing page and signin page */}
            <div className='mt-4 '>
                <Link to="/" className='text-blue-500 hover:underline'>Back to Landing Page</Link>
                <br />
                <Link to="/signup" className='text-blue-500 hover:underline'>Do not have an account? Sign Up</Link>
            </div>
        </div>
    )
}