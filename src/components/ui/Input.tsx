import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  touched?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  className = "",
  containerClassName = "",
  leftIcon,
  rightIcon,
  error,
  touched,
  ...props
}) => {
  return (
    <div className={`mb-3 ${containerClassName}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-600">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 flex items-center justify-center text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          className={`
            w-full border rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ,
            ${leftIcon ? "pl-10" : "pl-3"}
               ${
                 error && touched
                   ? "border-red-500 focus:ring-red-400"
                   : "focus:ring-blue-400"
               }
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
