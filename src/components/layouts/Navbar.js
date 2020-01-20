import React from "react";
// import './App.css';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ icon, title }) => {
  return (
    <nav className='bg-primary'>
      <div className='all-center' style={{ fontSize: "25px" }}>
        <h1>
          <i className={icon}>{title}</i>
        </h1>
      </div>
      <ul>
        <li>
          <Link to='/' style={{ color: "white", fontSize: "20px" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to='/about' style={{ color: "white", fontSize: "20px" }}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
