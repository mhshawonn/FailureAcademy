import { FaYoutube, FaTelegramPlane, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="border-t border-white/10 bg-midnight-soft/90">
    <div className="container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-lg font-semibold text-white">Failure Academy</p>
        <p className="mt-2 max-w-md text-sm text-white/70">
          Design your comeback story with curated cohorts, resilient communities, and mentorship built for second
          chances.
        </p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-white/60 md:text-right">
        <div className="flex items-center gap-3 text-base text-white md:justify-end">
          <a
            href="https://www.youtube.com/@academyfailure"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/10"
            aria-label="Failure Academy YouTube channel"
          >
            <FaYoutube />
          </a>
          <a
            href="https://t.me/+9tXd6W3j8v5hMDA1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/10"
            aria-label="Failure Academy Telegram group"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/10"
            aria-label="Failure Academy Instagram"
          >
            <FaInstagram />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Failure Academy. Designed for dreamers who learn loudly.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
