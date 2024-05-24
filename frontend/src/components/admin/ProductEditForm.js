// ProductEditForm.js
import React from 'react';

const ProductEditForm = ({ editProductId, showEditForm, editProductData, imageName, categories, handleInputChange, handleChangeCategory, handleEditSubmit, setShowEditForm }) => (
  <tr>
    <td colSpan="8">
      <form onSubmit={handleEditSubmit}>
        <div className="form-group">
          <input type="text" name="name" value={editProductData.name} onChange={handleInputChange} className="form-control" placeholder="Product Name" />
        </div>
        <div className="form-group">
          <input type="text" name="price" value={editProductData.price} onChange={handleInputChange} className="form-control" placeholder="Price" />
        </div>
        <div className="form-group">
          <textarea name="description" value={editProductData.description} onChange={handleInputChange} className="form-control" placeholder="Description"></textarea>
        </div>
        <div className="form-group">
          <label className="form-control">{imageName}</label>
          <input type="file" accept="image/*" name="image" onChange={handleInputChange} className="form-control-file" />
        </div>
        <div className="form-group">
          <select name="category" value={editProductData.category} onChange={handleChangeCategory} className="form-control">
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="text" name="tags" value={editProductData.tags} onChange={handleInputChange} className="form-control" placeholder="Tags" />
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-secondary mr-2" onClick={() => setShowEditForm(false)}>Close</button>
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>
    </td>
  </tr>
);

export default ProductEditForm;
