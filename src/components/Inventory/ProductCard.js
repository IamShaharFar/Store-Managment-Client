import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({
  product_id,
  product_name,
  product_description,
  price,
  stock_quantity,
  image_url,
  barcode,
  onDelete,
  categories = [],
}) {
  return (
    <div className="product-card">
      <div className="product-content">
        <img src={image_url} alt={product_name} className="product-image" />
        <div className="product-info">
          <h2 className="product-name">{product_name}</h2>
          <p className="product-description">{product_description}</p>
          <p className="product-price">${price.toFixed(2)}</p>
          <p className="product-stock">Stock: {stock_quantity}</p>
          <p className="product-barcode">Barcode: {barcode}</p>
          <p className="product-categories">
            Categories: {categories.join(", ")}
          </p>
        </div>
      </div>
      <div className="product-actions">
        <Link to={`/inventory/${product_id}`}>
          <button className="action-button update-button">Update</button>
        </Link>
        <button
          className="action-button delete-button"
          onClick={() => onDelete(product_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
