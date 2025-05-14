import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">PHARMA</h1>
        <ul className="hidden md:flex gap-6 text-gray-700">
          <li className="hover:text-blue-500">Home</li>
          <li className="hover:text-blue-500">Store</li>
          <li className="hover:text-blue-500">Dropdown</li>
          <li className="hover:text-blue-500">About</li>
          <li className="hover:text-blue-500">Contact</li>
        </ul>
      </div>
    </nav>
  );
}
