import React, { useState, useRef } from 'react';
import courses from '../assets/data/courses';
import { Link } from 'react-router-dom';

function Course() {
  const [showMore, setShowMore] = useState(false);
  const scrollRef = useRef(null);

  const initialCourses = courses.slice(0, 8);
  const extraCourses = courses.slice(8);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Popular Courses</h2>

        {/* Grid for Initial Courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {initialCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-lg">
              <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{course.description}</p>
                <Link to={`/course/${course.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Course
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showMore && extraCourses.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore(true)}
              className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700"
            >
              Show More
            </button>
          </div>
        )}

        {/* Extra Courses Slider */}
        {showMore && (
          <div className="mt-16 relative">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">More Courses</h3>

            {/* Arrow Buttons */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              ◀
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              ▶
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-4 px-6 scroll-smooth scrollbar-hide"
            >
              {extraCourses.map((course) => (
                <div
                  key={course.id}
                  className="min-w-[250px] flex-shrink-0 bg-white rounded-2xl shadow-md overflow-hidden animate-slideIn"
                  onClick={() => console.log(`Course clicked: ${course.id}`)} // Track clicks
                >
                  <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800">{course.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{course.description}</p>
                    <Link to={`/course/${course.id}`}>
                      <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                        View Course
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Course;
