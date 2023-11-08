import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import OrderCard from "./OrderCard ";
import AddNewOrder from "./AddNewOrder";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(`${baseUrl}/inventory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    };

    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(`${baseUrl}/customers`, {
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
    const response = await axios.get(`${baseUrl}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(response.data);
    console.log(response.data)
  };

  const handleAddOrder = () => {
    fetchOrders();
  }

  const handlePay = async (order_id, isPaid) => {
    try {
      const token = window.localStorage.getItem("jwtToken"); 
      const response = await axios.put(`${baseUrl}/orders/update/${order_id}`, 
        {
          isPaid: isPaid
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.status === 200) {
        alert("Order payment status updated successfully!");    
      } else {
        alert("Failed to update the order payment status.");
      }
    } catch (error) {
      console.error("Error updating order payment status:", error);
      alert("Error updating the order payment status. Please try again.");
    }
  };
  

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
            IsPaid={order.isPaid}
            onDelete={fetchOrders}
            onPay={handlePay}
          />
        </div>
      ))}
    </div>
  );
};

export default Orders;
