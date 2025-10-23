import { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import api, { parseErrorMessage } from '../services/api.js';

const AdminToolsPage = () => {
  const [telegramUpdates, setTelegramUpdates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTelegramUpdates = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/telegram/updates');
      setTelegramUpdates(response.data);
      toast.success('Fetched Telegram updates.');
    } catch (error) {
      toast.error(parseErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container space-y-8 pt-10">
      <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Admin Toolkit</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Wire external integrations and seed content confidently.</h1>
        <p className="mt-4 max-w-3xl text-sm text-white/75">
          Use these utilities to confirm Telegram forwarding, monitor playlist fallbacks, and maintain seed data. Replace
          the environment variables in <code>.env</code> and re-run the backend for production credentials.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Telegram Debugger</h2>
            <p className="mt-2 text-sm text-white/60">
              Add your bot to the Failure Academy Telegram group, send a message, then fetch updates to capture the chat
              ID.
            </p>
          </div>
          <button
            type="button"
            onClick={fetchTelegramUpdates}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-primary-light"
          >
            Fetch Updates
          </button>
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75">
          {isLoading && <LoadingSpinner label="Contacting Telegram" />}
          {!isLoading && telegramUpdates && (
            <pre className="max-h-72 overflow-y-auto whitespace-pre-wrap break-words text-xs text-white/80">
              {JSON.stringify(telegramUpdates, null, 2)}
            </pre>
          )}
          {!isLoading && !telegramUpdates && (
            <p className="text-sm text-white/60">No data yet. Click “Fetch Updates” to test your bot connection.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminToolsPage;
