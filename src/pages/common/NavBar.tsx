import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full bg-cyan-400">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-white text-2xl font-bold">PrimeCare</span>
        </Link>
      </div>
    </nav>
  );
}
