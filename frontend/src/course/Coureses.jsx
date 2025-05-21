// File: pages/Courses.jsx
import React, { useState } from 'react';
import courseData from '../assets/data/courseData';


const categories = ['hsc', 'ssc', 'admission'];
const subjects = ['physics', 'chemistry', 'math', 'biology', 'ict', 'bangla', 'english'];

const VideoCard = ({ title, videoUrl, description }) => (
  <div className="bg-white shadow rounded-xl overflow-hidden p-4 w-full">
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={videoUrl}
        title={title}
        allowFullScreen
        className="w-full h-48"
      ></iframe>
    </div>
    <h3 className="mt-4 text-lg font-bold">{title}</h3>
    <p className="text-gray-600 mt-2 text-sm">{description}</p>
  </div>
);

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('hsc');
  const [activeSubject, setActiveSubject] = useState('physics');

  const currentVideos = courseData[activeCategory]?.[activeSubject] || [];

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Explore Courses</h1>

      {/* Category Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => {
              setActiveCategory(cat);
              setActiveSubject('physics'); // reset subject
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Subject Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {subjects.map((subj) => (
          <button
            key={subj}
            className={`px-3 py-1 rounded-full text-sm ${
              activeSubject === subj ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => setActiveSubject(subj)}
          >
            {subj.charAt(0).toUpperCase() + subj.slice(1)}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.length > 0 ? (
          currentVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              videoUrl={video.videoUrl}
              description={video.description}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No videos available.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
