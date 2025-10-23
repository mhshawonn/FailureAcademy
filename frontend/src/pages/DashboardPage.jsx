import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import RoleBadge from '../components/RoleBadge.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api, { parseErrorMessage } from '../services/api.js';

const roleHighlights = {
  student: [
    'Check upcoming cohort dates and reserve your seat.',
    'Share a weekly retro in the Telegram community.',
    'Complete the Resilience Foundations Quiz to unlock curated tasks.',
  ],
  teacher: [
    'Review the latest doubts to plan micro-workshops.',
    'Schedule a live session and broadcast to YouTube.',
    'Upload success stories to inspire the community.',
  ],
  admin: [
    'Monitor role sign-ups and refresh seed data when required.',
    'Verify Telegram forwarding using the admin tools page.',
    'Plan upcoming playlist drops with the content squad.',
  ],
};

const DashboardPage = () => {
  const { user, role } = useAuth();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/courses');
        setCourses(response.data.slice(0, 2));
      } catch (error) {
        toast.error(parseErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleRefreshSeed = async () => {
    try {
      const response = await api.post('/api/admin/seed');
      toast.success(response.data.detail);
    } catch (error) {
      toast.error(parseErrorMessage(error));
    }
  };

  return (
    <section className="container space-y-10 pt-10">
      <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Dashboard</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Hey {user?.profile?.name || user?.name},</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Welcome to your Failure Academy cockpit. Track experiments, launch community rituals, and celebrate every
              iteration.
            </p>
          </div>
          <RoleBadge role={role} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl"
      >
        <h2 className="text-xl font-semibold text-white">Your next best moves</h2>
        <ul className="mt-4 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
          {roleHighlights[role]?.map((item) => (
            <li key={item} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
              {item}
            </li>
          )) || (
            <li className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
              Explore the platform and set your first intention today.
            </li>
          )}
        </ul>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="mt-6 flex flex-col gap-4 text-sm text-white/75">
            <a
              href="https://www.youtube.com/@academyfailure"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
            >
              <FaYoutube className="text-xl text-red-400" />
              Watch the latest comeback stories on YouTube
            </a>
            <a
              href="https://t.me/+9tXd6W3j8v5hMDA1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
            >
              <FaTelegramPlane className="text-xl text-sky-400" />
              Drop a weekly retro in the Telegram group
            </a>
            {role === 'admin' && (
              <button
                type="button"
                onClick={handleRefreshSeed}
                className="inline-flex items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20"
              >
                Rerun demo seed data
              </button>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
          <h3 className="text-lg font-semibold text-white">Recommended Courses</h3>
          {isLoading ? (
            <LoadingSpinner label="Curating content" />
          ) : (
            <div className="mt-4 space-y-4 text-sm text-white/75">
              {courses.map((course) => (
                <div key={course.id} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-base font-semibold text-white">{course.title}</p>
                  <p className="mt-2 text-sm text-white/60">{course.description}</p>
                </div>
              ))}
              {courses.length === 0 && <p className="text-sm text-white/60">Courses will appear shortly.</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
