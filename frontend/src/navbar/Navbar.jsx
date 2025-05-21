import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">Failure Academy</div>
      
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><a href="/">Home</a></li>
        <li><a href="/courses">Courses</a></li>
         <li><a href="/exam">Exam</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <div className="space-x-4 hidden md:block">
        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"><Link to="/login">Login</Link></button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Link to="/signup">Signup</Link></button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 z-50 md:hidden">
          <a href="/">Home</a>
          <a href="/courses">Courses</a>
           <a href="/exam">Exam</a>
          <a href="about">About</a>
          <a href="/contact">Contact</a>
          <div className="space-x-4">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Login</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Signup</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
