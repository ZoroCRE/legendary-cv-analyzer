import React, { useState } from 'react';
import { resetPassword } from '../api/analysisApi';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    const res = await resetPassword(email);
    alert(res.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow w-96">
        <h1 className="text-2xl mb-4">Reset Password</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={handleReset} className="w-full bg-yellow-500 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
