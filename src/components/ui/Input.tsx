import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  size = 'md',
  className = '',
  ...props
}) => {
  const id = props.id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  const sizeStyles = {
    sm: 'py-1.5 text-sm',
    md: 'py-2 text-sm',
    lg: 'py-2.5 text-base',
  };
  
  const baseInputStyles = `
    block w-full rounded-md border-gray-300 shadow-sm
    focus:border-indigo-500 focus:ring-indigo-500
    ${sizeStyles[size]}
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${icon ? 'pr-10' : ''}
  `;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={`${baseInputStyles} ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;