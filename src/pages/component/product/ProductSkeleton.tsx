export function ProductSkeleton() {
  return (
    <div className="border p-3 rounded shadow-sm bg-white animate-pulse">
      <div className="w-full h-32 bg-gray-300 rounded-md mb-3" />

      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />

      <div className="h-6 bg-gray-200 rounded w-1/4" />
    </div>
  );
}
