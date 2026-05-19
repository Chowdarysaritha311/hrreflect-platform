import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Clock, IndianRupee, Search, ArrowUpRight, Building2, CheckCircle, X, Upload, Loader2, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobsApi, applicationsApi } from '../api/index.js';

const FALLBACK_JOBS = [
  { _id: 1, title: 'Senior Software Engineer', company: 'Leading FinTech Company', location: 'Bangalore', employmentType: 'Full Time', experience: '4–7 years', salary: '18–28 LPA', skills: ['React', 'Node.js', 'AWS', 'MongoDB'], industry: 'IT', urgent: true, description: 'We are looking for a Senior Software Engineer to join our growing FinTech team. You will design and build scalable backend services, work on frontend features using React, and collaborate with product teams to deliver high-quality solutions.\n\nKey Responsibilities:\n• Design and develop scalable web applications\n• Collaborate with cross-functional teams\n• Code reviews and mentoring junior developers\n• Optimize application performance\n\nRequirements:\n• 4–7 years of hands-on experience\n• Strong proficiency in React and Node.js\n• Experience with AWS and MongoDB\n• Good understanding of REST APIs' },
  { _id: 2, title: 'HR Business Partner', company: 'MNC Corporation', location: 'Bangalore', employmentType: 'Full Time', experience: '5–8 years', salary: '12–18 LPA', skills: ['HR Strategy', 'Talent Management', 'HRBP'], industry: 'Corporate', urgent: false, description: 'Seeking an experienced HR Business Partner to align HR strategies with business objectives and support leadership teams.\n\nKey Responsibilities:\n• Partner with business leaders on workforce planning\n• Drive talent acquisition and retention initiatives\n• Manage employee relations and conflict resolution\n• Lead HR analytics and reporting\n\nRequirements:\n• 5–8 years in HR with HRBP experience\n• Strong knowledge of labor laws\n• Excellent communication and stakeholder management skills' },
  { _id: 3, title: 'Sales Manager — B2B', company: 'Logistics Startup', location: 'Bangalore', employmentType: 'Full Time', experience: '3–6 years', salary: '10–16 LPA', skills: ['B2B Sales', 'CRM', 'Negotiation'], industry: 'Logistics', urgent: true, description: 'Drive B2B sales growth for a fast-growing logistics startup. You will manage key accounts, develop new business, and lead a small sales team.\n\nKey Responsibilities:\n• Identify and close new B2B opportunities\n• Manage and grow existing client accounts\n• Lead and coach the sales team\n• Meet and exceed monthly revenue targets\n\nRequirements:\n• 3–6 years in B2B sales\n• Experience in logistics or supply chain preferred\n• Strong negotiation and CRM skills' },
];

const industryColors = {
  IT: 'bg-blue-100 text-blue-700', Corporate: 'bg-slate-100 text-slate-700',
  Logistics: 'bg-yellow-100 text-yellow-700', Healthcare: 'bg-green-100 text-green-700',
  Manufacturing: 'bg-orange-100 text-orange-700', BPO: 'bg-purple-100 text-purple-700',
  Finance: 'bg-red-100 text-red-700', Startups: 'bg-pink-100 text-pink-700',
};

const emptyForm = { name: '', email: '', phone: '', experience: '', skills: '', location: '', coverLetter: '', resume: null };

export default function Vacancies() {
  const [jobs, setJobs] = useState(FALLBACK_JOBS);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [applyJob, setApplyJob] = useState(null);
  const [detailJob, setDetailJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [appForm, setAppForm] = useState(emptyForm);
  const [resumeName, setResumeName] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    jobsApi.getPublic()
      .then(d => { if (d.data?.length) setJobs(d.data); })
      .catch(() => {})
      .finally(() => setLoadingJobs(false));
  }, []);

  const filtered = jobs.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
      (v.skills || []).some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchIndustry = industryFilter === 'All' || v.industry === industryFilter;
    return matchSearch && matchIndustry;
  });

  const handleApply = (job) => { setApplyJob(job); setDetailJob(null); setApplied(false); setAppForm(emptyForm); setResumeName(''); };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) { setAppForm(f => ({ ...f, resume: file })); setResumeName(file.name); }
  };

  const toggleExpand = (id) => setExpandedId(prev => prev === id ? null : id);

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name', appForm.name);
      fd.append('email', appForm.email);
      fd.append('phone', appForm.phone);
      fd.append('experience', appForm.experience);
      fd.append('skills', appForm.skills || '');
      fd.append('location', appForm.location || '');
      fd.append('coverLetter', appForm.coverLetter || '');
      fd.append('jobTitle', applyJob.title || '');
      fd.append('company', applyJob.company || '');
      if (applyJob._id && typeof applyJob._id === 'string') fd.append('jobId', applyJob._id);
      if (appForm.resume) fd.append('resume', appForm.resume);
      await applicationsApi.submit(fd);
    } catch {
      const entry = {
        id: Date.now(), name: appForm.name, email: appForm.email, phone: appForm.phone,
        experience: appForm.experience, skills: appForm.skills || 'Not specified',
        location: appForm.location || 'Not specified', coverLetter: appForm.coverLetter || '',
        role: applyJob?.title || '', company: applyJob?.company || '',
        resume: resumeName || 'Not uploaded',
        date: new Date().toLocaleDateString('en-IN'), status: 'Applied',
      };
      const existing = JSON.parse(localStorage.getItem('hrreflect_applications') || '[]');
      localStorage.setItem('hrreflect_applications', JSON.stringify([entry, ...existing]));
    }
    setSubmitting(false);
    setApplied(true);
    setTimeout(() => { setApplyJob(null); setApplied(false); setAppForm(emptyForm); setResumeName(''); }, 4000);
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-brand-red opacity-15 blur-3xl rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-white/70 text-sm font-medium">Latest Openings</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Current Job<br /><span className="gradient-text">Vacancies</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-xl leading-relaxed">
            Explore our latest openings. Apply directly and our recruiter will get in touch within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
            <Search size={16} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by role or skill..."
              className="bg-transparent text-sm outline-none flex-1 text-gray-700" />
          </div>
          <select value={industryFilter} onChange={e => setIndustryFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:border-brand-red">
            <option value="All">All Industries</option>
            {['IT','Healthcare','Finance','Manufacturing','BPO','Logistics','Corporate','Startups'].map(i => <option key={i}>{i}</option>)}
          </select>
          <span className="text-sm text-gray-400 ml-auto">{filtered.length} openings found</span>
        </div>
      </section>

      {/* Job Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {loadingJobs ? (
            <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-brand-red" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20"><p className="text-gray-400 text-lg">No openings match your search.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
              {filtered.map((job, i) => {
                const isExpanded = expandedId === job._id;
                return (
                  <motion.div key={job._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.07 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">

                    {/* Card Top */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center"><Briefcase size={18} className="text-brand-red" /></div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${industryColors[job.industry] || 'bg-gray-100 text-gray-600'}`}>{job.industry}</span>
                        </div>
                        {job.urgent && <span className="px-2.5 py-1 bg-red-50 text-brand-red text-xs font-bold rounded-full border border-red-100">🔥 Urgent</span>}
                      </div>

                      <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{job.title}</h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4"><Building2 size={13} /><span>{job.company}</span></div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs"><MapPin size={12} className="text-brand-red" />{job.location}</div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs"><Clock size={12} className="text-brand-red" />{job.experience}</div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs"><IndianRupee size={12} className="text-brand-red" />{job.salary || 'Competitive'}</div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs"><Briefcase size={12} className="text-brand-red" />{job.employmentType || job.type || 'Full Time'}</div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(job.skills || []).map(skill => (<span key={skill} className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-xs rounded-lg">{skill}</span>))}
                      </div>

                      {/* Expandable Description */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            key="desc"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 rounded-xl bg-orange-50 border border-orange-100 p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <FileText size={15} className="text-brand-red flex-shrink-0" />
                                <span className="text-sm font-bold text-gray-800">Job Description</span>
                              </div>
                              {job.description ? (
                                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                  {job.description}
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <p className="text-gray-400 text-sm italic">No detailed description added yet.</p>
                                  <p className="text-gray-400 text-xs mt-1">Contact us at <span className="text-brand-red font-medium">info@hrreflect.com</span> for more information.</p>
                                </div>
                              )}
                              <div className="mt-4 pt-3 border-t border-orange-200 flex items-center justify-between">
                                <span className="text-xs text-gray-500">📍 {job.location} &nbsp;·&nbsp; 💼 {job.employmentType || 'Full Time'} &nbsp;·&nbsp; ⏱ {job.experience}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 pb-5 flex items-center justify-between gap-2 border-t border-gray-50 pt-4">
                      {job.description ? (
                        <button
                          onClick={() => toggleExpand(job._id)}
                          className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-brand-red transition-colors"
                        >
                          {isExpanded ? <><ChevronUp size={14} /> Hide Details</> : <><ChevronDown size={14} /> View Details</>}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Contact us for details</span>
                      )}
                      <button onClick={() => handleApply(job)} className="flex items-center gap-1.5 px-4 py-2 bg-brand-red text-white text-sm font-semibold rounded-xl hover:bg-brand-darkred transition-colors">
                        Apply Now <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-14 bg-gray-950 rounded-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="relative z-10">
              <h3 className="font-display font-bold text-2xl text-white mb-2">Don't see the right role?</h3>
              <p className="text-gray-400 mb-6">Register your profile and we'll contact you when a matching opportunity opens up.</p>
              <Link to="/job-seekers" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-darkred transition-colors">
                Register as Job Seeker <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apply Modal */}
      {applyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl my-8">
            {applied ? (
              <div className="text-center py-8">
                <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-500 text-sm">Our recruiter will contact you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display font-bold text-xl text-gray-900">{applyJob.title}</h3>
                    <p className="text-gray-500 text-sm">{applyJob.company} · {applyJob.location}</p>
                  </div>
                  <button onClick={() => setApplyJob(null)} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
                </div>
                <form onSubmit={handleAppSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label>
                      <input value={appForm.name} onChange={e => setAppForm({ ...appForm, name: e.target.value })} required placeholder="Your full name"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number *</label>
                      <input value={appForm.phone} onChange={e => setAppForm({ ...appForm, phone: e.target.value })} required placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email Address *</label>
                    <input type="email" value={appForm.email} onChange={e => setAppForm({ ...appForm, email: e.target.value })} required placeholder="your@email.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Years of Experience *</label>
                      <select value={appForm.experience} onChange={e => setAppForm({ ...appForm, experience: e.target.value })} required
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red outline-none text-sm text-gray-600">
                        <option value="">Select experience</option>
                        <option>Fresher</option><option>1–2 years</option><option>3–5 years</option><option>6–9 years</option><option>10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Current Location *</label>
                      <input value={appForm.location} onChange={e => setAppForm({ ...appForm, location: e.target.value })} required placeholder="City, State"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Key Skills</label>
                    <input value={appForm.skills} onChange={e => setAppForm({ ...appForm, skills: e.target.value })} placeholder="e.g. React, Node.js, Project Management"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Cover Letter</label>
                    <textarea value={appForm.coverLetter} onChange={e => setAppForm({ ...appForm, coverLetter: e.target.value })}
                      placeholder="Briefly tell us why you're a great fit..." rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Upload Resume (PDF/DOC)</label>
                    <label className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-brand-red cursor-pointer transition-colors">
                      <Upload size={18} className="text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-500 truncate">{resumeName || 'Click to upload your resume'}</span>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-darkred transition-colors shadow-lg shadow-orange-100 disabled:opacity-60">
                    {submitting ? <><Loader2 size={18} className="animate-spin" /> Submitting…</> : 'Submit Application'}
                  </button>
                  <p className="text-gray-400 text-xs text-center">🔒 Your information is kept confidential.</p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
}
