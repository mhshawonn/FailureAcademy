import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { FaTelegramPlane } from 'react-icons/fa';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/exams', label: 'Exams' },
  { to: '/chat', label: 'Chatbot' },
  { to: '/doubts', label: 'Doubts' },
];

const activeClassName = ({ isActive }) =>
  clsx(
    'px-4 py-2 rounded-full transition-all duration-300',
    isActive
      ? 'bg-primary/20 text-white shadow-glow'
      : 'text-white/70 hover:text-white hover:bg-white/5',
  );

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user, role } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-midnight-soft/80 backdrop-blur-lg">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-wide">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
            FA
          </span>
          <span className="hidden sm:block">
            Failure <span className="text-primary">Academy</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={activeClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://t.me/+9tXd6W3j8v5hMDA1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
          >
            <FaTelegramPlane />
            Join Community
          </a>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="text-right leading-tight">
                <p className="text-sm font-medium text-white">{user?.name ?? 'Creator'}</p>
                <p className="text-xs uppercase tracking-widest text-primary/70">{role}</p>
              </div>
              <NavLink to="/dashboard" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20">
                Dashboard
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink to="/login" className="text-sm font-semibold text-white/70 transition hover:text-white">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-primary-light"
              >
                Start Learning
              </NavLink>
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-white transition hover:bg-white/10 lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <HiOutlineX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-midnight-soft/95"
          >
            <div className="container flex flex-col gap-3 py-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={clsx(
                    'rounded-2xl px-4 py-3 text-base font-semibold transition',
                    location.pathname === item.to ? 'bg-primary/20 text-white' : 'bg-white/5 text-white/80',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href="https://t.me/+9tXd6W3j8v5hMDA1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-primary/50 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20"
              >
                <FaTelegramPlane />
                Telegram Community
              </a>
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white/80"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white/80"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-slate-900"
                  >
                    Start Learning
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
