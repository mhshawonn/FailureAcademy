// src/admin/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Courses", icon: <FaBook />, path: "/admin/courses" },
    { name: "Exams", icon: <FaClipboardList />, path: "/admin/exams" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Mentors", icon: <FaChalkboardTeacher />, path: "/admin/mentors" },
  ];

  return (
    <div className="w-64 bg-white border-r shadow-md h-full p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-blue-100 ${
                  isActive ? "bg-blue-200 font-semibold" : ""
                }`
              }
            >
              <span className="text-xl text-blue-600">{item.icon}</span>
              <span className="text-gray-800">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
