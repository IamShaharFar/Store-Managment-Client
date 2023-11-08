import React, { useState } from 'react';
import './AddNewCategory.css';

const AddNewCategory = ({
  CategoryName,
  setCategoryName,
  CategoryDescription,
  setCategoryDescription,
  handleCategoryAdd
}) => {
  const [isExpandedCategory, setisExpandedCategory] = useState(false);

  return (
    <div className="add-category">
      <div className="add-category-header" onClick={() => setisExpandedCategory(!isExpandedCategory)}>
        <h2 className="add-category-title">Add New Category {isExpandedCategory ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}</h2>
      </div>
      {isExpandedCategory && (
        <div className="add-category-form">
          <label>Category Name</label>
          <input type="text" value={CategoryName} onChange={(e) => setCategoryName(e.target.value)} />
          
          <label>Category Description</label>
          <input type="text" value={CategoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} />
          
          <button onClick={handleCategoryAdd}>Add Category</button>
        </div>
      )}
    </div>
  );
};

export default AddNewCategory;
