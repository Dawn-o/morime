import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import {
  getPageUrl,
  getVisiblePages,
  getAnimeTopPageUrl,
} from "@/lib/navigation/PaginationUtils";

export function MorimePagination({
  currentPage,
  totalPages,
  type,
  basePath,
  queryParams = {},
}) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  const mobileVisiblePages = getVisiblePages(currentPage, totalPages, 3);

  const generatePageUrl = (page) => {
    if (type) {
      return getAnimeTopPageUrl(type, page);
    } else if (basePath) {
      return getPageUrl(basePath, page, queryParams);
    }
    return "#";
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination className="hidden md:flex">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={generatePageUrl(currentPage - 1)} />
            </PaginationItem>
          )}

          {visiblePages.map((page, i) => (
            <PaginationItem key={i}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={generatePageUrl(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={generatePageUrl(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

      <div className="md:hidden w-full">
        <div className="overflow-x-auto">
          <div className="flex items-center justify-center gap-1 min-w-max px-4">
            {currentPage > 1 && (
              <PaginationLink
                href={generatePageUrl(currentPage - 1)}
                className="w-8 h-8 p-0 text-xs flex items-center justify-center"
              >
                ←
              </PaginationLink>
            )}

            {!mobileVisiblePages.includes(1) && currentPage > 3 && (
              <>
                <PaginationLink
                  href={generatePageUrl(1)}
                  className="w-8 h-8 p-0 text-xs flex items-center justify-center"
                >
                  1
                </PaginationLink>
                <PaginationEllipsis className="w-8 h-8 p-0 text-xs flex items-center justify-center" />
              </>
            )}

            {mobileVisiblePages.map((page, i) => (
              <div key={i}>
                {page === "ellipsis" ? (
                  <PaginationEllipsis className="w-8 h-8 p-0 text-xs flex items-center justify-center" />
                ) : (
                  <PaginationLink
                    href={generatePageUrl(page)}
                    isActive={page === currentPage}
                    className={`w-8 h-8 p-0 text-xs flex items-center justify-center ${
                      page === currentPage ? "bg-primary font-medium" : ""
                    }`}
                  >
                    {page}
                  </PaginationLink>
                )}
              </div>
            ))}

            {!mobileVisiblePages.includes(totalPages) &&
              currentPage < totalPages - 2 && (
                <>
                  <PaginationEllipsis className="w-8 h-8 p-0 text-xs flex items-center justify-center" />
                  <PaginationLink
                    href={generatePageUrl(totalPages)}
                    className="w-8 h-8 p-0 text-xs flex items-center justify-center"
                  >
                    {totalPages}
                  </PaginationLink>
                </>
              )}

            {currentPage < totalPages && (
              <PaginationLink
                href={generatePageUrl(currentPage + 1)}
                className="w-8 h-8 p-0 text-xs flex items-center justify-center"
              >
                →
              </PaginationLink>
            )}
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-3">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
}
