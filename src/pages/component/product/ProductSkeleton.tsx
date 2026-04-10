export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category badge */}
        <div className="h-4 bg-gray-100 rounded-full w-1/3 animate-pulse" />
        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-3.5 bg-gray-100 rounded-full w-full animate-pulse" />
          <div className="h-3.5 bg-gray-100 rounded-full w-3/4 animate-pulse" />
        </div>
        {/* Stars */}
        <div className="flex gap-1">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-100 rounded-sm animate-pulse" />
          ))}
        </div>
        {/* Price + Button */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-6 bg-gray-200 rounded-full w-1/4 animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
