import { faSearch, faSliders, faTableCellsLarge, faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { useProductStore } from "../store/product.store";
import ProductCard from "./component/product/ProductCard";
import { ProductSkeleton } from "./component/product/ProductSkeleton";

const CATEGORIES = [
  "All",
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shoes",
  "mens-shirts",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
];

const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Price ↑", value: "price_asc" },
  { label: "Price ↓", value: "price_desc" },
  { label: "Name A–Z", value: "name_asc" },
  { label: "Name Z–A", value: "name_desc" },
  { label: "Low Stock", value: "stock_asc" },
];

export default function Product() {
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const limit = 10;

  useEffect(() => {
    const skip = (page - 1) * limit;
    fetchProducts(limit, skip, searchQuery);
  }, [page, searchQuery, fetchProducts]);

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(localSearch);
      setPage(1);
    }
  };

  // Client-side filtering & sorting
  const filteredProducts = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "name_asc") return a.title.localeCompare(b.title);
      if (sortBy === "name_desc") return b.title.localeCompare(a.title);
      if (sortBy === "stock_asc") return a.stock - b.stock;
      return 0;
    });

  const totalPages = Math.ceil(total / limit);
  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3">

          {/* Row 1: Title + Controls */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent tracking-tight truncate">
                🛍 Product Catalog
              </h1>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                {loading ? "Loading..." : `${filteredProducts.length} item${filteredProducts.length !== 1 ? "s" : ""} found`}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`flex items-center gap-1.5 px-2.5 py-2 text-sm rounded-xl border transition ${showFilters
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                  }`}
              >
                <FontAwesomeIcon icon={faSliders} />
                <span className="hidden sm:inline text-sm">Filter</span>
              </button>

              {/* Sort dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-2.5 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-600 hover:border-indigo-300 transition"
                >
                  <span className="hidden sm:inline">{activeSortLabel}</span>
                  <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-30">
                    {SORT_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => { setSortBy(o.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition ${sortBy === o.value ? "font-semibold text-indigo-700 bg-indigo-50" : "text-gray-600"
                          }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View mode */}
              <div className="flex bg-gray-100 rounded-xl p-0.5 gap-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg text-sm transition ${viewMode === "grid" ? "bg-white shadow text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <FontAwesomeIcon icon={faTableCellsLarge} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg text-sm transition ${viewMode === "list" ? "bg-white shadow text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Search (full width) */}
          <div className="relative w-full">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search products… (Enter)"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
          </div>

          {/* Item count on mobile */}
          <p className="sm:hidden text-[11px] text-gray-400 mt-1.5 text-center">
            {loading ? "Loading..." : `${filteredProducts.length} items found`}
          </p>
        </div>
      </div>

      {/* ── Filter Panel ── */}
      {showFilters && (
        <div className="border-b border-gray-100 bg-white shadow-sm">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row gap-5">

            {/* Category */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setPage(1); }}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${selectedCategory === cat
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                      }`}
                  >
                    {cat === "All" ? "All" : cat.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-100 self-stretch" />

            {/* Price Range */}
            <div className="w-full md:w-56 shrink-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Price Range
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <span className="px-2 py-2 bg-gray-50 text-gray-400 text-xs shrink-0">$</span>
                  <input
                    type="number"
                    min={0}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-2 py-2 text-sm focus:outline-none min-w-0"
                    placeholder="Min"
                  />
                </div>
                <span className="text-gray-300 shrink-0">—</span>
                <div className="flex-1 flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <span className="px-2 py-2 bg-gray-50 text-gray-400 text-xs shrink-0">$</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max={5000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-2 py-2 text-sm focus:outline-none min-w-0"
                    placeholder="Max"
                  />
                </div>
              </div>
              <button
                onClick={() => { setSelectedCategory("All"); setPriceRange([0, 2000]); setSortBy(""); }}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition font-medium mt-3"
              >
                <FontAwesomeIcon icon={faXmark} />
                Reset all filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Product Grid / List ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5"
              : "flex flex-col gap-4"
          }>
            {Array(10).fill(0).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5"
              : "flex flex-col gap-4"
          }>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center gap-4 text-center px-4">
            <div className="text-5xl">🔍</div>
            <p className="text-gray-500 text-lg font-medium">No products found</p>
            <p className="text-gray-400 text-sm max-w-xs">
              Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => { setSelectedCategory("All"); setPriceRange([0, 2000]); setSortBy(""); setSearchQuery(""); setLocalSearch(""); }}
              className="mt-2 px-5 py-2 bg-indigo-600 text-white text-sm rounded-xl hover:bg-indigo-700 transition"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && total > limit && (
          <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-400 hover:text-indigo-600 transition"
            >
              ← Prev
            </button>

            <div className="flex gap-1 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} className="w-8 py-2 text-gray-400 text-sm text-center">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-sm font-medium transition ${page === p
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}
            </div>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-400 hover:text-indigo-600 transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
