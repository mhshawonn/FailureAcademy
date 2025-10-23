import { motion } from 'framer-motion';
import { FaPlayCircle } from 'react-icons/fa';

const PlaylistCard = ({ playlist, onSelect }) => (
  <motion.button
    type="button"
    onClick={() => onSelect(playlist)}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-midnight-soft/75 text-left shadow-xl transition hover:-translate-y-1 hover:shadow-glow"
  >
    <div className="relative h-52 w-full overflow-hidden">
      {playlist.thumbnail ? (
        <img
          src={playlist.thumbnail}
          alt={`${playlist.title} playlist cover`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-midnight-soft text-white/40">
          No thumbnail
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-soft/85 to-transparent" />
      <FaPlayCircle className="absolute left-4 top-4 text-3xl text-white drop-shadow-lg transition duration-300 group-hover:text-primary" />
    </div>
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div>
        <h3 className="text-lg font-semibold text-white">{playlist.title}</h3>
        <p className="mt-2 text-sm text-white/70">{playlist.itemCount} videos that remix failure into mastery.</p>
      </div>
      <span className="mt-auto inline-flex items-center text-sm font-semibold text-primary transition group-hover:translate-x-1">
        Open Playlist →
      </span>
    </div>
  </motion.button>
);

export default PlaylistCard;
