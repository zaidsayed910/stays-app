import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../components/SignUp';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <SignUp onSignInClick={() => navigate('/login')} />
      </div>
    </div>
  );
};

export default RegisterPage;