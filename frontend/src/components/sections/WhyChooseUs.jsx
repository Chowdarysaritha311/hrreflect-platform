import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCounter';
import { Zap, Shield, Users, Globe, Headphones, TrendingUp, Clock, Star } from 'lucide-react';

const bentoItems = [
  {
    icon: Zap,
    title: 'Fast Hiring',
    desc: 'Industry-leading 7-day average time-to-fill. We move at startup speed.',
    span: 'col-span-1',
    bg: 'bg-brand-red',
    textColor: 'text-white',
    descColor: 'text-orange-100',
    iconBg: 'bg-white/20',
  },
  {
    icon: Shield,
    title: 'Verified Talent Pool',
    desc: 'Every candidate is background-checked, skill-tested, and reference-verified before being presented to you.',
    span: 'col-span-1 md:col-span-2',
    bg: 'bg-gray-950',
    textColor: 'text-white',
    descColor: 'text-gray-400',
    iconBg: 'bg-white/10',
    extra: (
      <div className="mt-4 flex gap-2">
        {['Background Check', 'Skill Test', 'Reference'].map(tag => (
          <span key={tag} className="px-3 py-1 bg-white/10 text-gray-300 text-xs rounded-full border border-white/10">{tag} ✓</span>
        ))}
      </div>
    ),
  },
  {
    icon: Users,
    title: 'Expert Team',
    desc: 'Our recruiters have 10+ years of domain experience and deep industry networks.',
    span: 'col-span-1 md:col-span-2',
    bg: 'bg-white border border-gray-100 shadow-sm',
    textColor: 'text-gray-900',
    descColor: 'text-gray-500',
    iconBg: 'bg-orange-50',
    iconColor: 'text-brand-red',
    extra: (
      <div className="mt-4 flex items-center gap-3">
        <div className="flex -space-x-2">
          {['bg-blue-500','bg-purple-500','bg-green-500','bg-orange-500','bg-teal-500'].map((c,i)=>(
            <div key={i} className={`w-8 h-8 ${c} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>{['R','P','M','S','K'][i]}</div>
          ))}
        </div>
        <span className="text-sm text-gray-500">5 Senior Recruiters</span>
      </div>
    ),
  },
  {
    icon: Globe,
    title: 'Industry Expertise',
    desc: '8 industries, Bangalore-based, 30+ clients served.',
    span: 'col-span-1',
    bg: 'bg-white border border-gray-100 shadow-sm',
    textColor: 'text-gray-900',
    descColor: 'text-gray-500',
    iconBg: 'bg-orange-50',
    iconColor: 'text-brand-red',
  },
  {
    icon: Headphones,
    title: 'Dedicated HR Support',
    desc: 'A dedicated account manager for every client. We\'re always reachable.',
    span: 'col-span-1',
    bg: 'bg-white border border-gray-100 shadow-sm',
    textColor: 'text-gray-900',
    descColor: 'text-gray-500',
    iconBg: 'bg-orange-50',
    iconColor: 'text-brand-red',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Hiring',
    desc: 'From 1 hire to 500+ bulk deployment — we scale with your business needs effortlessly.',
    span: 'col-span-1',
    bg: 'bg-white border border-gray-100 shadow-sm',
    textColor: 'text-gray-900',
    descColor: 'text-gray-500',
    iconBg: 'bg-orange-50',
    iconColor: 'text-brand-red',
  },
];

export default function WhyChooseUs() {
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
            <span className="text-brand-red text-sm font-semibold">Why HRReflect</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            The HRReflect Advantage —<br />
            <span className="gradient-text">What Sets Us Apart</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We don't just fill positions. We build teams that drive your business forward.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bentoItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`${item.span} ${item.bg} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={20} className={item.iconColor || 'text-white'} />
                </div>
                <h3 className={`font-display font-bold text-xl mb-2 ${item.textColor}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${item.descColor}`}>{item.desc}</p>
                {item.extra}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
