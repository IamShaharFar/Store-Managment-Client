import React, { useEffect, useState } from "react";
import BestSellingProducts from "./BestSellingProducts";
import axios from "axios";
import MonthlySalesGraph from "./MonthlySalesGraph ";
import TotalOrders from "./TotalOrders";
import AverageOrderValue from "./AverageOrderValue";
import ProductSalesByCategory from "./ProductSalesByCategory";
import SalesPerformanceByCategory from "./SalesPerformanceByCategory";
import "./Dashboard.css";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:3000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
      console.log(response.data);
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:3000/categories/get-all-categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:3000/inventory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products");
      }
    };

    fetchOrders();
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="top-section">
        <BestSellingProducts orders={orders} />
        <div className="vertical">
          <TotalOrders orders={orders} />
          <AverageOrderValue orders={orders} />
        </div>
      </div>
      <div className="middle-section">
        <MonthlySalesGraph orders={orders} />
        <ProductSalesByCategory
          orders={orders}
          categories={categories}
          products={products}
        />
      </div>
    </div>
  );
};

export default Dashboard;
