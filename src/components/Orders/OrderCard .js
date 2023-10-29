import React, { useState } from "react";
import "./OrderCard.css";

const OrderCard = ({ order_id, order_date, products }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className="order-card">
      <div
        className="order-header"
        onClick={() => setDetailsVisible(!detailsVisible)}
      >
        <h2>Order {order_id}</h2>
        {detailsVisible ? (
          <i className="fas fa-caret-up"></i>
        ) : (
          <i className="fas fa-caret-down"></i>
        )}
      </div>
      {detailsVisible && (
        <div className="order-details">
          <p>
            <strong>Order Date:</strong> {order_date}
          </p>
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
        </div>
      )}
    </div>
  );
};

export default OrderCard;
