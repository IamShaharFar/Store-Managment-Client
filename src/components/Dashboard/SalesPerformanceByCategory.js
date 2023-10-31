import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './SalesPerformanceByCategory.css';

const SalesPerformanceByCategory = ({ orders, categories, products }) => {
    const [categoryData, setCategoryData] = useState([]);

    const getCategoryNameById = (id) => {
        const category = categories.find(c => c._id === id);
        return category ? category.name : 'Unknown';
    };

    const calculateSalesPerformance = () => {
        // Initialize all categories with zero sales
        const categorySales = {};
        categories.forEach(category => {
            categorySales[getCategoryNameById(category._id)] = 0;
        });

        orders.forEach(order => {
            order.products.forEach(productOrder => {
                const product = products.find(p => p._id === productOrder.product_id);
                if (product && product.categories) {
                    product.categories.forEach(categoryId => {
                        const categoryName = getCategoryNameById(categoryId);
                        categorySales[categoryName] += productOrder.quantity;
                    });
                }
            });
        });

        const formattedData = Object.keys(categorySales).map(category => ({
            category,
            sales: categorySales[category]
        }));

        setCategoryData(formattedData);
    };

    useEffect(() => {
        calculateSalesPerformance();
    }, [orders]);

    return (
        <div className="sales-performance-container">
            <h2>Sales Performance by Category</h2>
            <BarChart width={600} height={300} data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default SalesPerformanceByCategory;
