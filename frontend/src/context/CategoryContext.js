// CategoryContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const CategoryContext = createContext(); // Buat CategoryContext
export const useCategory = () => useContext(CategoryContext); // Export useCategory

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]); // State untuk data kategori

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await fetch('http://localhost:3002/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Set data kategori ke dalam state
        } else {
          console.error('Failed to fetch categories:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error); 
      }
    };

    fetchData(); 
  }, []);

  return (
    <CategoryContext.Provider value={categories}> 
      {children}
    </CategoryContext.Provider>
  );
};
