import React, { useState } from 'react';
import { signupUser } from '../api/analysisApi';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await signupUser(email, password);
    if (res.success) navigate('/login');
    else alert(res.error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow w-96">
        <h1 className="text-2xl mb-4">Signup</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleSignup} className="w-full bg-green-500 py-2 rounded">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
