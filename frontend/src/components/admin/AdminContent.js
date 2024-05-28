import React from 'react';
import AddTags from './AddTags';
import TagsTable from './TagsTable';
import AddProduct from './AddProduct';
import ProductTable from './ProductTable';
import AddCategory from './AddCategory';
import CategoryTable from './CategoryTable';

const AdminContent = () => {
  return (
    <div className="admin-content">
      <AddCategory />
      <CategoryTable />
      <AddTags />
      <TagsTable />
      <AddProduct />
      <ProductTable />
    </div>
  );
};

export default AdminContent;
