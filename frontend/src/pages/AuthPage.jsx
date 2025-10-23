import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api, { parseErrorMessage } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const roles = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'admin', label: 'Admin' },
];

const AuthPage = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === 'register') {
        const response = await api.post('/api/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
        register({
          token: response.data.access_token,
          role: response.data.role,
          name: response.data.name,
          email: form.email,
        });
      } else {
        const response = await api.post('/api/auth/login', {
          email: form.email,
          password: form.password,
        });
        login({
          token: response.data.access_token,
          role: response.data.role,
          name: response.data.name,
          email: form.email,
        });
      }
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(parseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const title =
    mode === 'register'
      ? 'Join the academy, choose your role, and rebuild loudly.'
      : 'Welcome back. Ready for your next iteration?';

  return (
    <section className="container grid gap-10 pt-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-midnight-soft/75 p-8 shadow-xl"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Failure Academy Access</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">{title}</h1>
        <p className="mt-4 text-sm text-white/75">
          Admin dashboards seed with an example account (see README). Teachers unlock cohort analytics, while students
          get curated comeback curriculums.
        </p>
        <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/75">
          <p>Role highlights:</p>
          <ul className="space-y-2 text-white/60">
            <li>• Students: track cohorts, submit doubts, join Telegram pods.</li>
            <li>• Teachers: publish assignments, review exam insights, host lives.</li>
            <li>• Admins: manage seed content, monitor community health, sync live streams.</li>
          </ul>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-3xl border border-white/10 bg-midnight-soft/85 p-8 shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-white">
          {mode === 'register' ? 'Create account' : 'Login to your space'}
        </h2>
        <div className="mt-6 space-y-5">
          {mode === 'register' && (
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-white/80">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-white/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-white/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
            />
          </div>
          {mode === 'register' && (
            <div>
              <label htmlFor="role" className="text-sm font-semibold text-white/80">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value} className="bg-midnight-soft text-white">
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-primary/60"
        >
          {isSubmitting ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Login'}
        </button>
        <p className="mt-4 text-center text-sm text-white/60">
          {mode === 'register' ? (
            <>
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </>
          ) : (
            <>
              Need an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Create one
              </Link>
            </>
          )}
        </p>
      </motion.form>
    </section>
  );
};

export default AuthPage;
