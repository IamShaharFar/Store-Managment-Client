// ProductsListComponent.js
import React from 'react';
import ProductCard from './ProductCard';

function ProductsList({ products, categories, onDelete, getProductCategoryNames }) {
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product_id={product._id}
          product_name={product.product_name}
          product_description={product.product_description}
          price={product.price}
          stock_quantity={product.stock_quantity}
          image_url={product.image_url}
          barcode={product.barcode}
          categories={getProductCategoryNames(product, categories)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductsList;

