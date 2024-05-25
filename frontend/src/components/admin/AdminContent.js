import React from 'react';
import AddTags from './AddTags';
import TagsTable from './TagsTable';
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';

const AdminContent = () => {
  return (
    <div className="admin-content">
      <AddTags />
      <TagsTable />
      <AddProduct />
      <ProductTable />
    </div>
  );
};

export default AdminContent;
