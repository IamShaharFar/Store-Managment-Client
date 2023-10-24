// Inventory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Inventory.css";

function Inventory() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [CategoryName, setCategoryName] = useState("");
  const [CategoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const baseURL = "http://localhost:3000/inventory";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(baseURL, {
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

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:3000/categories/get-all-categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("product_description", productDescription);
      formData.append("stock_quantity", stockQuantity);
      formData.append("price", price);
      formData.append("barcode", barcode);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post(`${baseURL}/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Important when sending files
        },
      });

      alert("Product added successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const handleCategoryAdd = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post("http://localhost:3000/categories/add-category", 
        {
          name: CategoryName,  
          description: CategoryDescription  
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.status === 201) {  
        alert("Category added successfully");
        setCategoryName("");  
        setCategoryDescription("");  
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };
  

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:3000/inventory/delete/${productId}`,
        config
      );

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = (newSortOrder) => {
    if (sortOrder === newSortOrder) {
      setSortOrder("");
    } else {
      setSortOrder(newSortOrder);
    }
  };

  function getProductCategoryNames(product, categories) {
    return product.categories.map(catId => {
        const categoryObj = categories.find(category => category._id === catId);
        return categoryObj ? categoryObj.name : null;
    }).filter(Boolean);
}

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts];
  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
  }


  // Similarly, you can add handleUpdate, handleDelete, handleGet, and handleList functions

  return (
    <div className="inventory">
      <div className="inventory-products-add">
        <div className="add-product">
          <h3>Add Product</h3>
          <hr />
          <label htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label htmlFor="product-description">Product Description</label>
          <input
            id="product-description"
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />

          <label htmlFor="stock-quantity">Stock Quantity</label>
          <input
            id="stock-quantity"
            type="number"
            placeholder="Stock Quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />

          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <label htmlFor="barcode">Barcode</label>
          <input
            id="barcode"
            placeholder="Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />

          <label htmlFor="image-upload">Image Upload</label>
          <input id="image-upload" type="file" onChange={handleFileChange} />

          <button onClick={handleAdd}>Add Product</button>
          <hr/>
          <h3>Add Category</h3>
          <label htmlFor="category-name">Category Name</label>
          <input
            id="category-name"
            placeholder="Category Name"
            value={CategoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <label htmlFor="category-description">Category Description</label>
          <input
            id="category-description"
            placeholder="Category Description"
            value={CategoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
          <button onClick={handleCategoryAdd}>Add Category</button>
        </div>

        <div className="products">
          <h3>Your Products</h3>
          <hr />
          <div className="filter-section-inventory">
            <input
              className="search-input-inventory"
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className={`sort-button-inventory ${
                sortOrder === "asc" ? "active-filter" : ""
              }`}
              onClick={() => toggleSortOrder("asc")}
            >
              Sort A-Z
            </button>
            <button
              className={`sort-button-inventory ${
                sortOrder === "desc" ? "active-filter" : ""
              }`}
              onClick={() => toggleSortOrder("desc")}
            >
              Sort Z-A
            </button>
          </div>
          <ul>
            {sortedProducts.map((product) => (
              <li key={product._id}>
                <button onClick={() => console.log(getProductCategoryNames(product, categories))}>categories</button>
                <ProductCard
                  key={product._id}
                  product_id={product._id}
                  product_name={product.product_name}
                  product_description={product.product_description}
                  price={product.price}
                  stock_quantity={product.stock_quantity}
                  image_url={product.image_url}
                  barcode={product.barcode}
                  categories={getProductCategoryNames(product, categories)}
                  onDelete={deleteProduct}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
