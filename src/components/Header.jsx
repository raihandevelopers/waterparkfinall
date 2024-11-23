import React, { useState } from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import TopBar from './TopNav'
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLoggedIn"));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };



  return (
    <>
    {/* <div className="uppernav">
    </div> */}
        <TopBar/>
      <nav className="navbar">
        {/* Toggle Button */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? (
            // Cross icon when menu is open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="#ffffff"
            >
              <path d="M6 18L18 6M6 6L18 18" stroke="#ffffff"  strokeWidth="2" />
            </svg>
          ) : (
            // Hamburger icon when menu is closed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="#000"
            >
              <rect y="4" width="24" height="2" rx="1" />
              <rect y="11" width="24" height="2" rx="1" />
              <rect y="18" width="24" height="2" rx="1" />
            </svg>
          )}
        </button>

        {/* Logo */}
        <a href="/" className="flex justify-center items-center">
          <div className="logo">
            <img src="logo.png" alt="Logo" className="max-w-none " />
          </div>
        </a>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={closeMenu} // Close the menu when clicking outside
          ></div>
        )}

      
        {/* Nav Links */}
        <div className={`nav-links-container ${isMenuOpen ? "show-menu" : ""}`}>
          {isMenuOpen && (
            // Cross icon inside NavLink, visible when menu is open
            <NavLink
              to="#"
              className="close-menu-link"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
                fill="#FFFFFF"
              >
                <path d="M6 18L18 6M6 6L18 18" stroke="#000" strokeWidth="2" />
              </svg>
            </NavLink>
          )}
          <NavLink to="/" className="nav-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/farmvilla" className="nav-link" onClick={closeMenu}>
            Water Parks
          </NavLink>
          <NavLink to="/influencers" className="nav-link" onClick={closeMenu}>
            Gallery
          </NavLink>
          <NavLink to="/about" className="nav-link" onClick={closeMenu}>
            About Us
          </NavLink>
          <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
            Contact Us
          </NavLink>
        </div>
        <div className="md:p-16 p-2">
        <div className="logsvg">
          <NavLink to={isLogin == "true"? '/UserDetails':'/sign-in'} className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="24"
              height="24"
              fill="#FFFFFF"
            >
              <path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" />
            </svg>
          </NavLink>
        </div>
        </div>

      </nav>
      
    </>
  );
};

export default Header;
