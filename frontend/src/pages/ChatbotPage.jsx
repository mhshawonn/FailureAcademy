import ChatbotDemo from '../components/ChatbotDemo.jsx';

const ChatbotPage = () => (
  <section className="container grid gap-10 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
    <ChatbotDemo />
    <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
      <p className="text-xs uppercase tracking-[0.3em] text-primary/70">AI Mentor Roadmap</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Your on-call companion for reframing setbacks.</h1>
      <ul className="mt-6 space-y-4 text-sm text-white/75">
        <li>• Mirrors your emotion first, then nudges reflective prompts.</li>
        <li>• Summarises community insights and YouTube lessons contextually.</li>
        <li>• Routes specific doubts to mentors or admin dashboards.</li>
        <li>• Learns from exam reflections to tailor next steps.</li>
      </ul>
      <p className="mt-6 text-sm text-white/70">
        Today you can experience the front-end of the chat. Future releases will plug in LLM backends, knowledge graphs,
        and escalation workflows to teachers and admins.
      </p>
    </div>
  </section>
);

export default ChatbotPage;
