// src/admin/components/Header.jsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between border-b">
      <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-2xl text-blue-600" />
        <span className="text-gray-700 font-medium">Admin</span>
        <button
          onClick={() => alert("Logging out...")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
