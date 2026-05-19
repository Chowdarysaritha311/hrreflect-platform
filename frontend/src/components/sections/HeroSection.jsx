import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Briefcase, TrendingUp, Star } from 'lucide-react';
import { useCounter, useInView } from '../../hooks/useCounter';

function StatCard({ value, suffix, label, delay }) {
  const [ref, inView] = useInView();
  const count = useCounter(value, 2000, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="font-display font-bold text-3xl text-white">
        {count}{suffix}
      </div>
      <div className="text-orange-100 text-sm mt-1">{label}</div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gray-950 overflow-hidden flex flex-col">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-red opacity-20 blur-3xl blob"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-red opacity-15 blur-3xl blob"
          style={{ animationDelay: '3s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-darkred opacity-10 blur-3xl blob"
          style={{ animationDelay: '1.5s' }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,25,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(232,25,44,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-full backdrop-blur-sm mb-8"
        >
          <Star size={14} className="text-brand-red fill-brand-red" />
          <span className="text-white/80 text-sm font-medium">India's Premier HR Consultancy</span>
          <Star size={14} className="text-brand-red fill-brand-red" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white text-center leading-tight max-w-5xl mx-auto"
        >
          We Connect{' '}
          <span className="relative">
            <span className="gradient-text">Great Talent</span>
          </span>{' '}
          <br className="hidden md:block" />
          with{' '}
          <span className="gradient-text">Great Companies</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-gray-300 text-lg md:text-xl text-center max-w-2xl leading-relaxed"
        >
          HRReflect delivers premium recruitment, executive hiring, and staffing solutions for India's fastest-growing businesses — proudly based in Bangalore.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <Link
            to="/contact"
            className="flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-2xl hover:bg-brand-darkred transition-all duration-200 shadow-xl shadow-orange-900/40 hover:scale-105 hover:shadow-orange-900/60"
          >
            Hire Top Talent <ArrowRight size={18} />
          </Link>
          <Link
            to="/services"
            className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-200 backdrop-blur-sm"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Trust bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10"
        >
          {['30+ Companies Served', '200+ Placements', 'Fast Hiring Process'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-gray-300 text-sm">
              <CheckCircle2 size={16} className="text-brand-red" />
              {item}
            </div>
          ))}
        </motion.div>

        {/* Floating cards - clean horizontal row, no overlap */}
        <div className="w-full max-w-4xl mt-12 hidden lg:flex items-stretch gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ animation: 'float 6s ease-in-out infinite' }}
            className="glass rounded-2xl p-4 flex items-center gap-3 shadow-2xl border border-white/10 flex-1"
          >
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm">New Placement</div>
              <div className="text-gray-400 text-xs">HR Manager · Bangalore</div>
            </div>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 whitespace-nowrap flex-shrink-0">
              ✓ Hired
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ animation: 'float 6s ease-in-out 2s infinite' }}
            className="glass rounded-2xl p-4 flex items-center gap-3 shadow-2xl border border-white/10 flex-1"
          >
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-sm">Quick Closure</div>
              <div className="text-gray-400 text-xs">Avg. 10 days to hire</div>
            </div>
            <div className="text-brand-red font-bold flex-shrink-0">Fast Hire</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{ animation: 'float 6s ease-in-out 4s infinite' }}
            className="glass rounded-2xl p-4 flex items-center gap-3 shadow-2xl border border-white/10 flex-1"
          >
            <div className="flex -space-x-2 flex-shrink-0">
              {['bg-blue-500', 'bg-purple-500', 'bg-orange-500'].map((c, i) => (
                <div key={i} className={`w-8 h-8 ${c} rounded-full border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold`}>
                  {['R', 'P', 'A'][i]}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-sm">Active Searches</div>
              <div className="text-gray-400 text-xs">10+ roles being filled</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 bg-brand-red"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value={30} suffix="+" label="Companies Served" delay={0} />
          <StatCard value={200} suffix="+" label="Successful Placements" delay={0.1} />
          <StatCard value={5} suffix="+" label="Expert Recruiters" delay={0.2} />
          <StatCard value={10} suffix=" Days" label="Avg. Time to Hire" delay={0.3} />
        </div>
      </motion.div>
    </section>
  );
}
