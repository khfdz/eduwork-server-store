import React, { useState } from "react";
import { useCategoryContext } from "../../context/CategoryContext";
import "../../styles/CategoryEditForm.css";

const CategoryEditForm = ({ category, onClose }) => {
    const [editedCategory, setEditedCategory] = useState({
        name: category.name,
    });

    const { updateCategory, fetchCategories } = useCategoryContext();

    const handleSave = async () => {
        try {
            await updateCategory(category._id, { name: editedCategory.name });
            onClose();
            fetchCategories();
        } catch (error) {
            console.error("Failed to update category:", error);
        }
    };

    return (
        <div className="category-edit-form">
            <h2>Edit Category</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={editedCategory.name}
                    onChange={(e) =>
                        setEditedCategory({
                            ...editedCategory,
                            name: e.target.value,
                        })
                    }
                />
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CategoryEditForm;
