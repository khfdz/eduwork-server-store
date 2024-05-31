import React, { useState } from 'react';
import { useCategoryContext } from '../../context/CategoryContext';
import '../../styles/CategoryTable.css'; // Import file CSS untuk
import CategoryEditForm from './CategoryEditForm';


const CategoryTable = () => {
    const { categories, deleteCategory } = useCategoryContext();

    const [currentPage, setCurrentPage] = useState(1);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editClickCount, setEditClickCount] = useState(0);

    const categoriesPerPage = 10;
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * categoriesPerPage;
    const endIndex = startIndex + categoriesPerPage;
    const currentCategories = categories.slice(startIndex, endIndex);

    const handleEdit = (category) => {
        if (editingCategory && editingCategory._id === category._id) {
            setEditingCategory(null);
            setEditClickCount(0);
        } else {
            setEditingCategory(category);
            setEditClickCount((prevCount) => prevCount + 1);
        }
    };

    const handleCloseEditForm = () => {
        setEditingCategory(null);
        setEditClickCount(0);
    };

    const handleDelete = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    return (
        <div className='container'>
            <div className="categoryContainerz">
                <h2 className='categoryListTitle'></h2>
                <table className='tableCategory'>
                    <thead className='thCategory'>
                        <tr>
                            <th className='categoryNo'>No</th>
                            <th className='categoryName'>Name</th>
                            <th className='categoryAction'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''> 
                        {currentCategories.map((category, index) => (
                            <React.Fragment key={category._id}>
                                <tr className='rowCategory'> 
                                <td className='categoryNo'>{startIndex + index + 1}</td>
                                <td className='categoryName'>{category.name}</td>
                                <td className='tagAction'>
                                    {editingCategory && editingCategory._id === category._id ? (
                                        <React.Fragment>
                                            <button className='btn btn-primary' onClick={() => handleEdit(category)}>
                                                Cancel
                                            </button>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                        <button className='btn btn-primary' onClick={() => handleEdit(category)}>
                                            Edit
                                        </button>
                                        </React.Fragment>
                                   
                                    )}
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => handleDelete(category._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                        </tr>
                    {editingCategory && editingCategory._id === category._id && editClickCount > 0 && (
                        <tr>
                            <td colSpan="8">
                                <CategoryEditForm category={editingCategory} onClose={handleCloseEditForm} />

                            </td>
                        </tr>
                        
                    )}


                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                


                <div className='productTabelPagination'>
    {Array.from({ length: totalPages }, (_, index) => (
        <button 
            className='paginationButton' 
            key={index + 1} 
            onClick={() => setCurrentPage(index + 1)}
            data-active={currentPage === index + 1} 
        >
            {index + 1}
        </button>
    ))}
</div>

            </div>
        </div>
    );
};

export default CategoryTable;