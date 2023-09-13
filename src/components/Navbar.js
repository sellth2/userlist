import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";

const Navbar = () => {


  //console.log(isAdmin); // 
  const handleTableLinkClick = (event) => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    //console.log("in Navbars Table Link ",isAdmin);
    if (isAdmin === null) {
      event.preventDefault();
      //console.log(isAdmin);
      // Display a warning or redirect to a different page
      toast.warning("You are not authorized to access this page.");
    }
   
  };
  const handleFormLinkClick = (event) => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    //console.log("in Navbars Form Click ",isAdmin);
    if (isAdmin === false || isAdmin === null) {
      event.preventDefault();
      //console.log("in Navbars Form Click if state ",isAdmin);
      // Display a warning or redirect to a different page
      toast.warning("You are not authorized to access this page.");
    }
   
  };
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };


  return (
    <div className={`navbar ${navbarOpen ? "close" : "open"}`}>
      <h3>Panel</h3>
      <div className="navbar-toggle" onClick={handleNavbarToggle}>
        <i className={`pi ${navbarOpen ? "pi-angle-double-right" : "pi-angle-double-left"}`}></i>
      </div>
      <ul>

        <li>
          <Link to="/table" onClick={handleTableLinkClick}>
            <i className="pi pi-users" style={{ fontSize: '1.1rem', color: "#ffffffea", marginRight: "10px" }}></i>
            <span>User List</span>
          </Link>
        </li>
        <li>
          <Link to="/form" onClick={handleFormLinkClick}>
            <i className="pi pi-user-plus" style={{ fontSize: '1.1rem', color: "#ffffffea", marginRight: "10px" }}></i>
            <span>Add User</span>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <i className="pi pi-exclamation-circle" style={{ fontSize: '1.1rem', color: "#ffffffea", marginRight: "10px" }}></i>
            <span>About</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
