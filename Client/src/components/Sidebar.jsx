// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// const Sidebar = ({ categories, onFilterByCategory }) => {
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const handleCategoryChange = (category) => {
//     const isSelected = selectedCategories.includes(category);
  
//     if (isSelected) {
//       setSelectedCategories(prevCategories => prevCategories.filter(cat => cat !== category));
//     } else {
//       if (!selectedCategories.includes(category)) {
//         setSelectedCategories(prevCategories => [...prevCategories, category]);
//       }
//     }
//     onFilterByCategory(selectedCategories);

//   };

//   useEffect(() => {
//     if (selectedCategories.length > 0) {
//       onFilterByCategory(selectedCategories);
//     }
//   }, [selectedCategories, onFilterByCategory]); 

//   return (
//     <div className="p-4 border-r bg-gray-50 border-gray-200 rounded-lg md:max-w-md lg:max-w-lg">
//       <h2 className="text-xl font-bold mb-4">Filtrar por categoría</h2>
//       <ul>
//         {categories.map((category) => (
//           <li key={category} className="my-2 hover:bg-gray-200 rounded-lg p-2">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={category}
//                 className="hidden"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleCategoryChange(category)}
//               />
//               <label htmlFor={category} className="flex items-center cursor-pointer w-full">
//                 <span
//                   className={`w-5 h-5 inline-block mr-2 rounded-full border border-gray-400 flex-shrink-0 ${
//                     selectedCategories.includes(category) ? 'bg-blue-500' : ''
//                   }`}
//                 ></span>
//                 {category}
//               </label>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// Sidebar.propTypes = {
//   categories: PropTypes.array,
//   onFilterByCategory: PropTypes.func.isRequired,
// };

// Sidebar.defaultProps = {
//   categories: [],
// };

// export default Sidebar;
