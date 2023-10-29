import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BasicProductInfo from "./BasicProductInfo ";
import SalesData from "./SalesData ";

const ExtraInfo = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchOrders();
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
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get("http://localhost:3000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(response.data);
    console.log(response.data);
  };

  function totalSalesLastYear(orders) {
    let totalSales = 0;  // Initialize total sales to 0

    // Get the current date and time
    const currentDate = new Date();

    // Iterate through each order
    orders.forEach(order => {
        // Convert the order date string to a Date object
        const orderDate = new Date(order.order_date);

        // Check if the order was placed within the last year
        const isWithinLastYear = (
            (currentDate.getFullYear() === orderDate.getFullYear() && currentDate.getMonth() >= orderDate.getMonth()) ||
            (currentDate.getFullYear() - 1 === orderDate.getFullYear() && currentDate.getMonth() < orderDate.getMonth())
        );

        if (isWithinLastYear) {
            // If the order is within the last year, iterate through each product in the order
            order.products.forEach(product => {
                // Add the product's quantity to the total sales
                totalSales += product.quantity;
            });
        }
    });

    return totalSales;
}

  // Function to generate sales data per month for the last year
  function salesPerMonthData(orders) {
    const salesData = Array(12).fill(0); // Initialize an array with 12 zeros (one for each month)

    orders.forEach((order) => {
      const orderDate = new Date(order.order_date);
      const currentDate = new Date();

      // Check if the order was placed within the last year
      if (
        currentDate.getFullYear() === orderDate.getFullYear() ||
        (currentDate.getFullYear() - 1 === orderDate.getFullYear() &&
          currentDate.getMonth() <= orderDate.getMonth())
      ) {
        const monthIndex = orderDate.getMonth(); // Get the month number (0 for January, 11 for December)
        order.products.forEach((product) => {
          salesData[monthIndex] += product.quantity; // Accumulate sales quantity
        });
      }
    });

    // Create an array of objects with month names and sales quantities
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedData = salesData.map((sales, index) => ({
      month: monthNames[index],
      sales: sales,
    }));

    return formattedData;
  }

  // Function to generate sales data per week for the last 3 months
  function salesPerWeekData(orders) {
    const salesData = Array(12).fill(0); // Initialize an array with 12 zeros (one for each week in 3 months)

    orders.forEach((order) => {
      const orderDate = new Date(order.order_date);
      const currentDate = new Date();

      // Check if the order was placed within the last 3 months
      if (currentDate - orderDate <= 90 * 24 * 60 * 60 * 1000) {
        // 90 days in milliseconds
        const weekNumber = Math.floor(
          (currentDate - orderDate) / (7 * 24 * 60 * 60 * 1000)
        ); // Calculate the week number
        order.products.forEach((product) => {
          salesData[weekNumber] += product.quantity; // Accumulate sales quantity
        });
      }
    });

    // Create an array of objects with week numbers and sales quantities
    const formattedData = salesData.map((sales, index) => ({
      week: `Week ${index + 1}`,
      sales: sales,
    }));

    return formattedData;
  }

  return isLoading ? (
    <div>
      Loading...
      <h1>loading</h1>
    </div>
  ) : (
    <div>
      <h1>Extra Info</h1>
      <BasicProductInfo
        name={product.product_name}
        description={product.product_description}
        price={product.price}
        stockQuantity={product.stock_quantity}
        barcode={product.barcode}
        categories={product.categories}
        imageUrl={product.image_url}
        dateAdded={product.date_added}
      />
      <SalesData 
      totalSales={totalSalesLastYear(orders)}
      salesPerMonth={salesPerMonthData(orders)}
      salesPerWeek={salesPerWeekData(orders)}/>
    </div>
  );
};

export default ExtraInfo;
