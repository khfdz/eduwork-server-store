import React, { useState } from 'react';
import { useTagsContext } from '../../context/TagsContext';
import '../../styles/AddTags.css'; // Import file CSS untuk styling

const AddTags = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    image: null
  });

  const { addTag } = useTagsContext();

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
        image: null
      });
    } catch (error) {
      console.error('Failed to add tag:', error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group-addTags'>
          <h2>Add New Tag</h2>
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
            className='form-control-file'
          />
          {formData.image && (
            <div className='preview'>
              <img src={URL.createObjectURL(formData.image)} alt="Preview" className='ing-fluid' style={{ width: '300px',marginLeft: '100px' }}/>
              {/* <p>{formData.image.name}</p> */}
              <button type="button" onClick={handleRemoveImage} className='btn btn-danger'>Remove Image</button>
            </div>
          )}
        </div>  
        <button className='btn btn-primary' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTags;


