import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductStatistics() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = window.localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchProduct();
    fetchOrders();
  }, [product_id]);

  function fetchProduct() {
    axios
      .get(`http://localhost:3000/inventory/${product_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (
          response.data.categories &&
          Array.isArray(response.data.categories)
        ) {
          setCategories(response.data.categories);
          console.log(response.data.categories);
        }
      })
      .catch((error) => {
        // Handle error as needed
        console.error("Error fetching product:", error);
      });
  }

  async function fetchOrders() {
    const response = await axios.get("http://localhost:3000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(response.data);
    console.log(response.data)
  }

  const data = [
    { month: "Jan", sales: 10 },
    { month: "Feb", sales: 13 },
    { month: "Mar", sales: 15 },
    { month: "Apr", sales: 10 },
    { month: "May", sales: 20 },
    { month: "Jun", sales: 22 },
    { month: "Jul", sales: 19 },
    { month: "Aug", sales: 15 },
    { month: "Sep", sales: 20 },
    { month: "Oct", sales: 30 },
    { month: "Nov", sales: 33 },
    { month: "Dec", sales: 50 },
  ];

  return (
    <div>
      <h2>Product Statistics for Product ID: {product_id}</h2>
      <div style={{ width: "80%", height: "400px", margin: "0 auto" }}>
        <h1>Sales per month</h1>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="sales" stroke="#007BFF" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
    </div>
  );
}

export default ProductStatistics;
