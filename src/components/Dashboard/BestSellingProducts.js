import React, { useState, useEffect } from 'react';
import './BestSellingProducts.css';

const BestSellingProducts = ({ orders }) => {
    const [sortedProductsList, setSortedProductsList] = useState([]);

    const calculateMostSellingProducts = () => {
        const productCount = {};

        orders.forEach(order => {
            order.products.forEach(product => {
                if (productCount[product.product_name]) {
                    productCount[product.product_name] += product.quantity;
                } else {
                    productCount[product.product_name] = product.quantity;
                }
            });
        });

        const sortedProducts = Object.entries(productCount).sort((a, b) => b[1] - a[1]).slice(0, 5); // Limit to top 5
        setSortedProductsList(sortedProducts);
    };

    useEffect(() => {
        calculateMostSellingProducts();
    }, [orders]);

    return (
        <div className="best-selling-container">
            <h2>Most Selling Products</h2>
            <ul>
                {sortedProductsList.map(([productName, quantity], index) => (
                    <li key={index}>
                        <span className="product-name">{productName}</span>
                        <span className="product-quantity">{quantity} sold</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BestSellingProducts;

