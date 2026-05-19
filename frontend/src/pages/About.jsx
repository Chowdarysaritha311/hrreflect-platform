import { motion } from 'framer-motion';
import { useInView, useCounter } from '../hooks/useCounter';
import { Target, Eye, Heart, Zap, Shield, Users, Award, Globe } from 'lucide-react';

function StatBlock({ value, suffix, label }) {
  const [ref, inView] = useInView();
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-4xl text-brand-red">{count}{suffix}</div>
      <div className="text-gray-500 text-sm mt-1">{label}</div>
    </div>
  );
}

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Transparent processes, honest communication, and no-fee-until-placed policy.' },
  { icon: Zap, title: 'Speed', desc: 'We understand urgency. Our average time-to-fill is 7 working days.' },
  { icon: Heart, title: 'Care', desc: 'We treat every candidate and client with the respect and attention they deserve.' },
  { icon: Globe, title: 'Excellence', desc: 'Global standards, local expertise — we benchmark ourselves against the best.' },
];

const team = [
  { name: 'Dhirendra Tripathy', role: 'Proprietor', initials: 'DT', color: 'bg-brand-red', exp: 'Leadership' },
  { name: 'Ajit Giri', role: 'Hiring Partner', initials: 'AG', color: 'bg-blue-500', exp: 'Recruitment' },
];

export default function About() {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,25,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(232,25,44,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-red opacity-15 blur-3xl rounded-full blob" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-red rounded-full" />
            <span className="text-white/70 text-sm font-medium">About HRReflect</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            We Believe Every<br />
            <span className="gradient-text">Hire Matters</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-xl leading-relaxed">
            HRReflect was built on a simple idea: recruitment should reflect the real ambitions of people and companies — not just fill seats.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div ref={ref1} initial={{ opacity: 0, x: -30 }} animate={inView1 ? { opacity: 1, x: 0 } : {}}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-5">
                <span className="w-2 h-2 bg-brand-red rounded-full" />
                <span className="text-brand-red text-sm font-semibold">Our Story</span>
              </div>
              <h2 className="font-display font-bold text-4xl text-gray-900 mb-6">
                From Kanakapura Road, Bangalore — Built for India's Growth
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>HRReflect was founded in Bangalore by HR professionals who were tired of seeing talent and opportunity miss each other. Too many great candidates were landing wrong jobs. Too many great companies were settling for wrong hires.</p>
                <p>We built HRReflect to fix that. Operating from Kanakapura Road, Bangalore, we have grown to serve 30+ companies across India — with a dedicated team of 5 seasoned recruitment specialists who bring deep domain expertise to every search.</p>
                <p>Today, we are one of India's most trusted HR consultancies, known for our speed, quality, and genuine care for both employers and candidates.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, label: 'Requirement Focus', val: '100%', color: 'bg-orange-50', iconColor: 'text-brand-red' },
                { icon: Award, label: 'Successful Placements', val: '200+', color: 'bg-blue-50', iconColor: 'text-blue-600' },
                { icon: Users, label: 'Clients Served', val: '30+', color: 'bg-green-50', iconColor: 'text-green-600' },
                { icon: Globe, label: 'Expert Recruiters', val: '5+', color: 'bg-purple-50', iconColor: 'text-purple-600' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`${item.color} rounded-2xl p-6`}
                  >
                    <Icon size={24} className={`${item.iconColor} mb-3`} />
                    <div className="font-display font-bold text-3xl text-gray-900 mb-1">{item.val}</div>
                    <div className="text-gray-500 text-sm">{item.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-red rounded-2xl p-10 relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-10 translate-y-10" />
              <Target size={36} className="text-white/60 mb-5" />
              <h3 className="font-display font-bold text-3xl text-white mb-4">Our Mission</h3>
              <p className="text-orange-100 text-lg leading-relaxed">
                To bridge the gap between exceptional talent and visionary organizations — delivering hiring solutions that are fast, accurate, and built on trust.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-gray-950 rounded-2xl p-10 relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-10 translate-y-10" />
              <Eye size={36} className="text-white/40 mb-5" />
              <h3 className="font-display font-bold text-3xl text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                To become India's most respected HR consultancy — known not just for placing people, but for transforming careers and building extraordinary teams.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div ref={ref2} initial={{ opacity: 0, y: 20 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-3">Our Core Values</h2>
            <p className="text-gray-500 text-lg">The principles that guide every decision we make.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-red group-hover:scale-110 transition-all duration-300">
                    <Icon size={22} className="text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-red">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBlock value={30} suffix="+" label="Companies Served" />
          <StatBlock value={200} suffix="+" label="Successful Placements" />
          <StatBlock value={3} suffix="+" label="Years of Experience" />
          <StatBlock value={5} suffix="+" label="Expert Recruiters" />
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-3">Meet Our Leadership</h2>
            <p className="text-gray-500 text-lg">The experienced team behind HRReflect's success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-24 h-24 ${member.color} rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-display font-bold text-3xl">{member.initials}</span>
                </div>
                <h3 className="font-display font-bold text-gray-900 text-xl">{member.name}</h3>
                <p className="text-gray-500 text-sm mt-1 mb-4">{member.role}</p>
                <span className="px-4 py-1.5 bg-orange-50 text-brand-red text-xs font-semibold rounded-full">{member.exp}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
