import { motion } from 'framer-motion';

const LiveCard = ({ platform, status }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-midnight-soft/75 p-6 shadow-xl"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">{platform} Live</p>
        <p className="mt-1 text-xl font-semibold text-white">
          {status.isLive ? 'Streaming Now' : 'Offline — Stay tuned'}
        </p>
      </div>
      <span
        className={`inline-flex h-3 w-3 rounded-full ${
          status.isLive ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'
        }`}
      />
    </div>
    <p className="text-sm text-white/70">
      {status.placeholder ||
        `We go live with mentors, alumni, and creators. This block will display the live embed when ${platform} is active.`}
    </p>
    {status.isLive && status.streamUrl ? (
      <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          title={`${platform} live stream`}
          src={status.streamUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    ) : (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 text-sm text-white/60">
        No live session is active right now.
      </div>
    )}
  </motion.div>
);

const LiveSection = ({ liveStatus }) => (
  <section className="container py-16">
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-semibold text-white">Live Energy Zone</h2>
      <p className="max-w-2xl text-sm text-white/70">
        Momentum is contagious. Join our live demos, office hours, and comeback stories streaming directly to YouTube
        and Facebook. When a session is active, the embed unlocks instantly.
      </p>
    </div>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <LiveCard platform="YouTube" status={liveStatus.youtube} />
      <LiveCard platform="Facebook" status={liveStatus.facebook} />
    </div>
  </section>
);

export default LiveSection;
