import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCounter';
import {
  Users, Briefcase, Crown, Target, Heart, UserCheck,
  Code2, Award, Clock, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Users,
    title: 'Recruitment Services',
    desc: 'End-to-end recruitment for permanent roles across all experience levels and industries.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Clock,
    title: 'Contract Staffing',
    desc: 'Flexible contract professionals to augment your team for projects and peak demands.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Crown,
    title: 'Executive Hiring',
    desc: 'C-suite and VP-level searches with our confidential executive recruitment process.',
    color: 'from-brand-red to-brand-darkred',
    bg: 'bg-orange-50',
  },
  {
    icon: Target,
    title: 'Leadership Hiring',
    desc: 'Director and senior management talent to drive your business strategy forward.',
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: Heart,
    title: 'Human Resources',
    desc: 'Full HR consulting services — policies, compliance, HRMS setup, and culture building.',
    color: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: UserCheck,
    title: 'Manpower Support',
    desc: 'Large-scale manpower deployment for manufacturing, logistics, and operations.',
    color: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: Code2,
    title: 'IT Recruitment',
    desc: 'Specialized tech hiring — developers, architects, data scientists, cloud engineers.',
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: Award,
    title: 'Permanent Staffing',
    desc: 'Full-time placements with thorough screening, culture fit, and onboarding support.',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Briefcase,
    title: 'Staffing Solutions',
    desc: 'Comprehensive workforce solutions — from RPO to bulk hiring campaigns.',
    color: 'from-yellow-500 to-yellow-600',
    bg: 'bg-yellow-50',
  },
];

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView(0.1);
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      className="group card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-transparent hover:shadow-xl cursor-pointer"
    >
      <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <div className={`bg-gradient-to-br ${service.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <h3 className="font-display font-semibold text-gray-900 text-lg mb-2">{service.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
      <div className="flex items-center gap-1.5 text-brand-red text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Learn More <ArrowUpRight size={16} />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
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
            <span className="text-brand-red text-sm font-semibold">Our Services</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Comprehensive HR Solutions<br />
            <span className="gradient-text">Built for Growth</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From entry-level hiring to executive search, we deliver end-to-end talent solutions that drive business outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-2xl hover:bg-brand-darkred transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            View All Services <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
