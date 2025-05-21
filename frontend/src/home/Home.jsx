import React from 'react';
import { Link } from 'react-router-dom';
import Course from '../course/course';
import Achievement from '../achievement/Achievement';

const Home = () => {
  return (
    <div className="pt-10">
      <section className="text-center px-4 py-20 bg-blue-50">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
          Embrace Failure. Learn Fearlessly.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Join thousands of students transforming their lives through real learning.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
          Browse Courses
        </button>
      </section>
      <Achievement/>

      <Course/>

        </div>
  );
};

export default Home;
