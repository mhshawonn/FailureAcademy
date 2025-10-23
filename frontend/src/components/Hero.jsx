import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const floatingTokens = [
  {
    id: 'ignite',
    style: { top: '-3rem', right: '18%' },
    gradient: 'from-[#ff7a18] to-[#ffd166]',
    shadow: 'shadow-[0_50px_70px_-35px_rgba(255,122,24,0.65)]',
    delay: 0,
  },
  {
    id: 'orbit',
    style: { top: '48%', right: '-3rem' },
    gradient: 'from-[#8b5cf6] to-[#6366f1]',
    shadow: 'shadow-[0_45px_65px_-30px_rgba(99,102,241,0.55)]',
    delay: 0.5,
  },
  {
    id: 'spark',
    style: { bottom: '6%', right: '12%' },
    gradient: 'from-[#f59e0b] to-[#fb7185]',
    shadow: 'shadow-[0_45px_65px_-32px_rgba(251,113,133,0.55)]',
    delay: 1,
  },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-hero-gradient pb-24 pt-12 text-slate-100 sm:pt-16 lg:pt-24">
    <div className="pointer-events-none absolute -left-48 top-24 hidden h-[28rem] w-[28rem] rounded-full bg-orb-gradient blur-3xl lg:block" />
    <div className="pointer-events-none absolute -right-56 bottom-12 hidden h-[22rem] w-[22rem] rounded-full bg-gradient-to-br from-primary/30 via-accent/40 to-transparent blur-3xl lg:block" />
    {floatingTokens.map((token) => (
      <motion.div
        key={token.id}
        className={`pointer-events-none absolute hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-br ${token.gradient} ${token.shadow} lg:block`}
        style={{ ...token.style, height: '7.5rem', width: '7.5rem' }}
        animate={{ y: [0, -24, 0], rotateZ: [0, 10, -8, 0], rotateX: [0, 12, -6, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: token.delay,
        }}
      >
        <div className="absolute inset-0 rounded-[2.5rem] bg-white/10 mix-blend-screen opacity-40 blur-md" />
        <div className="absolute inset-[18%] rounded-[2rem] bg-black/10 backdrop-blur-xl" />
      </motion.div>
    ))}

    <div className="container relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-9"
      >
        <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
          Fail Fast. Learn Louder. Repeat Bravely.
        </div>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
          Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">next attempt</span>{' '}
          deserves smart community, live energy, and fearless feedback.
        </h1>
        <p className="max-w-2xl text-lg text-white/80 lg:text-xl">
          Failure Academy is an immersive learning playground built for students, teachers, and creators who treat every
          fallback as a prototype for growth. We remix setbacks into cinematic comebacks.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-slate-900 shadow-glow transition hover:bg-primary-light"
          >
            Begin Your Comeback
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Explore Courses
          </Link>
        </div>
        <div className="flex flex-col gap-3 text-sm text-white/70 sm:flex-row sm:items-center sm:gap-6">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" /> Live cohorts restarting weekly
          </span>
          <span>Mentor-backed accountability pods</span>
          <span>Role-aware dashboards for daring educators</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-midnight-soft/80 p-7 shadow-2xl backdrop-blur-xl"
      >
        <div className="absolute -top-10 right-6 h-32 w-32 rounded-full bg-primary/35 blur-3xl" />
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Momentum Dashboard</p>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div>
              <p className="text-sm text-white/70">Community Check-ins</p>
              <p className="text-2xl font-semibold text-white">1,427</p>
            </div>
            <p className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">+18% wow</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Courses', 'Exams', 'Live'].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-card-gradient p-4 text-center shadow-[0_18px_30px_-25px_rgba(245,158,11,0.55)]"
              >
                <p className="text-xs uppercase tracking-widest text-white/60">{item}</p>
                <p className="mt-2 text-xl font-semibold text-white">∞</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75">
            Every module is engineered for reflection loops, collaborative retries, and emotional resilience. No more
            learning alone.
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
