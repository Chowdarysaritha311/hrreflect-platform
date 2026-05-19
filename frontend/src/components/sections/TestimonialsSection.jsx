import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCounter';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    title: 'VP Engineering, FinTech Startup',
    content: 'HRReflect helped us hire 15 senior engineers in under 3 weeks. Their quality of candidates was exceptional — thoroughly screened and culture-fit. We\'ve now made them our exclusive hiring partner.',
    stars: 5,
    initials: 'RK',
    color: 'bg-blue-500',
  },
  {
    name: 'Priya Sharma',
    title: 'HR Director, Healthcare Group',
    content: 'We tried 3 other agencies before HRReflect. None came close to their speed and quality. They found us a CMO-level executive in 10 days — something we\'d been struggling with for 4 months.',
    stars: 5,
    initials: 'PS',
    color: 'bg-purple-500',
  },
  {
    name: 'Amit Verma',
    title: 'COO, Logistics Company',
    content: 'For our 200-person warehouse staffing project, HRReflect delivered on time and within budget. Their manpower solutions are unmatched in Bangalore. Highly recommend for any large-scale hiring.',
    stars: 5,
    initials: 'AV',
    color: 'bg-green-500',
  },
  {
    name: 'Sunita Mehta',
    title: 'Founder, D2C Brand',
    content: 'As a startup, we needed someone who understood our pace. HRReflect got it. They filled our marketing team of 6 in just 2 weeks with absolute rockstars. Game-changing service.',
    stars: 5,
    initials: 'SM',
    color: 'bg-orange-500',
  },
  {
    name: 'Deepak Nair',
    title: 'IT Head, Manufacturing Corp',
    content: 'The technical depth of HRReflect\'s IT recruiters is remarkable. They screened the candidates so well that all 8 developers they placed are still with us 18 months later.',
    stars: 5,
    initials: 'DN',
    color: 'bg-teal-500',
  },
  {
    name: 'Kavitha Rao',
    title: 'CEO, BPO Company',
    content: 'We needed 100+ agents in 3 weeks. HRReflect not only delivered but managed the entire coordination flawlessly. Their process is world-class and their team is incredibly professional.',
    stars: 5,
    initials: 'KR',
    color: 'bg-rose-500',
  },
];

function TestimonialCard({ t, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
    >
      <Quote size={28} className="text-orange-100 absolute top-4 right-4" />
      <div className="flex items-center gap-1 mb-4">
        {[...Array(t.stars)].map((_, i) => (
          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
          {t.initials}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
          <div className="text-gray-400 text-xs">{t.title}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [ref, inView] = useInView();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-4">
            <span className="w-2 h-2 bg-brand-red rounded-full" />
            <span className="text-brand-red text-sm font-semibold">Client Stories</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Trusted by Leaders<br />
            <span className="gradient-text">Across India</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Here's what our clients say about working with HRReflect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => <TestimonialCard key={t.name} t={t} index={i} />)}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 py-8 border-t border-gray-200"
        >
          {[
            { val: '30+', label: 'Happy Clients' },
            { val: '200+', label: 'Placements' },
            { val: '4.8/5', label: 'Average Rating' },
            { val: '2', label: 'City Offices' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="font-display font-bold text-2xl text-brand-red">{item.val}</div>
              <div className="text-gray-500 text-sm">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
