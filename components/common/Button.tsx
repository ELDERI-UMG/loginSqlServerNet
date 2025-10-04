
import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  fullWidth = false,
  variant = 'primary',
  ...props
}) => {
  const baseClasses = `
    flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold
    shadow-sm focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 transition-all duration-150
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-indigo-600 text-white hover:bg-indigo-500 
      focus-visible:outline-indigo-600
    `,
    secondary: `
      bg-gray-600/50 text-white hover:bg-gray-500/50
      ring-1 ring-inset ring-gray-500
      focus-visible:outline-gray-500
    `,
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Spinner />}
      <span className={isLoading ? 'ml-2' : ''}>{children}</span>
    </button>
  );
};

export default Button;
