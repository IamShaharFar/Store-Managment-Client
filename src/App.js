import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar";
import Inventory from "./components/Inventory/Inventory";
import Customers from "./components/Customers/Customers";
import Orders from "./components/Orders/Orders";
import ProductInformation from "./components/Inventory/ProductInformation";
import CustomerInformation from "./components/Customers/CustomerInformation";
import withAuthorization from "./components/withAuthorization";

function RouteChangeListener() {
  const location = useLocation();

  useEffect(() => {
    checkTokenExpiry();
  }, [location]);

  function checkTokenExpiry() {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (!tokenTimestamp) return;

    const elapsedSeconds = (Date.now() - Number(tokenTimestamp)) / 1000;
    const remainingSeconds = 3600 - elapsedSeconds; 

    if (remainingSeconds <= 0) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('tokenTimestamp');
        window.location.reload();
    } else {
        setTimeout(() => {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('tokenTimestamp');
            window.location.reload();
        }, remainingSeconds * 1000);
    }
}


  return null;
}

function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("jwtToken"));

  const AuthorizedInventory = withAuthorization(Inventory);
  const AuthorizedCustomers = withAuthorization(Customers);
  const AuthorizedOrders = withAuthorization(Orders);
  const AuthorizedProductInformation = withAuthorization(ProductInformation);
  const AuthorizedCustomerInformation = withAuthorization(CustomerInformation);

  return (
    <Router>
      <div className="App">
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/inventory/:product_id"
            element={<AuthorizedProductInformation />}
          />
          <Route path="/inventory" element={<AuthorizedInventory />} />
          <Route
            path="/customer/:customer_id"
            element={<AuthorizedCustomerInformation />}
          />
          <Route path="/customers" element={<AuthorizedCustomers />} />
          <Route path="/orders" element={<AuthorizedOrders />} />
        </Routes>
        <RouteChangeListener />
      </div>
    </Router>
  );
}

export default App;
