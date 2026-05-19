import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Vacancies', path: '/vacancies' },
  { name: 'Job Seekers', path: '/job-seekers' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isDarkHero = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isTransparent = isDarkHero && !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white shadow-md shadow-black/5 border-b border-gray-100'
            : isDarkHero
              ? 'py-5 bg-transparent'
              : 'py-4 bg-white shadow-sm border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <div className={`rounded-xl transition-all duration-300 group-hover:scale-105 ${
              isTransparent ? 'bg-white/90 px-2 py-1 shadow-md' : ''
            }`}>
              <img
                src="/hrr-logo.jpg"
                alt="HRReflect"
                className="h-9 w-auto object-contain"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  location.pathname === link.path
                    ? 'text-brand-red'
                    : isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-active"
                    className={`absolute inset-0 rounded-lg ${isTransparent ? 'bg-white/10' : 'bg-orange-50'}`}
                    style={{ zIndex: -1 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-darkred transition-all duration-200 shadow-md shadow-orange-200/50 hover:shadow-lg hover:-translate-y-0.5"
            >
              Hire Talent →
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 mt-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                  <Link
                    to={link.path}
                    className={`block px-5 py-4 text-lg font-semibold rounded-2xl transition-colors ${
                      location.pathname === link.path ? 'text-brand-red bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-6">
                <Link to="/contact" className="block w-full text-center px-6 py-4 bg-brand-red text-white font-bold text-lg rounded-2xl hover:bg-brand-darkred transition-colors">
                  Hire Talent →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
