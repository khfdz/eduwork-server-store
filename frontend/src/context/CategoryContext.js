
import React, { createContext, useState, useEffect, useContext } from 'react';

const CategoryContext = createContext();

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const changeSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/categories');
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      } else {
        console.error('Failed to fetch categories:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCategories(categories.filter(category => category._id !== categoryId));
      } else {
        console.error('Failed to delete category:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const addCategory = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3002/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type sebagai JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: formData.name }), // Mengubah objek ke JSON
      });
  
      if (response.ok) {
        const data = await response.json();
        setCategories([...categories, data]);
      } else {
        console.error('Failed to add category:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };
  
  const updateCategory = async (categoryId, formData) => {
    try {

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }); 

      if (response.ok) {
        const data = await response.json();
        setCategories(categories.map(category => category._id === categoryId ? data : category));
      } else {
        console.error('Failed to update category:', response.statusText);
      } 
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };






  return (
    <CategoryContext.Provider 
    value={{ categories, fetchCategory, deleteCategory, addCategory, updateCategory, setSelectedCategory, selectedCategory, changeSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};