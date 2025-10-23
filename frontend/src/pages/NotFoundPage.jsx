import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <section className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
    <div className="rounded-full border border-white/10 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
      404 — Lost in the Labyrinth
    </div>
    <h1 className="text-4xl font-semibold text-white">This page took a detour.</h1>
    <p className="max-w-xl text-sm text-white/60">
      The experiment you are hunting for does not exist yet. Return home or ping the team to request the feature.
    </p>
    <Link
      to="/"
      className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-primary-light"
    >
      Back to Home
    </Link>
  </section>
);

export default NotFoundPage;
