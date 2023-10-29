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
import CookieConsent from "./components/CookieConsent ";
import withAuthorization from "./components/withAuthorization";
import MonthlySalesChart from "./components/Inventory/MonthlySalesChart";
import ProductStatistics from "./components/Inventory/ProductStatistics";
import ExtraInfo from "./components/ExtraInfo/ExtraInfo";

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
  const [cookiesAccepted, setCookiesAccepted] = useState(localStorage.getItem("cookiesAccepted") === "true");
  const [showCookiePopup, setShowCookiePopup] = useState(!cookiesAccepted);

  const handleAcceptCookies = () => {
    setCookiesAccepted(true);
    setShowCookiePopup(false);
    localStorage.setItem("cookiesAccepted", "true"); // Save decision to local storage
  };

  const handleRejectCookies = () => {
    alert("You need to accept cookies to use this website.");
  };

  if (!cookiesAccepted) {
    return (
      <div>
        {showCookiePopup && (
          <CookieConsent 
            onAccept={handleAcceptCookies}
            onReject={handleRejectCookies}
          />
        )}
        {/* Rest of your app goes here */}
      </div>
    );
  }

  const AuthorizedInventory = withAuthorization(Inventory);
  const AuthorizedCustomers = withAuthorization(Customers);
  const AuthorizedOrders = withAuthorization(Orders);
  const AuthorizedProductInformation = withAuthorization(ProductInformation);
  const AuthorizedCustomerInformation = withAuthorization(CustomerInformation);
  const AuthorizedExtraInfo = withAuthorization(ExtraInfo)

  return (
    <Router>
      <div className="App">
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/graph" element={<MonthlySalesChart/>}/>
          <Route path="/inventory/:product_id/statistics" element={<AuthorizedExtraInfo/>}/>
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
