import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  const maxPagesToShow = 5;
  const halfMaxPages = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPages);
  let endPage = Math.min(totalPages, currentPage + halfMaxPages);

  if (currentPage - halfMaxPages < 1) {
    endPage = Math.min(totalPages, maxPagesToShow);
  }
  if (currentPage + halfMaxPages > totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const PageLink = ({
    page,
    children,
    isDisabled,
  }: {
    page: number;
    children: React.ReactNode;
    isDisabled?: boolean;
  }) => {
    if (isDisabled) {
      return (
        <span className="px-4 py-2 bg-gray-700 text-gray-500 rounded-md cursor-not-allowed">
          {children}
        </span>
      );
    }
    const isActive = page === currentPage;
    return (
      <Link
        href={`${basePath}/${page}`}
        className={`px-4 py-2 rounded-md transition-colors ${
          isActive
            ? "bg-primary text-white font-bold"
            : "bg-gray-800 hover:bg-gray-700 text-white"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-8 px-2">
      <PageLink page={currentPage - 1} isDisabled={currentPage <= 1}>
        <span className="hidden sm:inline">‹ Prev</span>
        <span className="sm:hidden">‹</span>
      </PageLink>

      {startPage > 1 && <PageLink page={1}>1</PageLink>}
      {startPage > 2 && (
        <span className="px-2 sm:px-4 py-2 text-gray-400 text-sm">...</span>
      )}

      {pageNumbers.map((number) => (
        <PageLink key={number} page={number}>
          {number}
        </PageLink>
      ))}

      {endPage < totalPages - 1 && (
        <span className="px-2 sm:px-4 py-2 text-gray-400 text-sm">...</span>
      )}
      {endPage < totalPages && (
        <PageLink page={totalPages}>{totalPages}</PageLink>
      )}

      <PageLink page={currentPage + 1} isDisabled={currentPage >= totalPages}>
        <span className="hidden sm:inline">Next ›</span>
        <span className="sm:hidden">›</span>
      </PageLink>
    </nav>
  );
};
