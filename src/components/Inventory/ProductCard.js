import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({
  product_id,
  product_name,
  product_description,
  price,
  stock_quantity,
  image_url,
  barcode,
  onDelete,
  categories = [],
}) => {
  return (
    <Link to={`/inventory/${product_id}/statistics`}>
      <div className="product-card">
        <div className="product-image-wrapper">
          <img
            src={image_url}
            alt={product_name}
            className="product-card-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product_name}</h3>
          <p className="product-description">{product_description}</p>
          <p className="product-price">Price: ${price}</p>
          <p className="product-stock">Stock: {stock_quantity}</p>
          <p className="product-barcode">Barcode: {barcode}</p>
          <div className="product-categories">
            Categories: {categories.join(", ")}
          </div>
          <div className="product-actions">
            <button
              onClick={() => onDelete(product_id)}
              className="delete-button"
            >
              Delete
            </button>
            <button
              onClick={() =>
                (window.location.href = `/inventory/${product_id}`)
              }
              className="update-button"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
