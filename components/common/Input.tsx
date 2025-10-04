
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, id, icon, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500">{icon}</span>
          </div>
        )}
        <input
          id={id}
          className={`
            block w-full rounded-md border-0 py-3 pr-3
            bg-gray-700/50 text-white placeholder-gray-400
            shadow-sm ring-1 ring-inset ring-gray-600 
            focus:ring-2 focus:ring-inset focus:ring-indigo-500 
            sm:text-sm sm:leading-6 transition duration-150
            ${icon ? 'pl-10' : 'pl-3'}
            disabled:cursor-not-allowed disabled:opacity-50
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
