import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Hero from '../components/Hero.jsx';
import PlaylistCard from '../components/PlaylistCard.jsx';
import CourseCard from '../components/CourseCard.jsx';
import Modal from '../components/Modal.jsx';
import LiveSection from '../components/LiveSection.jsx';
import ChatbotDemo from '../components/ChatbotDemo.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import api, { parseErrorMessage } from '../services/api.js';

const defaultLive = {
  youtube: { isLive: false, streamUrl: null },
  facebook: { isLive: false, streamUrl: null },
};

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [courses, setCourses] = useState([]);
  const [liveStatus, setLiveStatus] = useState(defaultLive);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const [playlistRes, coursesRes, liveRes] = await Promise.all([
          api.get('/api/playlists'),
          api.get('/api/courses'),
          api.get('/api/live'),
        ]);
        setPlaylists(playlistRes.data);
        setCourses(coursesRes.data);
        setLiveStatus(liveRes.data);
      } catch (error) {
        toast.error(parseErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const openPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsPlaylistModalOpen(true);
  };

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
  };

  return (
    <>
      <Hero />

      <section className="container py-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-white">From YouTube, with Radical Transparency</h2>
          <p className="max-w-2xl text-sm text-white/70">
            We document every experiment on{' '}
            <a href="https://www.youtube.com/@academyfailure" target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">
              YouTube
            </a>
            . Binge the playlists that resonate, then join a cohort to build live with us.
          </p>
        </div>
        {isLoading ? (
          <LoadingSpinner label="Fetching playlists" />
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.playlistId} playlist={playlist} onSelect={openPlaylist} />
            ))}
          </div>
        )}
      </section>

      <section className="container py-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold text-white">Courses That Teach Through Trying</h2>
          <p className="max-w-2xl text-sm text-white/70">
            Each course blends storytelling, reflection loops, and intentionally designed accountability. Buy now to see
            the checkout demo and how the real flow will evolve.
          </p>
        </div>
        {isLoading ? (
          <LoadingSpinner label="Loading courses" />
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onBuy={openCourseModal} />
            ))}
          </div>
        )}
      </section>

      <LiveSection liveStatus={liveStatus} />

      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <ChatbotDemo />
          <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
            <h3 className="text-2xl font-semibold text-white">Why Failure Academy?</h3>
            <ul className="mt-6 space-y-4 text-sm text-white/75">
              <li>• Cohort-based programs engineered for restarting momentum.</li>
              <li>• Mentor marketplace for teachers who coach through setbacks.</li>
              <li>• Admin dashboards that track learner health, not just test scores.</li>
              <li>• Telegram communities to ask doubts, ship drafts, and stay accountable.</li>
            </ul>
            <a
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-primary-light"
              href="https://t.me/+9tXd6W3j8v5hMDA1"
              target="_blank"
              rel="noreferrer"
            >
              Jump into the Telegram Room
            </a>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        title={selectedPlaylist?.title}
        footer={
          selectedPlaylist && (
            <a
              href={`https://www.youtube.com/playlist?list=${selectedPlaylist.playlistId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-slate-900"
            >
              Watch on YouTube
            </a>
          )
        }
      >
        {selectedPlaylist && (
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title={selectedPlaylist.title}
              src={`https://www.youtube.com/embed/videoseries?list=${selectedPlaylist.playlistId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        title={selectedCourse?.title}
        footer={
          <div className="flex flex-col gap-3 text-sm text-white/70">
            <p>Full payment and cohort scheduling will plug in here soon. For now, contact us to reserve your seat.</p>
            <a
              href="mailto:hello@failureacademy.com"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary hover:text-slate-900"
            >
              Email the Academy
            </a>
          </div>
        }
      >
        {selectedCourse && (
          <div className="space-y-3 text-sm text-white/75">
            <p>{selectedCourse.description}</p>
            <p>
              <span className="font-semibold text-white">Investment:</span> ${selectedCourse.price.toFixed(0)}
            </p>
            <p>
              <span className="font-semibold text-white">Duration:</span> {selectedCourse.duration_weeks} weeks
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default HomePage;
