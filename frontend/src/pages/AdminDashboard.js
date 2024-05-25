import React from 'react';
import AdminContent from '../components/admin/AdminContent';
import Navbar from '../components/navbar';
import { CartProvider } from '../../src/context/CartContext';
import { CategoryProvider } from '../../src/context/CategoryContext';
import { TagProvider } from '../../src/context/TagContext';
import { ProductProvider } from '../context/ProductContext';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <CartProvider>
        <Navbar />
        <div className="admin-main">
          <CategoryProvider> 
            <TagProvider> 
              <ProductProvider>
                <AdminContent />
              </ProductProvider>
            </TagProvider>
          </CategoryProvider>
        </div>
      </CartProvider>
    </div>
  );
};

export default AdminDashboard;
