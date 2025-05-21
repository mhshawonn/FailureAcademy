import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">Failure Academy</div>
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><a href="#">Home</a></li>
        <li><a href="#">Courses</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className="space-x-4 hidden md:block">
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Login</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
