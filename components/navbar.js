'use client';

import Link from 'next/link';
import { FaStore, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaStore className="text-white text-2xl" />
          <span className="text-white font-bold text-xl">WarungKu</span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-200 transition">
            Home
          </Link>
          <Link href="/products" className="text-white hover:text-gray-200 transition">
            Products
          </Link>
          <Link href="#about" className="text-white hover:text-gray-200 transition">
            About
          </Link>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <FaShoppingCart className="text-white text-2xl" />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-600`}>
        <div className="flex flex-col items-center space-y-2 py-4">
          <Link
            href="/"
            className="block text-white py-2 px-4 w-full text-center hover:bg-blue-500"
            onClick={() => setIsOpen(false)} // Close menu after click
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block text-white py-2 px-4 w-full text-center hover:bg-blue-500"
            onClick={() => setIsOpen(false)} // Close menu after click
          >
            Products
          </Link>
          <Link
            href="#about"
            className="block text-white py-2 px-4 w-full text-center hover:bg-blue-500"
            onClick={() => setIsOpen(false)} // Close menu after click
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
