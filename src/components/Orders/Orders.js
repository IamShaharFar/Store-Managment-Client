import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import OrderCard from "./OrderCard ";
import AddNewOrder from "./AddNewOrder";

const Orders = () => {
  const [orders, setOrders] = useState([]);
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

    const fetchProducts = async () => {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:3000/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    };

    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <AddNewOrder products={products} />
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-item">
          <OrderCard
            order_id={order._id}
            order_date={order.order_date}
            products={order.products}
          />
        </div>
      ))}
    </div>
  );
};

export default Orders;
