import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddNewOrder.css";

const AddNewOrder = ({ products, onAdd }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderProducts, setOrderProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const token = window.localStorage.getItem("jwtToken");

  useEffect(() => {
    if (products && products.length > 0) {
      setSelectedProduct(products[0]._id);
    }
    fetchCustomers();
  }, [products]);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:3000/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(response.data);
      if (response.data.length > 0) {
        setSelectedCustomer(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

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
      setQuantity(1);
      setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    }
  };

  const removeProductFromOrder = (productId) => {
    const productToRemove = orderProducts.find((p) => p._id === productId);
    if (productToRemove) {
      const newOrderProducts = orderProducts.filter((p) => p._id !== productId);
      setOrderProducts(newOrderProducts);
      setTotalPrice(
        (prevPrice) =>
          prevPrice - productToRemove.price * productToRemove.quantity
      );
    }
  };

  const saveOrder = async () => {
    try {
      await axios.post(
        "http://localhost:3000/orders/add",
        {
          products: orderProducts,
          total_price: totalPrice,
          customer_id: selectedCustomer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("order added succefully!");
      onAdd();
      // Handle success, maybe clear the form or show a success message
    } catch (error) {
      // Handle error, maybe show an error message to the user
    }
  };

  return (
    <div className="new-order">
      <h2>Add New Order</h2>
      <div className="new-order-inputs-image">
        <div>
          <img
            src={products.find((p) => p._id === selectedProduct)?.image_url}
            alt={products.find((p) => p._id === selectedProduct)?.product_name}
            className="product-image"
          />
        </div>
        <div className="order-inputs">
          <div className="input-div">
            <label htmlFor="product-select">Choose Product:</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="" key="select-product" disabled>
                Select Product
              </option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {`${product.product_name} - ${product.price}$`}
                </option>
              ))}
            </select>
          </div>
          <div className="input-div">
            <label htmlFor="quantity-input">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="input-div">
            <label htmlFor="customer-select">Choose Customer:</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="" key="select-customer" disabled>
                Select Customer
              </option>
              {customers
                .sort((a, b) => a.customer_name.localeCompare(b.customer_name))
                .map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.customer_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button className="add-product-btn" onClick={addProductToOrder}>
          Add Product to Order
        </button>
      </div>

      <div className="order-products">
        {orderProducts.map((product) => (
          <div key={product._id} className="order-product-item">
            <button
              className="remove-btn"
              onClick={() => removeProductFromOrder(product._id)}
            >
              <i className="fas fa-times"></i>
            </button>
            <span>
              {product.product_name} - {product.quantity} - $
              {product.price * product.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="order-total">Total Price: ${totalPrice.toFixed(2)}</div>
      <button onClick={saveOrder}>Save Order</button>
    </div>
  );
};

export default AddNewOrder;
