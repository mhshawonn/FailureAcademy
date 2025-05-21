import React from 'react'
import { FaYoutube, FaFacebookF, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

function Achievement() {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaYoutube className="mx-auto text-4xl text-red-500 mb-3" />
          <h3 className="text-4xl font-bold text-red-600">2K+</h3>
          <p className="text-gray-600 mt-2">YouTube Subscribers</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaFacebookF className="mx-auto text-4xl text-blue-700 mb-3" />
          <h3 className="text-4xl font-bold text-blue-700">1K+</h3>
          <p className="text-gray-600 mt-2">Facebook Followers</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaUsers className="mx-auto text-4xl text-blue-500 mb-3" />
          <h3 className="text-4xl font-bold text-blue-600">2K+</h3>
          <p className="text-gray-600 mt-2">Students Enrolled</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition">
          <FaChalkboardTeacher className="mx-auto text-4xl text-green-500 mb-3" />
          <h3 className="text-4xl font-bold text-green-600">10+</h3>
          <p className="text-gray-600 mt-2">Top Mentors</p>
        </div>
      </div>
    </section>
  );
}

export default Achievement;
