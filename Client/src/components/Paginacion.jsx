
//Paginacion.jsx
import PropTypes from 'prop-types';

const Paginacion = ({ currentPage, totalPages, onChangePage }) => {
  const startPage = currentPage <= 3 ? 1 : currentPage > totalPages - 2 ? totalPages - 4 : currentPage - 2;
  const endPage = currentPage <= 3 ? 5 : currentPage > totalPages - 2 ? totalPages : currentPage + 2;
  
  const displayedPages = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);

  const prevPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={prevPage}
        disabled={currentPage <= 1}
        className="mx-1 px-4 py-2 border rounded-lg bg-gray-200"
      >
        Anterior
      </button>

      {currentPage > 3 && <span className="mx-1">...</span>}

      {displayedPages.map((page) => (
        <button
          key={page}
          onClick={() => onChangePage(page)}
          className={`mx-1 px-4 py-2 border rounded-lg ${page === currentPage ? 'text-white bg-blue-500' : 'text-black bg-gray-200'}`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && <span className="mx-1">...</span>}
      <button
        onClick={() => onChangePage(totalPages)}
        className={`mx-1 px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'text-white bg-blue-500' : 'text-black hover:bg-gray-500 bg-gray-400'}`}
      >
        {totalPages}
      </button>

      <button
        onClick={nextPage}
        disabled={currentPage >= totalPages}
        className="mx-1 px-4 py-2 border rounded-lg bg-gray-200"
      >
        Siguiente
      </button>
    </div>
  );
};

Paginacion.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Paginacion;
