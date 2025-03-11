import React, { useState } from 'react';
import { KeyRound, Mail } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';

interface ForgotPasswordProps {
  onSignInClick: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSignInClick }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Handle password reset logic here
      console.log('Password reset for:', email);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <KeyRound size={24} className="text-indigo-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot password?</h1>
          <p className="text-gray-600 mt-2">
            {!isSubmitted 
              ? "We'll send you a link to reset your password" 
              : "Check your email for a reset link"}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                icon={<Mail size={18} className="text-gray-500" />}
              />
            </div>

            <Button type="submit" isLoading={isLoading} fullWidth>
              Send reset link
            </Button>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your inbox and follow the instructions.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <button
              type="button"
              onClick={onSignInClick}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;