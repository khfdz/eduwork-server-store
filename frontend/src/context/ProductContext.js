import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/products`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data.data);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

 
  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        
        setProducts(products.filter(product => product._id !== productId));
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const addProduct = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tags', formData.tags);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3002/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        console.log('Product added successfully');
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
      } else {
        console.error('Failed to add product:', await response.text());
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const updateProduct = async (productId, formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tags', formData.tags);

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        console.log('Product updated successfully');
        const updatedProduct = await response.json();
        setProducts(products.map(product => product._id === productId ? updatedProduct : product));
      } else {
        console.error('Failed to update product:', await response.text());
      }
    } catch (error) { 
      console.error('Failed to update product:', error);
    }
  };


  return (
    <ProductContext.Provider value={{ products, fetchProducts, deleteProduct, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
