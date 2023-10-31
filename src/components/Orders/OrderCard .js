import React, { useState } from "react";
import axios from "axios";
import "./OrderCard.css";

const OrderCard = ({ order_id, order_date, products, customer_name, onDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const token = window.localStorage.getItem("jwtToken"); // Assuming you store the JWT token in localStorage
      const response = await axios.delete(`http://localhost:3000/orders/delete/${order_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        alert("Order deleted successfully!");
        onDelete();
        // Optionally, you can add any other logic here to update the UI after deletion.
      } else {
        alert("Failed to delete the order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting the order. Please try again.");
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="order-card">
      <div
        className="order-header"
        onClick={() => setDetailsVisible(!detailsVisible)}
      >
        <h2>Order - {customer_name} - {formatDate(order_date)}</h2>
        {detailsVisible ? (
          <i className="fas fa-caret-up"></i>
        ) : (
          <i className="fas fa-caret-down"></i>
        )}
      </div>
      {detailsVisible && (
        <div className="order-details">
          {products.map((product) => (
            <div key={product.product_id} className="product">
              <img src={product.image_url} alt={product.product_name} />
              <div className="product-info">
                <p>
                  <strong>Product ID:</strong> {product.product_id}
                </p>
                <p>
                  <strong>Product Name:</strong> {product.product_name}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
              </div>
            </div>
          ))}
      <button onClick={handleDelete} className="delete-btn">Delete Order</button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
