import React, { useState, useEffect } from 'react';
import { useProductContext } from '../../context/ProductContext'; // Import hook useProductContext
import ProductEditForm from './ProductEditForm';
import '../../styles/ProductTable.css'; // Import file CSS untuk styling

const ProductTable = () => {
  const { products, deleteProduct } = useProductContext(); // Gunakan hook useProductContext untuk mengakses konteks produk

  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);

  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Fungsi untuk menampilkan form edit saat tombol Edit diklik
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Fungsi untuk menutup form edit
  const handleCloseEditForm = () => {
    setEditingProduct(null);
  };

  // Fungsi untuk menghapus produk
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className='container'>
      <div className='productBackground'>
      <h2>Product List</h2>
      <table  className='table table-striped tableProduct'>
        <thead className='thProduct'>
          <tr >
            <th >No</th>
            <th >Name</th>
            <th >Description</th>
            <th >Price</th>
            <th >Category</th>
            <th >Tags</th>
            <th >Image</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody className='tbodyProduct'>
          {currentProducts.map((product, index) => (
            <React.Fragment key={product._id}>
              <tr className='rowProduct'>
                <td className='noProduct'>{startIndex + index + 1}</td>
                <td className='nameProduct'>{product.name}</td>
                <td className='descriptionProduct'>{product.description}</td>
                <td className='priceProduct'>{product.price}</td>
                <td className='categoryProduct'>{product.category.name}</td>
                <td className='tagsProduct'>{product.tags.name}</td>
                <td>
                  <img src={`http://localhost:3002/images/products/${product.image_url}`} alt={product.name} style={{ maxWidth: '150px' }} />
                </td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEdit(product)}>Edit</button> {/* Menampilkan form edit saat diklik */}
                  <button className='btn btn-primary' onClick={() => handleDelete(product._id)}>Delete</button> {/* Menghapus produk saat diklik */}
                </td>
              </tr>
              {editingProduct && editingProduct._id === product._id && (
                <tr>
                  <td colSpan="8">
                    <ProductEditForm product={editingProduct} onClose={handleCloseEditForm} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* Tombol Halaman */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductTable;
