import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../types/product.types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h2 className="font-semibold text-gray-700 truncate">{product.title}</h2>
      <p className="text-blue-600 font-bold mt-1">${product.price}</p>
    </div>
  );
};

export default ProductCard;
