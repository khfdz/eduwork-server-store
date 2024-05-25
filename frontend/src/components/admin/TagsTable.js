import React, { useState } from 'react';
import { useTag } from '../../context/TagContext';
import '../../styles/TagsTable.css'; // Import file CSS untuk styling

const TagsTable = () => {
  const tags = useTag();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='container'>
    <div className="tags-table">
      <h2>Tags</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>No</th>
            <th>Tag Name</th>
            <th>Image URL</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * 12 + index + 1}</td>
              <td>{tag.name}</td>
              <td>{tag.image_url}</td>
              <td>
                <img src={`http://localhost:3002/images/products/${tag.image_url}`} alt={tag.name} className="tag-image" />
              </td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TagsTable;
