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
    <nav className="flex justify-center items-center space-x-2 mt-8">
      {/* Tombol Previous */}
      <PageLink page={currentPage - 1} isDisabled={currentPage <= 1}>
        ‹ Prev
      </PageLink>

      {/* Tombol Halaman Pertama & ... */}
      {startPage > 1 && <PageLink page={1}>1</PageLink>}
      {startPage > 2 && <span className="px-4 py-2 text-gray-400">...</span>}

      {/* Nomor Halaman Dinamis */}
      {pageNumbers.map((number) => (
        <PageLink key={number} page={number}>
          {number}
        </PageLink>
      ))}

      {/* Tombol Halaman Terakhir & ... */}
      {endPage < totalPages - 1 && (
        <span className="px-4 py-2 text-gray-400">...</span>
      )}
      {endPage < totalPages && (
        <PageLink page={totalPages}>{totalPages}</PageLink>
      )}

      {/* Tombol Next */}
      <PageLink page={currentPage + 1} isDisabled={currentPage >= totalPages}>
        Next ›
      </PageLink>
    </nav>
  );
};
