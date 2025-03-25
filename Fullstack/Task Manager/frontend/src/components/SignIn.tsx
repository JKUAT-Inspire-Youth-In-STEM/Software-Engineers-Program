import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { AxiosError } from 'axios';


interface SignInProps {
  onLogin: (token: string) => void;
  signupMessage: string | null;
}

const SignIn: React.FC<SignInProps> = ({ onLogin, signupMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      if (response.data.token) {
        onLogin(response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
        const axiosError = err as AxiosError<{ msg?: string }>;
        setError(axiosError.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {signupMessage && <p className="text-green-500 mb-4">{signupMessage}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;