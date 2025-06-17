import { useState } from "react";
import { FaCartShopping, FaBars} from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';

import { useCart } from "../contexts/cartContext";
import { useAuth } from "../contexts/AuthContext";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0 z-50 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-xl font-bold text-[#cc5500]">LuxeStride</NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden text-sm md:flex sm:w-full sm:justify-center items-center space-x-6 font-medium text-gray-700">
          <NavLink to="/product">Products</NavLink>
          <NavLink to="/">Men</NavLink>
          <NavLink to="/">Women</NavLink>
        </div>

        {/* Search (desktop only) */}
        <div className="hidden md:flex relative w-full max-w-sm mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:hidden md:flex pl-4 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#cc5500]"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#cc5500]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z" />
            </svg>
          </button>
        </div>

        {/* Auth & Cart */}
        <div className="hidden w-160  justify-center items-center md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/register" className="text-gray-700 text-sm lg:text-md hover:text-[#606060]">Join!</Link>
              <Link to="/login" className="text-gray-700 text-sm lg:text-md hover:text-[#cc5500]">Login</Link>
            </>
          ) : (
            <>
              <Link to="/userdashboard" className="text-gray-700 hover:text-[#cc5500]">
                Hello, {user.fullName}
              </Link>
              <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
            </>
          )}
          <NavLink to="/cart" className="relative">
            <FaCartShopping className="text-2xl text-[#cc5500]" />
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </NavLink>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-[#cc5500] focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
     {/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden px-6 pt-6 pb-8 border-t border-gray-200 shadow-lg bg-white animate-slideDown">
    {/* Links */}
    <div className="flex flex-col gap-5 text-[#cc5500] text-base font-semibold">
      <NavLink to="/product" onClick={() => setMenuOpen(false)} className="hover:text-[#a34700] transition-colors">
        Products
      </NavLink>
      <NavLink to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#a34700] transition-colors">
        Men
      </NavLink>
      <NavLink to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#a34700] transition-colors">
        Women
      </NavLink>
    </div>

    <hr className="my-5 border-gray-200" />

    {/* Search */}
    <div className="w-full">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#cc5500] transition-all"
      />
    </div>

    <hr className="my-5 border-gray-200" />

    {/* Auth & Cart */}
    <div className="flex flex-col gap-4 text-[#cc5500] font-medium">
      {!user ? (
        <>
          <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-[#a34700] transition-colors">
            Create an account
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-[#a34700] transition-colors">
            Login
          </Link>
        </>
      ) : (
        <>
          <Link to="/userdashboard" onClick={() => setMenuOpen(false)} className="hover:text-[#a34700] transition-colors">
            Hello, {user.fullName}
          </Link>
          <button onClick={logout} className="text-red-600 text-left hover:underline">
            Logout
          </button>
        </>
      )}

      <NavLink
        to="/cart"
        onClick={() => setMenuOpen(false)}
        className="flex items-center gap-2 hover:text-[#a34700] transition-colors"
      >
        <FaCartShopping className="text-lg" />
        <span>Cart ({cartItems.length})</span>
      </NavLink>
    </div>
  </div>
)}


    </nav>
  );
};

export default Navbar;
