import React, { useState } from 'react';
import { useTagsContext } from '../../context/TagsContext';
import TagsEditForm from './TagsEditForm';
import '../../styles/TagsTable.css'; // Import file CSS untuk styling

const TagsTable = () => {
  const {tags, deleteTag} = useTagsContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [editingTag, setEditingTag] = useState(null);
  const [editClickCount, setEditClickCount] = useState(0);

  const tagsPerPage = 10;
  const totalPages = Math.ceil(tags.length / tagsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * tagsPerPage;
  const endIndex = startIndex + tagsPerPage;
  const currentTags = tags.slice(startIndex, endIndex);

  const handleEdit = (tag) => {
    if (editingTag && editingTag._id === tag._id) {
      setEditingTag(null);
      setEditClickCount(0);
    } else {
      setEditingTag(tag);
      setEditClickCount((prevCount) => prevCount + 1);
    }
  };

  const handleCloseEditForm = () => {
    setEditingTag(null);
    setEditClickCount(0);
  };

  const handleDelete = async (tagId) => {
    try {
      await deleteTag(tagId);
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  

  return (
    <div className='container'>
      <div className="">
        <h2 className='tagListTitle'>Tag List</h2>
        <table className='tableTags'>
          <thead className='thTag'>
            <tr>
              <th>No</th>
              <th>Tag Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='tbodyTag'>
            {currentTags.map((tag, index) => (
              <React.Fragment key={tag._id}>
                <tr className='rowTag'>
                <td className='tag-no'>{startIndex + index + 1}</td>
                <td className='tag-name'>{tag.name}</td>
                <td className='tag-image'>
                  <img src={`http://localhost:3002/images/products/${tag.image_url}`} alt={tag.name} className="tag-image" />
                </td>
                <td className='tag-action'>
                  {editingTag && editingTag._id === tag._id ? (
                    <React.Fragment>
                      <button className='btn btn-primary' onClick={() => handleEdit(tag)}>Cancel </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <button className='btn btn-primary' onClick={() => handleEdit(tag)}>Edit</button>
                      <button className='btn btn-primary' onClick={() => handleDelete(tag._id)}>Delete</button>
                    </React.Fragment>
                  )}
                </td>
              </tr>
              {editingTag && editingTag._id === tag._id && editClickCount > 0 && (
                <tr>
                  <td colSpan="8">
                    <TagsEditForm tag={editingTag} onClose={handleCloseEditForm} />

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

export default TagsTable;
