import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCounter';
import { Link } from 'react-router-dom';

const industries = [
  { emoji: '💻', name: 'Information Technology', roles: '120+ roles filled', color: 'from-blue-600 to-indigo-700' },
  { emoji: '🏥', name: 'Healthcare', roles: '80+ roles filled', color: 'from-green-600 to-teal-700' },
  { emoji: '🏭', name: 'Manufacturing', roles: '150+ roles filled', color: 'from-orange-600 to-amber-700' },
  { emoji: '🚚', name: 'Logistics', roles: '90+ roles filled', color: 'from-yellow-600 to-orange-700' },
  { emoji: '📞', name: 'BPO / KPO', roles: '200+ roles filled', color: 'from-purple-600 to-pink-700' },
  { emoji: '💰', name: 'Banking & Finance', roles: '60+ roles filled', color: 'from-brand-red to-brand-darkred' },
  { emoji: '🏢', name: 'Corporate Sector', roles: '110+ roles filled', color: 'from-slate-600 to-gray-800' },
  { emoji: '🚀', name: 'Startups', roles: '70+ roles filled', color: 'from-pink-600 to-rose-700' },
];

export default function IndustriesSection() {
  const [ref, inView] = useInView();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-4">
            <span className="w-2 h-2 bg-brand-red rounded-full" />
            <span className="text-brand-red text-sm font-semibold">Industries We Serve</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Deep Domain Expertise<br />
            <span className="gradient-text">Across Sectors</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We understand the unique hiring needs of each industry and bring specialized recruitment strategies for every vertical.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${ind.color} p-6 cursor-pointer group`}
            >
              <div className="relative z-10">
                <div className="text-3xl mb-3">{ind.emoji}</div>
                <h3 className="font-display font-bold text-white text-base md:text-lg mb-1">{ind.name}</h3>
                <p className="text-white/70 text-xs md:text-sm">{ind.roles}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-6 translate-y-6" />
              <div className="absolute top-0 right-4 w-16 h-16 bg-white/5 rounded-full -translate-y-4" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-red text-brand-red font-bold rounded-2xl hover:bg-brand-red hover:text-white transition-all duration-200"
          >
            Explore All Industries →
          </Link>
        </div>
      </div>
    </section>
  );
}
