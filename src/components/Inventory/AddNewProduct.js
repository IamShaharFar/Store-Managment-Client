
import React, { useState } from "react";
import "./AddNewProduct.css";

const AddNewProduct = ({
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  stockQuantity,
  setStockQuantity,
  price,
  setPrice,
  barcode,
  setBarcode,
  handleFileChange,
  handleAdd,
}) => {
  const [isExpandedProduct, setisExpandedProduct] = useState(false);

  return (
    <div className="add-product">
      <div
        className="add-product-header"
        onClick={() => setisExpandedProduct(!isExpandedProduct)}
      >
        <h2 className="add-product-title">
          Add New Product
          {isExpandedProduct ? (
            <i className="fas fa-caret-up"></i>
          ) : (
            <i className="fas fa-caret-down"></i>
          )}
        </h2>
      </div>

      {isExpandedProduct && (
        <div className="add-product-form">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label>Product Description</label>
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />

          <label>Stock Quantity</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />

          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>Barcode</label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />

          <label>Product Image</label>
          <input type="file" onChange={handleFileChange} />

          <button onClick={handleAdd}>Add Product</button>
        </div>
      )}
    </div>
  );
};

export default AddNewProduct;
