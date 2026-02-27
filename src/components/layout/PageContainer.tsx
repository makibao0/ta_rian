import React from "react";

interface Props {
  children: React.ReactNode;
}

export const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
};
