import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useCounter';
import { ClipboardList, Search, MessageSquare, CheckCircle, Rocket } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Requirement Analysis',
    desc: 'We deep-dive into your hiring needs, culture, and role expectations to build the perfect candidate profile.',
    number: '01',
  },
  {
    icon: Search,
    title: 'Talent Screening',
    desc: 'Our recruiters source and screen from a vast network, applying rigorous skill and background filters.',
    number: '02',
  },
  {
    icon: MessageSquare,
    title: 'Interview Coordination',
    desc: 'We manage the entire interview process — scheduling, feedback collection, and candidate preparation.',
    number: '03',
  },
  {
    icon: CheckCircle,
    title: 'Selection & Offer',
    desc: 'We facilitate offer negotiations and ensure seamless communication between all parties.',
    number: '04',
  },
  {
    icon: Rocket,
    title: 'Smooth Onboarding',
    desc: 'Post-joining support ensures your new hire integrates fast and starts contributing from day one.',
    number: '05',
  },
];

export default function ProcessTimeline() {
  const [ref, inView] = useInView();

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden">
      {/* BG decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(232,25,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(232,25,44,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red opacity-10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 mb-4">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-white/70 text-sm font-semibold">Our Process</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            How We Hire —{' '}
            <span className="gradient-text">Step by Step</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A streamlined 5-step process designed to deliver the right candidate, every time, on time.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative mb-5">
                    <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center shadow-lg shadow-orange-900/30 red-glow">
                      <Icon size={28} className="text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 border border-brand-red text-brand-red text-xs font-bold rounded-full flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
