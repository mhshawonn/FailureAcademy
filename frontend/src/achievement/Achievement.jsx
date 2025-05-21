import React from 'react'
import { AiOutlineUser, AiOutlineGlobal } from "react-icons/ai";
import { FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";

function Achievement() {
  return (
    <div>
      <section className="py-16 px-6 bg-white">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Achievements</h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
    <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition">
      <AiOutlineUser className="mx-auto text-4xl text-blue-500 mb-3" />
      <h3 className="text-4xl font-bold text-blue-600">15K+</h3>
      <p className="text-gray-600 mt-2">Students Enrolled</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition">
      <FaBookOpen className="mx-auto text-4xl text-blue-500 mb-3" />
      <h3 className="text-4xl font-bold text-blue-600">500+</h3>
      <p className="text-gray-600 mt-2">Courses Completed</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition">
      <FaChalkboardTeacher className="mx-auto text-4xl text-blue-500 mb-3" />
      <h3 className="text-4xl font-bold text-blue-600">50+</h3>
      <p className="text-gray-600 mt-2">Top Mentors</p>
    </div>
    <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition">
      <AiOutlineGlobal className="mx-auto text-4xl text-blue-500 mb-3" />
      <h3 className="text-4xl font-bold text-blue-600">20+</h3>
      <p className="text-gray-600 mt-2">Countries Reached</p>
    </div>
  </div>
</section>
    </div>
  )
}

export default Achievement
