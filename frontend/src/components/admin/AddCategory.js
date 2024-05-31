import React, { useState, useEffect } from 'react';
import { useCategoryContext } from '../../context/CategoryContext';
import '../../styles/addCategory.css'; // Import file CSS untuk styling

const AddCategory = () => {
    
    const [formData, setFormData] = useState({
        name: '',
    });

    const { addCategory, fetchCategory } = useCategoryContext();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCategory(formData);
            setFormData({
                name: '',
            });
            fetchCategory();
        } catch (error) {
            console.error('Failed to add category:', error);
        }
    };

    return (
        <div className='container'>
        <div className="add-category-container">
            <form onSubmit={handleSubmit}>
            <p className='addCategoryTitle'>Add New Category</p>
                <div className="">
                    <label htmlFor="name">Tag Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button className='btn' type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default AddCategory;