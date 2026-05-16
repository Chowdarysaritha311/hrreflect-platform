import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, User, Mail, Phone, Briefcase, MapPin, CheckCircle, Star, Zap, Shield } from 'lucide-react';

const benefits = [
  { icon: Zap, title: 'Fast Placement', desc: 'Get placed in top companies within 7–14 days of registration.' },
  { icon: Shield, title: 'Verified Opportunities', desc: 'All job openings are pre-verified — no fake listings, ever.' },
  { icon: Star, title: 'Career Guidance', desc: 'Free resume review and interview coaching from our HR experts.' },
  { icon: User, title: 'Dedicated Recruiter', desc: 'A personal recruiter assigned to match you with the right role.' },
];

const roles = [
  'Software Engineer', 'Data Scientist', 'Product Manager', 'HR Manager',
  'Sales Executive', 'Marketing Manager', 'Finance Analyst', 'Operations Manager',
  'Business Analyst', 'UI/UX Designer', 'DevOps Engineer', 'Team Leader',
];

export default function JobSeekers() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', experience: '',
    currentRole: '', desiredRole: '', skills: '', notice: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = e => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Save to localStorage so admin can view under "Applications" tab
    const entry = {
      id: Date.now(),
      type: 'jobseeker',
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      experience: form.experience,
      currentRole: form.currentRole,
      desiredRole: form.desiredRole,
      skills: form.skills,
      notice: form.notice,
      message: form.message,
      resume: fileName || 'Not uploaded',
      date: new Date().toLocaleDateString('en-IN'),
      status: 'New',
    };
    const existing = JSON.parse(localStorage.getItem('hrreflect_applications') || '[]');
    localStorage.setItem('hrreflect_applications', JSON.stringify([entry, ...existing]));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', city: '', experience: '', currentRole: '', desiredRole: '', skills: '', notice: '', message: '' });
    setFileName('');
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand-red opacity-15 blur-3xl rounded-full blob" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-red opacity-10 blur-3xl rounded-full blob" style={{ animationDelay: '3s' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-white/70 text-sm font-medium">For Job Seekers</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Your Dream Job<br />
            <span className="gradient-text">Starts Here</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-xl leading-relaxed mb-8">
            Register with HRReflect and get connected to India's top companies. We match your skills, experience, and ambitions with the right opportunity.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-wrap justify-center gap-6">
            {['200+ Placed', 'Top Companies', 'Free for Candidates', 'Dedicated Recruiter'].map(item => (
              <div key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                <CheckCircle size={16} className="text-brand-red" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-orange-50 rounded-2xl p-6 border border-orange-100"
                >
                  <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center mb-4">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left info */}
            <div className="lg:col-span-1">
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">
                Register Your Profile
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Fill in your details below. Our recruitment team will review your profile and reach out within <strong>24–48 hours</strong> with matching opportunities.
              </p>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Submit Your Profile', desc: 'Fill in the form with your experience and skills.' },
                  { step: '02', title: 'Profile Review', desc: 'Our recruiter reviews and shortlists your profile.' },
                  { step: '03', title: 'Job Matching', desc: 'We match you with the best-fit openings.' },
                  { step: '04', title: 'Interview & Offer', desc: 'We coordinate interviews and support you till offer.' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                      {s.step}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popular roles */}
              <div className="mt-10">
                <p className="font-display font-semibold text-gray-900 mb-3 text-sm">Popular Roles We Hire For</p>
                <div className="flex flex-wrap gap-2">
                  {roles.map(r => (
                    <span key={r} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-lg">{r}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Profile Submitted!</h3>
                  <p className="text-gray-500 text-lg mb-2">Thank you for registering with HRReflect.</p>
                  <p className="text-gray-400 text-sm">Our recruiter will contact you within 24–48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-1">Candidate Registration</h3>
                  <p className="text-gray-400 text-sm mb-6">All fields marked * are required.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Current City *</label>
                      <input name="city" value={form.city} onChange={handleChange} required placeholder="e.g. Bangalore"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Experience *</label>
                      <select name="experience" value={form.experience} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm text-gray-600">
                        <option value="">Select experience</option>
                        <option>Fresher (0 years)</option>
                        <option>1–2 years</option>
                        <option>3–5 years</option>
                        <option>6–9 years</option>
                        <option>10–15 years</option>
                        <option>15+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Notice Period</label>
                      <select name="notice" value={form.notice} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm text-gray-600">
                        <option value="">Select notice period</option>
                        <option>Immediate</option>
                        <option>15 days</option>
                        <option>30 days</option>
                        <option>60 days</option>
                        <option>90 days</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Job Title</label>
                      <input name="currentRole" value={form.currentRole} onChange={handleChange} placeholder="e.g. Software Engineer"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Desired Job Role *</label>
                      <input name="desiredRole" value={form.desiredRole} onChange={handleChange} required placeholder="e.g. Senior Developer"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Key Skills *</label>
                    <input name="skills" value={form.skills} onChange={handleChange} required placeholder="e.g. React, Node.js, Python, SQL"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                      placeholder="Anything else you'd like us to know — salary expectations, preferred location, etc."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm resize-none" />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload Resume (PDF/DOC)</label>
                    <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-brand-red cursor-pointer transition-colors group">
                      <Upload size={18} className="text-gray-400 group-hover:text-brand-red transition-colors" />
                      <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                        {fileName || 'Click to upload your resume'}
                      </span>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                    </label>
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-darkred transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5 hover:shadow-xl text-lg">
                    Submit My Profile <Send size={20} />
                  </button>
                  <p className="text-gray-400 text-xs text-center">🔒 Your details are 100% confidential and never shared without your consent.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
