import React from 'react';
import PropTypes from 'prop-types';

function Sidebar({ categories, selectedCategory, onCategorySelect }) {
    return (
      <div className='px-2'>
        {selectedCategory && (
          <button onClick={() => onCategorySelect('')} className="bg-indigo-100 text-indigo-900 text-center w-full py-1 mb-1 rounded hover:bg-indigo-300">
            Limpiar selección
          </button>
        )}
        <div className="bg-gray-50 border-gray-200 rounded-sm md:max-w-md lg:max-w-lg py-2 px-1">
          <h1 className="text-xl font-semibold mb-2">Filtrar por</h1>
          <ul>
            {categories.map((category) => (
              <li key={category} className="my-2 hover:bg-gray-200 rounded-sm p-2 md:px-8">
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
        </div>
      </div>
    );
  }
  
  Sidebar.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onCategorySelect: PropTypes.func.isRequired
  };
  
  export default Sidebar;