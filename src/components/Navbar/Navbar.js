import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return(
        <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><i className="fa-solid fa-coffee fa-2xl "></i></li>
              <li><Link to={"/coffee-store"} className="nav-link px-2 text-secondary">Home</Link></li>
              
            </ul>
          </div>
        </div>
      </header>
    )
}

export default Navbar;