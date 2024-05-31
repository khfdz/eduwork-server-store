import React, { useState } from 'react';
import AddTags from './AddTags';
import TagsTable from './TagsTable';
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';
import AddCategory from './AddCategory';
import CategoryTable from './CategoryTable';
import '../../styles/AdminContent.css';

const AdminContent = () => {
  const [contentVisibility, setContentVisibility] = useState({
    category: false,
    tag: false,
    product: false,
  });

  const toggleContentVisibility = (contentType) => {
    setContentVisibility(prevVisibility => ({
      ...prevVisibility,
      [contentType]: !prevVisibility[contentType],
    }));
  };

  return (
    <div className="admin-content">
      <div className="contentAdmin">
        <button className='buttonContent' onClick={() => toggleContentVisibility('category')}>
          {contentVisibility.category ? 'Hide Category Content' : 'Add New Category'}
        </button>
        {contentVisibility.category && (
          <div className='contenCategory'>
            <AddCategory />
            <CategoryTable />
          </div>
        )}

        <button className='buttonContent' onClick={() => toggleContentVisibility('tag')}>
          {contentVisibility.tag ? 'Hide Tag Content' : 'Add New Tag'}
        </button>
        {contentVisibility.tag && (
          <div className='contentTag'>
            <AddTags />
            <TagsTable />
          </div>
        )}

        <button className='buttonContent' onClick={() => toggleContentVisibility('product')}>
          {contentVisibility.product ? 'Hide Product Content' : 'Add New Product'}
        </button>
        {contentVisibility.product && (
          <div className='contentProduct'>
            <AddProduct />
            <ProductTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContent;
