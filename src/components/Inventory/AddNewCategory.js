import React, { useState } from 'react';
import './AddNewCategory.css';

const AddNewCategory = ({
  CategoryName,
  setCategoryName,
  CategoryDescription,
  setCategoryDescription,
  handleCategoryAdd
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="add-category">
      <div className="add-category-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="add-category-title">Add New Category {isExpanded ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}</h2>
      </div>
      {isExpanded && (
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
