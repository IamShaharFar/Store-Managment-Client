import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductInformation.css";

function ProductInformation() {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [product_id]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `http://localhost:3000/inventory/${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        "http://localhost:3000/categories/get-all-categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
  
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0]._id);
      }
  
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddCategory = () => {
    if (selectedCategory && !product.categories.includes(selectedCategory)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        categories: [...prevProduct.categories, selectedCategory],
      }));
    }
  };
  

  const handleRemoveCategory = (categoryIdToRemove) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categories: prevProduct.categories.filter(
        (catId) => catId !== categoryIdToRemove
      ),
    }));
  };

  const handleImageChange = (event) => {
    setUploadedImage(event.target.files[0]);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const formData = new FormData();
  
      // Handle each key in the product
      for (let key in product) {
        // Special handling for array fields like 'categories'
        if (Array.isArray(product[key])) {
          product[key].forEach(item => {
            formData.append(`${key}[]`, item);
          });
        } else {
          formData.append(key, product[key]);
        }
      }
   
  
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        },
      };
  
      await axios.put(
        `http://localhost:3000/inventory/update/${product_id}`,
        formData,
        config
      );
  
      alert("Product updated successfully!");
    } catch (error) {
      alert(error);
      console.error("Error updating product:", error);
    }
  };
  
  

  return isLoading ? (
    <div>
      Loading...
      <h1>loading</h1>
    </div>
  ) : (
    <div className="product-information-container">
      <div className="product-information">
        <h2>Update your Product</h2>
        <hr />
        <label htmlFor="product_name">Product Name:</label>
        <input
          id="product_name"
          name="product_name"
          value={product.product_name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />

        <label htmlFor="product_description">Product Description:</label>
        <input
          id="product_description"
          name="product_description"
          value={product.product_description}
          onChange={handleInputChange}
          placeholder="Product Description"
        />

        <label htmlFor="stock_quantity">Stock Quantity:</label>
        <input
          type="number"
          id="stock_quantity"
          name="stock_quantity"
          value={product.stock_quantity}
          onChange={handleInputChange}
          placeholder="Stock Quantity"
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Price"
        />

        <label htmlFor="barcode">Barcode:</label>
        <input
          id="barcode"
          name="barcode"
          value={product.barcode}
          onChange={handleInputChange}
          placeholder="Barcode"
        />
        <label htmlFor="product-image">Upload Image:</label>
        <input type="file" className="product-image-upload" onChange={handleImageChange} />
        <div className="category-add-container">
          <h4 className="category-add-title">Add Category:</h4>
          <select
            className="category-add-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <button className="category-add-button" onClick={handleAddCategory}>
            Add
          </button>
        </div>
        <div>
          <h4>Product Categories:</h4>
          <ul>
            {product.categories.map((catId) => {
              const category = categories.find((cat) => cat._id === catId);
              return (
                <li key={catId} className="remove-category-container">
                  <button
                    className="remove-category-button"
                    onClick={() => handleRemoveCategory(catId)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  {category ? category.name : "Unknown"}
                </li>
              );
            })}
          </ul>
        </div>


        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
}

export default ProductInformation;
