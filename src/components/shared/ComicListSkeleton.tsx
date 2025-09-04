const SkeletonCard = () => (
  <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-[3/4] w-full bg-gray-700"></div>
    <div className="p-2">
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
);

export const ComicListSkeleton = ({ count = 18 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
