import React, { useState } from 'react';
import { useTagsContext } from '../../context/TagsContext';
import { useCategoryContext } from '../../context/CategoryContext';
import '../../styles/AddTags.css'; // Import file CSS untuk stylingfff

const AddTags = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    category: '',
  });

  const { addTag } = useTagsContext();
  const { categories, fetchCategories } = useCategoryContext();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTag(formData);
      setFormData({
        name: '',
        image: null,
        category: '',
      });
    } catch (error) {
      console.error('Failed to add tag:', error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='add-tags-containers'>
          <h2 className='addTagsTitle'>Add New Tag</h2>

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className='form-control'
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="name">Tag Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className='form-control'
          />
        </div>

        <div className='form-group-addTags'>
          <label htmlFor="image">Tag Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className='TagUploadFile'
          />
          {formData.image && (
            <div className='preview'>
              <img src={URL.createObjectURL(formData.image)} alt="Preview" className='ing-fluid' style={{ width: '300px',marginLeft: '100px' }}/>
              {/* <p>{formData.image.name}</p> */}
              <button type="button" onClick={handleRemoveImage} className='btn btnRemoveImage'>Remove Image</button>
            </div>
          )}
        </div>  
        <button className='btn btnSubmitAddTags' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTags;


