import React from 'react';

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

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Failure Academy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Free Learning", "Mentorship", "Real Projects"].map((title, index) => (
            <div key={index} className="bg-white shadow rounded-2xl p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
              <p className="text-gray-600 mt-2">We boost your confidence.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
