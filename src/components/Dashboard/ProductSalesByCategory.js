import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./ProductSalesByCategory.css";

const ProductSalesByCategory = ({ orders, categories, products }) => {
  const [timePeriod, setTimePeriod] = useState("All time");
  const [categoryData, setCategoryData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCategoryNameById = (id) => {
    const category = categories.find((c) => c._id === id);
    return category ? category.name : "Unknown";
  };

  const calculateSalesByCategory = () => {
    const now = new Date();
    let startDate;

    switch (timePeriod) {
      case "Last 7 days":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "Last 30 days":
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case "Last 6 months":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "Last year":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(0);
        break;
    }

    const categorySales = {};

    orders.forEach((order) => {
      order.products.forEach((productOrder) => {
        if (new Date(order.order_date) >= startDate) {
          const product = products.find(
            (p) => p._id === productOrder.product_id
          );
          if (product && product.categories) {
            product.categories.forEach((categoryId) => {
              const categoryName = getCategoryNameById(categoryId);
              categorySales[categoryName] =
                (categorySales[categoryName] || 0) + productOrder.quantity;
            });
          }
        }
      });
    });

    const formattedData = Object.keys(categorySales).map((category) => ({
      category,
      sales: categorySales[category],
    }));

    setCategoryData(formattedData);
  };

  useEffect(() => {
    calculateSalesByCategory();
  }, [orders, timePeriod]);

  return (
    <div className="category-sales-container">
      <h2>Product Sales by Category</h2>
      <select
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value)}
      >
        <option value="All time">All time</option>
        <option value="Last 7 days">Last 7 days</option>
        <option value="Last 30 days">Last 30 days</option>
        <option value="Last 6 months">Last 6 months</option>
        <option value="Last year">Last year</option>
      </select>
      <div className="linechart-container-psbc">
        <BarChart width={windowWidth > 768 ? windowWidth*0.45 : windowWidth*0.9} height={300} data={categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default ProductSalesByCategory;
