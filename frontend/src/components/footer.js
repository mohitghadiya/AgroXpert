import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-400 flex items-center">
                <span className="mr-2">🌱</span>
                AgroXpert
              </span>
            </Link>
            <p className="text-gray-400">
              Empowering farmers with smart technology for sustainable agriculture and food security.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-green-400 transition-colors">Weather Forecast</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-green-400 transition-colors">Soil Testing</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-green-400 transition-colors">Crop Advisory</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-green-400 transition-colors">Fertilizer </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MdLocationOn className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">103, Farm Street, Ahmedabad, India - 560001</span>
              </li>
              <li className="flex items-center">
                <MdPhone className="text-green-400 mr-3" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-green-400 transition-colors">+91 76240 23373</a>
              </li>
              <li className="flex items-center">
                <MdEmail className="text-green-400 mr-3" />
                <a href="mailto:info@agroxpert.com" className="text-gray-400 hover:text-green-400 transition-colors">info@agroxpert.com</a>
              </li>
            </ul>
            
            {/* Newsletter */}
            {/* <div className="mt-4">
              <h4 className="text-sm font-semibold text-white mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AgroXpert. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;