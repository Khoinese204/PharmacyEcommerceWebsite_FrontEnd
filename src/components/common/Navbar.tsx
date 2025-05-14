import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full bg-cyan-400">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold">PrimeCare</span>
        </div>

        {/* Search bar */}
        <div className="flex-1 mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Tên thuốc, thực phẩm chức năng, chăm sóc cá nhân"
              className="w-full py-2 pl-10 pr-4 rounded-full text-sm focus:outline-none"
            />
            <FaSearch className="absolute top-2.5 left-3 text-gray-400 text-sm" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-white text-lg">
          <Link to="/account">
            <FaUser />
          </Link>
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}
