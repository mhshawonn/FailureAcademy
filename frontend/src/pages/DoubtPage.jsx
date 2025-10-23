import DoubtForm from '../components/DoubtForm.jsx';

const DoubtPage = () => (
  <section className="container grid gap-10 pt-10 lg:grid-cols-[1fr_1fr] lg:items-start">
    <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
      <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Doubt To Momentum</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Drop your question. We rally mentors instantly.</h1>
      <p className="mt-4 text-sm text-white/75">
        This form beams your query into our Telegram classroom once the bot is configured. Until then, it stores locally
        so nothing gets lost. Attach screenshots to give reviewers context.
      </p>
      <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75">
        <p>What happens after you submit?</p>
        <ol className="space-y-2 text-white/60">
          <li>1. Telegram forwards the message to the community moderators.</li>
          <li>2. Admin dashboards log the doubt for pattern analysis.</li>
          <li>3. Teachers assign follow-up rituals or mini-assignments.</li>
        </ol>
      </div>
    </div>
    <div className="rounded-3xl border border-white/10 bg-midnight-soft/85 p-8 shadow-xl">
      <DoubtForm />
    </div>
  </section>
);

export default DoubtPage;
