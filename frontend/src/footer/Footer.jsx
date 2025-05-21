import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Failure Academy</h3>
          <p className="text-sm">
            Empowering learners with free education, real-world projects, and expert mentorship to turn failure into success.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com/Academy.failure" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-xl hover:text-white" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="text-xl hover:text-white" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-xl hover:text-white" /></a>
            <a href="https://youtube.com/Academy.failure" target="_blank" rel="noopener noreferrer"><FaYoutube className="text-xl hover:text-white" /></a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p>Email: <a href="academy.failure@gmail.com" className="text-blue-400 hover:underline">support@failureacademy.com</a></p>
          <p className="mt-2">Dhaka, Bangladesh</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Failure Academy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
