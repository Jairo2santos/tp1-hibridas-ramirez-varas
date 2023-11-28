//Filtros.jsx
import React, { useState } from 'react';

function Filtros({ onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState('priceAsc');

  const applyFilter = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
    console.log("Emite el filtro:", newFilter);
  };

  return (
    <div>
      <select
        value={selectedFilter}
        onChange={applyFilter}
        className="px-4 py-2 border rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option value="priceAsc">Precio: Menor a Mayor</option>
        <option value="priceDesc">Precio: Mayor a Menor</option>
        <option value="dateDesc">Fecha: Más Reciente</option>
      </select>
    </div>
  );
}

export default Filtros;
