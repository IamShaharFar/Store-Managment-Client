// Inventory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Filtering from "./Filtering";
import ProductsList from "./ProductsList";
import AddNewProduct from "./AddNewProduct";
import AddNewCategory from "./AddNewCategory";
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(`${baseUrl}/inventory`, {
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
      const response = await axios.get(
        `${baseUrl}/categories/get-all-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      console.log(`${baseUrl}/inventory/add`)
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

      await axios.post(`${baseUrl}/inventory/add`, formData, {
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
      const response = await axios.post(
        `${baseUrl}/categories/add-category`,
        {
          name: CategoryName,
          description: CategoryDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        `${baseUrl}/inventory/delete/${productId}`,
        config
      );

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearchChange = (event) => {
    // console.log(event)
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
    return product.categories
      .map((catId) => {
        const categoryObj = categories.find(
          (category) => category._id === catId
        );
        return categoryObj ? categoryObj.name : null;
      })
      .filter(Boolean);
  }

  const toggleCategorySelection = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= minPrice &&
      product.price <= maxPrice
  );

  const sortedProducts = [...filteredProducts];
  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
  }

  const filteredByCategoryProducts = selectedCategories.length
    ? sortedProducts.filter((product) =>
        selectedCategories.some((catId) => product.categories.includes(catId))
      )
    : sortedProducts;

  // Similarly, you can add handleUpdate, handleDelete, handleGet, and handleList functions

  return (
    <div className="inventory">
      <div className="inventory-products-add">
        <div className="add-section">
          <AddNewProduct
            productName={productName}
            setProductName={setProductName}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
            stockQuantity={stockQuantity}
            setStockQuantity={setStockQuantity}
            price={price}
            setPrice={setPrice}
            barcode={barcode}
            setBarcode={setBarcode}
            handleFileChange={handleFileChange}
            handleAdd={handleAdd}
          />
          <AddNewCategory
            CategoryName={CategoryName}
            setCategoryName={setCategoryName}
            CategoryDescription={CategoryDescription}
            setCategoryDescription={setCategoryDescription}
            handleCategoryAdd={handleCategoryAdd}
          />
        </div>
      </div>
      <div className="products">
        <h3>Your Products</h3>
        <hr />

        {/* Filtering Component */}
        <Filtering
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          showCategoryDropdown={showCategoryDropdown}
          setShowCategoryDropdown={setShowCategoryDropdown}
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategorySelection={toggleCategorySelection}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
          minPrice={minPrice}
          maxPrice={maxPrice}
          topPrice={
            products.length > 0
              ? Math.max(...products.map((product) => product.price))
              : 0
          }
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* Products List Component */}
        <ProductsList
          products={filteredByCategoryProducts}
          categories={categories}
          onDelete={deleteProduct}
          getProductCategoryNames={getProductCategoryNames}
        />
      </div>
    </div>
  );
}

export default Inventory;
