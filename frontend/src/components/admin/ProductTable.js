// ProductTable.js
import React from 'react';

const ProductTable = ({ products, currentPage, handleEdit, handleDelete }) => (
  <table className="table">
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Category</th>
        <th>Tags</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr key={product._id}>
          <td>{(currentPage - 1) * 12 + index + 1}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>{product.category.name}</td>
          <td>{product.tags.name}</td>
          <td>
            <img src={`http://localhost:3002/images/products/${product.image_url}`} alt={product.name} style={{ maxWidth: '100px' }} />
          </td>
          <td>
            <button onClick={() => handleEdit(product._id)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;
