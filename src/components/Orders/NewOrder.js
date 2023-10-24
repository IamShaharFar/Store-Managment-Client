import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewOrder.css";

const NewOrder = () => {
  const [products, setProducts] = useState([]); // to store all available products
  const [selectedProductId, setSelectedProductId] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [orderProducts, setOrderProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

    fetchProducts();
  }, []);

  const addProductToOrder = () => {
    const selectedProduct = products.find((p) => p._id === selectedProductId);
    if (!selectedProduct) return;

    const newProduct = {
      product_id: selectedProductId,
      product_name: selectedProduct.product_name,
      quantity: productQuantity,
    };

    const addedPrice = selectedProduct.price * productQuantity;

    setTotalPrice((prevTotal) => prevTotal + addedPrice);
    setOrderProducts((prev) => [...prev, newProduct]);
    setSelectedProductId("");
    setProductQuantity(1);
  };

  const saveOrder = async () => {
    const token = localStorage.getItem('jwtToken');
    await axios.post("http://localhost:3000/orders/add", {
        products: orderProducts,
        total_price: totalPrice
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    setOrderProducts([]);
    setTotalPrice(0);
};

  return (
    <div className="new-order">
      <h2>Create New Order</h2>

      <div className="order-form">
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.product_name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(Number(e.target.value))}
          placeholder="Quantity"
        />
        <button onClick={addProductToOrder}>Add Product</button>
      </div>

      <div className="order-products-list">
        {orderProducts.map((product, index) => (
          <div key={index}>
            <p>Product Name: {product.product_name}</p>
            <p>Product ID: {product.product_id}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>

      <button onClick={saveOrder}>Save Order</button>
    </div>
  );
};

export default NewOrder;
