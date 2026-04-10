import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../types/product.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faStarHalfAlt,
  faCartShopping,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty, faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<string, string> = {
  smartphones: "bg-blue-100 text-blue-700",
  laptops: "bg-purple-100 text-purple-700",
  fragrances: "bg-pink-100 text-pink-700",
  skincare: "bg-rose-100 text-rose-700",
  groceries: "bg-green-100 text-green-700",
  "home-decoration": "bg-amber-100 text-amber-700",
  furniture: "bg-orange-100 text-orange-700",
  tops: "bg-cyan-100 text-cyan-700",
  "womens-dresses": "bg-fuchsia-100 text-fuchsia-700",
  "womens-shoes": "bg-lime-100 text-lime-700",
  "mens-shoes": "bg-indigo-100 text-indigo-700",
  "mens-shirts": "bg-teal-100 text-teal-700",
  sunglasses: "bg-yellow-100 text-yellow-700",
  automotive: "bg-red-100 text-red-700",
  motorcycle: "bg-slate-100 text-slate-700",
  lighting: "bg-sky-100 text-sky-700",
};

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-amber-400 text-xs" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-amber-400 text-xs" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStarEmpty} className="text-amber-300 text-xs" />);
    }
  }
  return <div className="flex gap-0.5">{stars}</div>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Simulated rating from price (deterministic fake-rating for demo)
  const fakeRating = Math.min(5, Math.max(3, ((product.price * 7) % 21) / 5 + 3));
  const isLowStock = product.stock < 10;
  const categoryClass =
    categoryColors[product.category] ?? "bg-gray-100 text-gray-600";

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 h-48">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((w) => !w);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <FontAwesomeIcon
            icon={wishlisted ? faHeart : faHeartEmpty}
            className={`text-sm ${wishlisted ? "text-red-500" : "text-gray-400"}`}
          />
        </button>

        {/* Low Stock Badge */}
        {isLowStock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Sisa {product.stock}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide mb-2 ${categoryClass}`}
        >
          <FontAwesomeIcon icon={faTag} className="text-[8px]" />
          {product.category.replace(/-/g, " ")}
        </span>

        {/* Title */}
        <h2 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-indigo-700 transition-colors">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={fakeRating} />
          <span className="text-[11px] text-gray-400">
            ({fakeRating.toFixed(1)})
          </span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-sm hover:shadow-indigo-300 hover:scale-110 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faCartShopping} className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
