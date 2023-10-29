import React from 'react';
import './BasicProductInfo.css';

const BasicProductInfo = ({ name, description, price, stockQuantity, barcode, categories, imageUrl, dateAdded }) => {
    return (
        <div className="basic-product-info">
            <img src={imageUrl} alt="Product Image" className="product-image" />
            <h2 className="product-name">{name}</h2>
            <p className="product-description">{description}</p>
            <p className="product-price">${price}</p>
            <p className="product-stock">Stock: {stockQuantity}</p>
            <p className="product-barcode">Barcode: {barcode}</p>
            <div className="product-categories">
                {categories.map((category) => (
                    <span className="product-category">{category.name}</span>
                ))}
            </div>
            <p className="product-date">Date Added: {new Date(dateAdded).toLocaleDateString()}</p>
        </div>
    );
};

export default BasicProductInfo;
