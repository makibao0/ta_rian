import React from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "danger" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    " py-2 rounded-lg font-medium transition duration-200 flex items-center justify-center";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
