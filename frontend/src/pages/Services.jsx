import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Briefcase, Crown, Target, Heart, UserCheck,
  Code2, Award, Clock, CheckCircle, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Recruitment Services',
    tagline: 'Find the right person for every role',
    desc: 'Our end-to-end recruitment service covers everything from job profiling to offer rollout. We source from active and passive candidate pools, run rigorous screening, and ensure every shortlist is handpicked.',
    features: ['Job Description Crafting', 'Multi-channel Sourcing', 'Technical & Behavioral Screening', 'Interview Coordination', 'Offer Management', 'Post-Joining Follow-up'],
    color: 'bg-blue-500',
    bg: 'from-blue-50 to-indigo-50',
  },
  {
    icon: Clock,
    title: 'Contract Staffing',
    tagline: 'Flexible talent for dynamic businesses',
    desc: 'When you need skilled professionals quickly — for projects, maternity covers, or peak periods — our contract staffing division delivers. Fast deployment, fully compliant contracts, and managed payroll.',
    features: ['Project-based Staffing', 'Short & Long-term Contracts', 'Payroll Management', 'Compliance Handling', 'Quick Deployment (48-72 hrs)', 'Replacement Guarantee'],
    color: 'bg-purple-500',
    bg: 'from-purple-50 to-pink-50',
  },
  {
    icon: Crown,
    title: 'Executive Hiring',
    tagline: 'C-suite talent, placed with precision',
    desc: 'Senior leader searches require discretion, depth, and an elite network. Our executive search team uses proprietary research methods to identify, approach, and evaluate top leadership talent globally.',
    features: ['Confidential Search', 'C-Suite & VP-level Roles', 'Psychometric Assessments', 'Board Presentations', 'Reference Deep-Dives', 'Negotiation Support'],
    color: 'bg-brand-red',
    bg: 'from-red-50 to-orange-50',
  },
  {
    icon: Target,
    title: 'Leadership Hiring',
    tagline: 'Directors and managers who drive results',
    desc: 'Finding mid-to-senior leaders who align with your culture and drive your strategy is our specialty. We map entire leadership teams and recommend candidates from our vast senior talent network.',
    features: ['Director & GM-level Hiring', 'Culture Fit Evaluation', 'Leadership Assessments', 'Team Mapping', 'Succession Planning', '90-Day Placement Support'],
    color: 'bg-orange-500',
    bg: 'from-orange-50 to-yellow-50',
  },
  {
    icon: Heart,
    title: 'Human Resources Consulting',
    tagline: 'Build the HR backbone your business needs',
    desc: 'Beyond hiring, we help you build the HR infrastructure that attracts and retains great talent. From policies to HRMS implementation, we bring structure and professionalism to your people function.',
    features: ['HR Policy Development', 'HRMS Setup & Configuration', 'Compliance & Labour Law', 'Performance Management', 'Onboarding Programs', 'Employee Engagement'],
    color: 'bg-pink-500',
    bg: 'from-pink-50 to-red-50',
  },
  {
    icon: UserCheck,
    title: 'Manpower Support',
    tagline: 'Large-scale workforce deployment',
    desc: 'Whether you need 10 or 1000 workers, our manpower division handles everything — sourcing, screening, documentation, and ongoing workforce management for manufacturing, logistics, and operations.',
    features: ['Bulk Hiring (10 to 1000+)', 'Pan-India Deployment', 'Background Verification', 'Documentation & Contracts', 'Ongoing Workforce Mgmt', 'Attrition Replacement'],
    color: 'bg-teal-500',
    bg: 'from-teal-50 to-green-50',
  },
  {
    icon: Code2,
    title: 'IT Recruitment',
    tagline: 'Tech talent that actually delivers',
    desc: 'Our IT recruitment team speaks the language of technology. From full-stack developers and DevOps engineers to data scientists and cloud architects — we find the technical talent that drives your product forward.',
    features: ['Full-Stack Developers', 'Cloud & DevOps Engineers', 'Data Scientists & AI/ML', 'QA & Testing Experts', 'Technical Screening', 'Remote & On-site Roles'],
    color: 'bg-indigo-500',
    bg: 'from-indigo-50 to-blue-50',
  },
  {
    icon: Award,
    title: 'Permanent Staffing',
    tagline: 'Long-term team members, not just candidates',
    desc: 'We go beyond the resume. Our permanent staffing process includes cultural alignment, career aspiration matching, and structured onboarding support to ensure your new hire stays, grows, and contributes.',
    features: ['Cultural Alignment Checks', 'Skill Assessments', 'Reference Verification', 'Onboarding Support', '90-Day Follow-up', 'Replacement Warranty'],
    color: 'bg-emerald-500',
    bg: 'from-emerald-50 to-teal-50',
  },
  {
    icon: Briefcase,
    title: 'Staffing Solutions (RPO)',
    tagline: 'Outsource your entire hiring function',
    desc: 'Our Recruitment Process Outsourcing (RPO) service makes HRReflect an extension of your HR team. We manage the entire talent acquisition function so your team can focus on what matters most.',
    features: ['End-to-End RPO', 'Dedicated Recruiting Team', 'ATS Management', 'Employer Branding Support', 'Hiring Analytics & Reports', 'SLA-driven Delivery'],
    color: 'bg-yellow-500',
    bg: 'from-yellow-50 to-orange-50',
  },
];

export default function Services() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,25,44,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(232,25,44,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-red opacity-15 blur-3xl rounded-full blob" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-red rounded-full" />
            <span className="text-white/70 text-sm font-medium">Our Services</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Premium HR Services<br />
            <span className="gradient-text">Built for Scale</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-xl leading-relaxed">
            From single hires to enterprise-scale staffing — HRReflect delivers talent solutions that match your ambition.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.05, duration: 0.5 }}
                className={`bg-gradient-to-br ${service.bg} rounded-2xl p-8 md:p-10 border border-white shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <span className="text-gray-500 text-sm font-medium">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-2">{service.title}</h2>
                    <p className="text-brand-red font-semibold text-sm mb-4">{service.tagline}</p>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-brand-red transition-colors duration-200 text-sm"
                    >
                      Get Started <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/50">
                        <CheckCircle size={16} className="text-brand-red flex-shrink-0" />
                        <span className="text-gray-700 text-sm font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-gray-900 mb-4">
            Not sure which service fits?
          </h2>
          <p className="text-gray-500 text-lg mb-8">Talk to our HR experts — we'll guide you to the right solution for your business.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-2xl hover:bg-brand-darkred transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5">
            Book a Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
