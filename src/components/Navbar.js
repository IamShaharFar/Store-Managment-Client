import React from "react";
import { Link } from "react-router-dom"; // Importing Link component
import "./Navbar.css";

function Navbar({ isLogged, setIsLogged }) {
  const displayToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      console.log("JWT Token:", token);
      alert("JWT Token: " + token);
    } else {
      alert("No JWT Token found in local storage.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLogged(false);
    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link to="/" className="nav-link">
        <div className="navbar-brand">Store Management</div>
      </Link>
      <button onClick={displayToken}>Display JWT Token</button>
      {isLogged ? (
        <>
        <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/inventory" className="navbar-link">
            Inventory
          </Link>
          <Link to="/customers" className="navbar-link">
            Customers
          </Link>
          <Link to="/orders" className="navbar-link">
            Orders
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
