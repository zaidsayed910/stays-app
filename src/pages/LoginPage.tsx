import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';

const LoginPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'signin' | 'signup' | 'forgot-password'>('signin');

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        {activeView === 'signin' && (
          <SignIn 
            onSignUpClick={() => setActiveView('signup')} 
            onForgotPasswordClick={() => setActiveView('forgot-password')} 
          />
        )}
        
        {activeView === 'signup' && (
          <SignUp onSignInClick={() => setActiveView('signin')} />
        )}
        
        {activeView === 'forgot-password' && (
          <ForgotPassword onSignInClick={() => setActiveView('signin')} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;