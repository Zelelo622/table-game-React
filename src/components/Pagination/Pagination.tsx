import { ReactNode } from "react";
import { IPaginationProps } from "./types";
import { getVisiblePages } from "src/shared/utils/paginationVisiblePagesHelper";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onChange
}: IPaginationProps): ReactNode => {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 p-3 select-none">
      <button
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        className="cursor-pointer rounded-lg hover:bg-gray-700 disabled:opacity-30 transition
                   md:p-2 p-1">
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <div className="flex gap-1">
        {visiblePages.map((item) => (
          <button
            key={item}
            onClick={() => onChange(Number(item))}
            className={`
              cursor-pointer
              rounded-lg transition
              md:px-3 md:py-1 px-2 py-1
              md:text-base text-sm
              ${
                item === currentPage
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }
            `}>
            {item}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        className="cursor-pointer rounded-lg hover:bg-gray-700 disabled:opacity-30 transition
                   md:p-2 p-1">
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default Pagination;
