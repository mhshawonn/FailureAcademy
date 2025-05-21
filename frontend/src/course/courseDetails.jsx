import React from 'react';
import { useParams } from 'react-router-dom';
import courses from '../assets/data/courses';
import { Link } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return <div className="p-6 text-center text-red-600">Course not found</div>;
  }
        return (
  <div className="max-w-3xl mx-auto py-10 px-6">
    <img src={course.thumbnail} alt={course.title} className="w-full h-60 object-cover rounded-xl shadow" />
    <h1 className="text-4xl font-bold mt-6 text-blue-700">{course.title}</h1>
    <p className="text-lg text-gray-700 mt-4">{course.description}</p>

    <button className="mt-6 px-5 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
      Start Learning
    </button>

    <Link to="/" className="block mt-6 text-blue-600 hover:underline text-sm">
      ← Back to Courses
    </Link>
  </div>
);
};

export default CourseDetail;
