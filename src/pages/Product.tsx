import { useEffect, useState } from "react";
import { useProductStore } from "../store/product.store";
import { ProductSkeleton } from "./component/product/ProductSkeleton";
import { Input } from "../components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const navigate = useNavigate();
  const {
    products,
    total,
    loading,
    fetchProducts,
    searchQuery,
    setSearchQuery,
  } = useProductStore();
  const [page, setPage] = useState(1);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const limit = 10;

  useEffect(() => {
    const skip = (page - 1) * limit;
    fetchProducts(limit, skip, searchQuery);
  }, [page, searchQuery, fetchProducts]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(localSearch);
      setPage(1);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>

        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Type and press Enter..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            rightIcon={<FontAwesomeIcon icon={faSearch} />}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {loading ? (
          Array(10)
            .fill(0)
            .map((_, i) => <ProductSkeleton key={i} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="font-semibold text-gray-700 truncate">
                {product.title}
              </h2>
              <p className="text-blue-600 font-bold mt-1">${product.price}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            No products found for "{searchQuery}"
          </div>
        )}
      </div>

      {!loading && total > limit && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm font-medium">
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            disabled={page >= Math.ceil(total / limit)}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
