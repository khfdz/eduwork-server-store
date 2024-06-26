import React, { useState, useEffect } from 'react';
import '../../styles/ProductEditForm.css'; 
import { useCategoryContext } from '../../context/CategoryContext';
import { useProductContext } from '../../context/ProductContext';
import { useTagsContext } from '../../context/TagsContext';

const ProductEditForm = ({ product, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category.name,
    tags: product.tags.name,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedProduct({
      ...editedProduct,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const { updateProduct, fetchProducts } = useProductContext();

  const handleSave = async () => {
    try {
      await updateProduct(product._id, {
        name: editedProduct.name,
        description: editedProduct.description,
        price: editedProduct.price,
        category: editedProduct.category,
        tags: editedProduct.tags,
        image: editedProduct.image,
      });
      onClose(); 
      fetchProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleCancel = () => {
    onClose(); 
  };

  const {categories} = useCategoryContext();
  const {tags} = useTagsContext();

  // useEffect(() => {
  //   console.log('Tags context:', tags);
  // }, [tags]);

  return (
    <div className='container'>
      <form>
      <h3 className='addCategoryTitle'>Edit Product</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
          />
        </label>
        
        <label>
          <p>Category:</p>
          <select
            className='form-control'
            name="category"
            value={editedProduct.category}
            onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
          >
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>Tags:</p>
          <select
          className='form-control'
            name="tags"
            value={editedProduct.tags}
            onChange={(e) => setEditedProduct({ ...editedProduct, tags: e.target.value })}
          >
            {tags.map((tag) => (
              <option key={tag._id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>Product Image: </p>
          <img src={imagePreview || `http://localhost:3002/images/products/${product.image_url}`} alt="Preview" className="product-image" style={{ width: '300px', marginLeft: '110px'}} />
          <input 
          type="file" 
          name="image" 
          id='image'
          className='TagUploadFile'
          accept="image/*"
          onChange={handleImageChange} />
          
        </label>
        <button className='btn' type="submit" onClick={handleSave}>
          Save
        </button>
        <button className='btn' type="submit" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductEditForm;
