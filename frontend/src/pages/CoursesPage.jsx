import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CourseCard from '../components/CourseCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Modal from '../components/Modal.jsx';
import api, { parseErrorMessage } from '../services/api.js';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        toast.error(parseErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleBuy = (course) => {
    setSelectedCourse(course);
  };

  return (
    <section className="container pt-10">
      <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Failure Academy Courses</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Micro-sprints that translate setbacks into strategy.</h1>
        <p className="mt-4 max-w-3xl text-sm text-white/75">
          These demo courses illustrate how role-based experiences will evolve. Each module pairs reflective prompts with
          live mastermind sessions, peer feedback, and project shipping rituals.
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Preparing course catalogue" />
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onBuy={handleBuy} />
          ))}
        </div>
      )}

      <Modal
        isOpen={Boolean(selectedCourse)}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title}
        footer={
          <p className="text-sm text-white/70">
            Full enrolment and payment gateway integration will land soon. For now, we simulate the experience to
            demonstrate flow.
          </p>
        }
      >
        {selectedCourse && (
          <div className="space-y-3 text-sm text-white/75">
            <p>{selectedCourse.description}</p>
            <p>
              <span className="font-semibold text-white">Level:</span> {selectedCourse.level}
            </p>
            <p>
              <span className="font-semibold text-white">Investment:</span> ${selectedCourse.price.toFixed(0)}
            </p>
            <p>
              <span className="font-semibold text-white">Duration:</span> {selectedCourse.duration_weeks} weeks
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default CoursesPage;
