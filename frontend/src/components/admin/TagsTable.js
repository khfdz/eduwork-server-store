import React, { useState } from 'react';
import { useTag } from '../../context/TagContext';
import '../../styles/TagsTable.css'; // Import file CSS untuk styling

const TagsTable = () => {
  const tags = useTag();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='container'>
      <div className="">
        <h2 className='tagListTitle'>Tag List</h2>
        <table className='table table-striped tags-table'>
          <thead className='thTag'>
            <tr>
              <th>No</th>
              <th>Tag Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='tbodyTag'>
            {tags.map((tag, index) => (
              <tr key={index}>
                <td className='tag-no'>{(currentPage - 1) * 12 + index + 1}</td>
                <td className='tag-name'>{tag.name}</td>
                <td className='tag-image'>
                  <img src={`http://localhost:3002/images/products/${tag.image_url}`} alt={tag.name} className="tag-image" />
                </td>
                <td className='tag-action'>
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
