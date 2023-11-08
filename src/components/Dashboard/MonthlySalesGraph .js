import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./MonthlySalesGraph.css";

const MonthlySalesGraph = ({ orders }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  };

  const generateMonthlySalesData = () => {
    const currentMonth = new Date().getMonth();
    const salesData = Array(12)
      .fill(0)
      .map((_, idx) => {
        const monthIndex = (currentMonth - idx + 12) % 12;
        const label = idx === 0 ? "This month" : getMonthName(monthIndex);
        return { month: label, orders: 0 };
      });

    orders.forEach((order) => {
      const orderDate = new Date(order.order_date);
      const monthDiff = currentMonth - orderDate.getMonth();
      if (monthDiff >= 0 && monthDiff < 12) {
        salesData[monthDiff].orders += 1;
      }
    });

    setMonthlyData(salesData.reverse());
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    generateMonthlySalesData();
  }, [orders]);

  return (
    <div className="sales-graph-container">
      <h2>Monthly Sales</h2>
      <div className="linechart-container">
        <LineChart width={windowWidth > 768 ? windowWidth*0.45 : windowWidth*0.9} height={350} data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default MonthlySalesGraph;
