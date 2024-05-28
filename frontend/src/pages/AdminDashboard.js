import React from 'react';
import AdminContent from '../components/admin/AdminContent';
import Navbar from '../components/navbar';
import { CartProvider } from '../../src/context/CartContext';
import { CategoryProvider } from '../../src/context/CategoryContext';

import { ProductProvider } from '../context/ProductContext';
import '../styles/AdminDashboard.css';
import { TagsProvider } from '../context/TagsContext';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <CartProvider>
        <Navbar />
        <div className="admin-main">
          <CategoryProvider> 
            <TagsProvider>

              <ProductProvider>
                <AdminContent />
              </ProductProvider>
        
            </TagsProvider>
          </CategoryProvider>
        </div>
      </CartProvider>
    </div>
  );
};

export default AdminDashboard;
