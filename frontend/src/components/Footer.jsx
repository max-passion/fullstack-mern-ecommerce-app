import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto py-10">
      <div className="container mx-auto px-6 md:px-0 flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
        {/* Logo & description */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-2xl font-bold mb-2">ProShop</h2>
          <p className="text-gray-400 max-w-xs">
            Your one-stop shop for quality products. Fast delivery & trusted service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col text-center md:text-left">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-indigo-500 transition-colors">Home</a>
            </li>
            <li>
              <a href="/cart" className="hover:text-indigo-500 transition-colors">Cart</a>
            </li>
            <li>
              <a href="/login" className="hover:text-indigo-500 transition-colors">Sign In</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col text-center md:text-left">
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a href="#" className="hover:text-indigo-500 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-indigo-500 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-indigo-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-indigo-500 transition-colors"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {currentYear} ProShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
