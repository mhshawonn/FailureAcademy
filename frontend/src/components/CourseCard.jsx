import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const CourseCard = ({ course, onBuy }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-midnight-soft/75 shadow-xl transition hover:-translate-y-1 hover:shadow-glow"
  >
    {course.thumbnail && (
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={`${course.thumbnail}?auto=format&fit=crop&w=600&q=80`}
          alt={`${course.title} thumbnail`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-soft/90 via-transparent to-transparent" />
      </div>
    )}
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/60">
        <span>{course.level}</span>
        <span>{course.duration_weeks} weeks</span>
      </div>
      <h3 className="text-xl font-semibold text-white">{course.title}</h3>
      <p className="text-sm text-white/70">{course.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <p className="text-lg font-semibold text-primary">${course.price.toFixed(0)}</p>
        <button
          type="button"
          onClick={() => onBuy(course)}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary hover:text-slate-900"
        >
          Buy Now
          <FaArrowRight className="transition group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default CourseCard;
