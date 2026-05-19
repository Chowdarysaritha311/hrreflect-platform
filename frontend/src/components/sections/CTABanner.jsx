import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useInView } from '../../hooks/useCounter';

export default function CTABanner() {
  const [ref, inView] = useInView();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative overflow-hidden bg-gray-950 rounded-3xl p-12 md:p-16 text-center"
        >
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-red opacity-20 blur-3xl rounded-full -translate-x-20 -translate-y-20 blob" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-red opacity-15 blur-3xl rounded-full translate-x-20 translate-y-20 blob" style={{ animationDelay: '3s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,25,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(232,25,44,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
              <span className="text-white/70 text-sm font-semibold">Now Hiring for 10+ Active Positions</span>
            </motion.div>

            <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
              Your Next Great Hire<br />
              <span className="gradient-text">Starts Here</span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Whether you're hiring one specialist or building an entire department — HRReflect delivers with speed, quality, and professionalism.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold text-lg rounded-2xl hover:bg-brand-darkred transition-all duration-200 shadow-xl shadow-orange-900/30 hover:scale-105"
              >
                Start Hiring Today <ArrowRight size={20} />
              </Link>
              <a
                href="tel:+919452155154"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-200"
              >
                <Phone size={20} /> Call Us Now
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              {['No placement, no fee', 'Response within 24 hours', 'Dedicated account manager'].map(item => (
                <div key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
