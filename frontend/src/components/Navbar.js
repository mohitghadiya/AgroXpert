import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-lime-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white tracking-wide drop-shadow-lg flex items-center">
                <span className="mr-2">🌱</span>
                AgroXpert
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            
            <div className="flex items-center space-x-4 ml-4">
              <Link 
                to="/login" 
                className="bg-white text-green-700 px-4 py-2 rounded-md font-medium shadow hover:bg-yellow-100 transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-white text-green-700 px-4 py-2 rounded-md font-medium shadow hover:bg-yellow-100 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-200 hover:bg-green-600 focus:outline-none transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700">
          <MobileNavLink to="/" onClick={toggleMobileMenu}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={toggleMobileMenu}>About Us</MobileNavLink>
          <MobileNavLink to="/contact" onClick={toggleMobileMenu}>Contact</MobileNavLink>
          
          <div className="pt-2 border-t border-green-600">
            <MobileNavLink to="/login" onClick={toggleMobileMenu}>Login</MobileNavLink>
            <Link 
              to="/signup" 
              onClick={toggleMobileMenu}
              className="block w-full text-center bg-white text-green-700 mt-1 px-3 py-2 rounded-md font-medium hover:bg-yellow-100 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Reusable component for desktop nav links
const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-white hover:text-yellow-200 font-medium px-3 py-2 transition-colors duration-200"
  >
    {children}
  </Link>
);

// Reusable component for mobile nav links
const MobileNavLink = ({ to, children, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="block text-white hover:bg-green-600 px-3 py-2 rounded-md transition-colors duration-200"
  >
    {children}
  </Link>
);

export default Navbar;