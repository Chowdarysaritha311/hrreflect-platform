import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, CheckCircle, Trophy } from 'lucide-react';

const industries = [
  {
    emoji: '💻',
    name: 'Information Technology',
    color: 'from-blue-600 to-indigo-700',
    challenges: ['High talent demand with low supply', 'Rapid skill evolution in tech stacks', 'Competitive salary expectations', 'Remote-first preferences'],
    solutions: ['Active tech talent database of 5,000+ profiles', 'Skill-based screening with live coding tests', 'Market compensation benchmarking', 'Remote-friendly hiring frameworks'],
    roles: ['Full Stack Developers', 'DevOps / SRE', 'Data Scientists', 'Cloud Architects', 'Product Managers', 'QA Engineers'],
  },
  {
    emoji: '🏥',
    name: 'Healthcare',
    color: 'from-green-600 to-teal-700',
    challenges: ['Strict credential verification needs', 'High-stakes role criticality', 'Regulatory compliance requirements', 'Rural and tier-2 city deployment'],
    solutions: ['Comprehensive credential validation process', 'Healthcare-specific behavioral assessments', 'NABH and regulatory compliance screening', 'Pan-India deployment capability'],
    roles: ['Doctors & Specialists', 'Nurses & Paramedics', 'Hospital Admins', 'Lab Technicians', 'Medical Sales Reps', 'Healthcare IT'],
  },
  {
    emoji: '🏭',
    name: 'Manufacturing',
    color: 'from-orange-600 to-amber-700',
    challenges: ['High-volume blue-collar hiring', 'Safety-critical role requirements', 'Attrition management challenges', 'Skill gap in technical trades'],
    solutions: ['Bulk hiring pipeline with 200+ blue-collar profiles', 'Safety aptitude and compliance testing', 'Structured onboarding to reduce attrition', 'Trade skill assessment programs'],
    roles: ['Plant Managers', 'Quality Engineers', 'Maintenance Technicians', 'Production Supervisors', 'Safety Officers', 'Line Operators'],
  },
  {
    emoji: '🚚',
    name: 'Logistics & Supply Chain',
    color: 'from-yellow-600 to-orange-700',
    challenges: ['High-volume driver and warehouse hiring', 'Pan-India operational coverage', 'Background verification complexity', 'High attrition in field roles'],
    solutions: ['3,000+ verified logistics professional pool', 'GPS and route compliance verification', 'Streamlined background checks for field staff', 'Retention incentive consulting'],
    roles: ['Logistics Managers', 'Warehouse Supervisors', 'Fleet Managers', 'Supply Chain Analysts', 'Delivery Executives', 'Inventory Controllers'],
  },
  {
    emoji: '📞',
    name: 'BPO / KPO',
    color: 'from-purple-600 to-pink-700',
    challenges: ['High volume with tight timelines', 'Communication skill requirements', 'High attrition in BPO sector', 'Night shift and rotational hiring'],
    solutions: ['24-hour rapid-response hiring capability', 'Voice & accent screening tools', 'Retention-focused profiling', 'Shift-ready candidate matching'],
    roles: ['Call Center Agents', 'Team Leaders', 'Quality Analysts', 'Process Trainers', 'Operations Managers', 'KPO Analysts'],
  },
  {
    emoji: '💰',
    name: 'Banking & Finance',
    color: 'from-brand-red to-brand-darkred',
    challenges: ['BFSI regulatory compliance hiring', 'Trust and integrity requirements', 'Niche financial expertise demand', 'Wealth management talent scarcity'],
    solutions: ['BFSI-certified candidate verification process', 'Financial aptitude and integrity assessments', 'Specialized wealth and investment talent network', 'RBI and SEBI compliance-aware sourcing'],
    roles: ['Branch Managers', 'Relationship Managers', 'Credit Analysts', 'Risk Officers', 'Wealth Advisors', 'Compliance Officers'],
  },
  {
    emoji: '🏢',
    name: 'Corporate & Enterprise',
    color: 'from-slate-600 to-gray-800',
    challenges: ['Complex stakeholder management in hiring', 'Long approval cycles', 'Culture fit criticality', 'Multi-city talent requirements'],
    solutions: ['Executive HR advisory for large-scale hiring', 'ATS-integrated delivery model', 'Culture assessment frameworks', 'Multi-city concurrent search capability'],
    roles: ['HR Business Partners', 'Finance Controllers', 'Legal Counsels', 'Strategy Analysts', 'Admin Managers', 'Executive Assistants'],
  },
  {
    emoji: '🚀',
    name: 'Startups',
    color: 'from-pink-600 to-rose-700',
    challenges: ['Hiring without strong employer brand', 'Budget sensitivity', 'Speed-to-hire requirements', 'Generalist vs specialist balance'],
    solutions: ['Startup talent community of 2,000+ candidates', 'Equity-aware candidate conversations', 'Rapid 48-hour shortlisting', 'Hybrid role profiling expertise'],
    roles: ['Full Stack Engineers', 'Growth Marketers', 'Product Designers', 'Ops & BD Executives', 'Founding Team Hires', 'Finance & Legal'],
  },
];

export default function Industries() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,25,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(232,25,44,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-red opacity-15 blur-3xl rounded-full blob" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-red rounded-full" />
            <span className="text-white/70 text-sm font-medium">Industries We Serve</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Deep Expertise Across<br />
            <span className="gradient-text">Every Industry</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-xl leading-relaxed">
            We don't just know recruitment — we know your industry. Sector-specific hiring strategies for India's leading verticals.
          </motion.p>
        </div>
      </section>

      {/* Industry cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${ind.color} p-8 flex items-center gap-4`}>
                <span className="text-5xl">{ind.emoji}</span>
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white">{ind.name}</h2>
                  <p className="text-white/70 text-sm mt-1">Industry-Specific Recruitment Solutions</p>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Challenges */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle size={18} className="text-orange-500" />
                    <h3 className="font-display font-semibold text-gray-900">Hiring Challenges</h3>
                  </div>
                  <ul className="space-y-2">
                    {ind.challenges.map(ch => (
                      <li key={ch} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        {ch}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle size={18} className="text-green-500" />
                    <h3 className="font-display font-semibold text-gray-900">Our Solutions</h3>
                  </div>
                  <ul className="space-y-2">
                    {ind.solutions.map(s => (
                      <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Roles */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy size={18} className="text-brand-red" />
                    <h3 className="font-display font-semibold text-gray-900">Key Roles We Fill</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ind.roles.map(r => (
                      <span key={r} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-brand-red transition-colors duration-200 text-sm"
                >
                  Hire for {ind.name} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
