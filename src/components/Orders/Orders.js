import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import OrderCard from "./OrderCard ";
import AddNewOrder from "./AddNewOrder";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:3000/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    };

    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:3000/customers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchProducts();
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get("http://localhost:3000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(response.data);
  };

  const handleAddOrder = () => {
    fetchOrders();
  }

  return (
    <div className="orders">
      <AddNewOrder products={products} onAdd={handleAddOrder}/>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-item">
          <OrderCard
            order_id={order._id}
            order_date={order.order_date}
            products={order.products}
            customer_name={customers.find(customer => customer._id == order.customer_id)?.customer_name}
            onDelete={fetchOrders}
          />
        </div>
      ))}
    </div>
  );
};

export default Orders;
