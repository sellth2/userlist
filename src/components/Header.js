import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  let username = sessionStorage.getItem('username');
  var showLoginIndicator = false;
  if (username === '' || username === null) {
    showLoginIndicator = false;
    //console.log("in if ", showLoginIndicator);
  } else {

    showLoginIndicator = true;
    //console.log("in Else ", showLoginIndicator);
  }

  return (
    <div className="header">
      <div>{showLoginIndicator && <span style={{ fontSize: "10px", color: 'black' }}>
        <Link className="log-out" to={'/'}><i className="pi pi-sign-out" style={{ fontSize: '1rem' }}></i>Logout</Link>
      </span>}</div>


      <img className="tr" type="button" alt="Türkçe" src={require('./turkey.png')} style={{ width: 20, height: 20, cursor: 'pointer' }} />
    </div>
  );
};

export default Header;