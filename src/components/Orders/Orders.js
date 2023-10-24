import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import NewOrder from './NewOrder';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get("http://localhost:3000/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data);
        };

        fetchOrders();
    }, []);

    return (
        <div className="orders">
            <NewOrder/>
            <h2>Your Orders</h2>
            {orders.map(order => (
                <div key={order._id} className="order-item">
                    {/* Display order details */}
                    {/* Note: This assumes each order has a product list and other details */}
                    {order.products.map(product => (
                        <div key={product._id}>
                            <p>Product: {product.product_name}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Orders;
