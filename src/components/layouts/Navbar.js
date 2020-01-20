import React from "react";
// import './App.css';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ icon, title }) => {
  return (
    <nav className='bg-primary'>
      <h1>
        <i className={icon}>{title}</i>
      </h1>
      <ul>
        <li>
          <Link to='/' style={{color: "white"}}>Home</Link>
        </li>
        <li>
          <Link to='/about' style={{color: "white"}}>About</Link>
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
