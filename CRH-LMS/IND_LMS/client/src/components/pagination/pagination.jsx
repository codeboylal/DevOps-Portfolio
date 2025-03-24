import { useState } from "react";

const Pagination = ({ totalPages = 3 }) => {
  const [currentPage, setCurrentPage] = useState(2);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center space-x-3 justify-center p-4">
      {/* Previous Button */}
      <button
        className={`border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-md ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-100"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`px-4 py-2 rounded-md ${
              currentPage === page
                ? "bg-orange-500 text-white shadow-md"
                : "text-orange-500 hover:bg-orange-100"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        className={`border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-md ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-100"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
