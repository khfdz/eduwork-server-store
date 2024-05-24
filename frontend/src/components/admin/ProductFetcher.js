// ProductFetcher.js
import React, { useState, useEffect } from 'react';

const ProductFetcher = ({ currentPage, setCurrentPage, setProducts, setTotalPages }) => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3002/api/products?skip=${(currentPage - 1) * 12}&limit=12`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data.data);
          setTotalPages(Math.ceil(data.count / 12));
        } else {
          console.error('Failed to fetch products:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, [currentPage, setProducts, setTotalPages]);

  return null; // Return null karena komponen ini tidak perlu merender apa pun
};

export default ProductFetcher;
