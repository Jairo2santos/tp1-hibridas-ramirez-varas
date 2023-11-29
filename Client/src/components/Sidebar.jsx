import React from 'react';
import PropTypes from 'prop-types';

function Sidebar({ categories, selectedCategory, onCategorySelect }) {
    return (
      <div className="p-4 border-r bg-gray-50 border-gray-200 rounded-lg md:max-w-md lg:max-w-lg">
        <h2 className="text-xl font-bold mb-4">Filtrar por categoría</h2>
        <ul>
          {categories.map((category) => (
            <li key={category} className="my-2 hover:bg-gray-200 rounded-lg p-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id={category}
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategorySelect(category)}
                  className="mr-2"
                />
                <label htmlFor={category} className="cursor-pointer">{category}</label>
              </div>
            </li>
          ))}
        </ul>
        {selectedCategory && (
          <button onClick={() => onCategorySelect('')} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Limpiar selección
          </button>
        )}
      </div>
    );
  }
  
  Sidebar.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onCategorySelect: PropTypes.func.isRequired
  };
  
  export default Sidebar;