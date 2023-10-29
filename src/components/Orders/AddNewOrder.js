import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddNewOrder.css";

const AddNewOrder = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderProducts, setOrderProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = window.localStorage.getItem("jwtToken");

  useEffect(() => {
    if (products && products.length > 0) {
      setSelectedProduct(products[0]._id);
    }
  }, [products]);

  const addProductToOrder = () => {
    const product = products.find((p) => p._id === selectedProduct);
    if (product) {
      // Check if product already exists in orderProducts
      const existingProduct = orderProducts.find((p) => p._id === product._id);

      if (existingProduct) {
        // Update quantity of existing product and recalculate total price
        const updatedProducts = orderProducts.map((p) =>
          p._id === existingProduct._id
            ? { ...p, quantity: p.quantity + Number(quantity) }
            : p
        );
        setOrderProducts(updatedProducts);
      } else {
        // Add new product to orderProducts
        setOrderProducts([...orderProducts, { ...product, quantity }]);
      }

      setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    }
  };

  const saveOrder = async () => {
    try {
      await axios.post(
        "http://localhost:3000/orders/add",
        {
          products: orderProducts,
          total_price: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle success, maybe clear the form or show a success message
    } catch (error) {
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <div className="new-order">
      <h2>Add New Order</h2>
      <div className="order-inputs">
        <img
          src={products.find((p) => p._id === selectedProduct)?.image_url}
          alt={products.find((p) => p._id === selectedProduct)?.product_name}
          className="product-image"
        />
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="" disabled>
            Select Product
          </option>
          {products.map((product) => (
            <option key={product.id} value={product._id}>
              {`${product.product_name} - ${product.price}$`}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={addProductToOrder}>Add Product to Order</button>
      </div>

      <div className="order-products">
        {orderProducts.map((product) => (
          <p key={product.id}>
            {product.product_name} - {product.quantity} - $
            {product.price * product.quantity}
          </p>
        ))}
      </div>
      <div className="order-total">Total Price: ${totalPrice.toFixed(2)}</div>
      <button onClick={saveOrder}>Save Order</button>
    </div>
  );
};

export default AddNewOrder;
