import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';
import { contactsApi } from '../api/index.js';

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hrreflect1',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/hrreflect1',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hr-reflect1/?viewAsMember=true',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', positions: '1–5 positions', message: '' });
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactsApi.submit(form);
    } catch {
      // Fallback: localStorage
      const existing = JSON.parse(localStorage.getItem('hrreflect_contacts') || '[]');
      const entry = { ...form, id: Date.now(), date: new Date().toISOString(), status: 'New' };
      localStorage.setItem('hrreflect_contacts', JSON.stringify([entry, ...existing]));
    }
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', company: '', email: '', phone: '', service: '', positions: '1–5 positions', message: '' });
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-gray-950 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-red opacity-15 blur-3xl rounded-full blob" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
            <span className="text-white/70 text-sm font-medium">We're Here to Help</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Start Your Hiring<br /><span className="gradient-text">Journey Today</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl leading-relaxed">
            Tell us about your hiring needs and we'll connect you with the right expert — within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left side info */}
            <div className="space-y-4">
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Get in Touch</h2>

              {[
                { icon: MapPin, title: 'Our Office',      detail: 'Kanakapura Road, Bangalore, Karnataka — 560082' },
                { icon: Phone, title: 'Call Us',          detail: '+91 94521 55154', href: 'tel:+919452155154' },
                { icon: Mail,  title: 'Email',            detail: 'info@hrreflect.com', href: 'mailto:info@hrreflect.com' },
                { icon: Clock, title: 'Business Hours',   detail: 'Mon–Sat: 9:00 AM – 6:30 PM' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-brand-red" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-medium mb-0.5">{item.title}</div>
                      {item.href
                        ? <a href={item.href} className="text-gray-900 font-semibold text-sm hover:text-brand-red transition-colors">{item.detail}</a>
                        : <span className="text-gray-900 font-semibold text-sm">{item.detail}</span>}
                    </div>
                  </motion.div>
                );
              })}

              {/* Social media */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm mb-4 font-medium">Follow us on social media</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {SOCIAL.map(({ label, icon, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-600 hover:bg-orange-50 hover:text-brand-red hover:border-orange-200 transition-colors text-sm font-semibold">
                      {icon}
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill in your details and we'll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Message Received!</h3>
                  <p className="text-gray-500 text-sm">Our team will reach out to you within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company *</label>
                      <input name="company" value={form.company} onChange={handleChange} required placeholder="Company name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Work Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Needed</label>
                      <select name="service" value={form.service} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red outline-none text-sm text-gray-600">
                        <option value="">Select a service</option>
                        <option>Permanent Staffing</option><option>Contract Staffing</option>
                        <option>Executive Hiring</option><option>Leadership Hiring</option>
                        <option>IT Recruitment</option><option>Manpower Support</option>
                        <option>HR Consulting</option><option>RPO / Bulk Hiring</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">No. of Positions</label>
                      <select name="positions" value={form.positions} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red outline-none text-sm text-gray-600">
                        <option>1–5 positions</option><option>6–20 positions</option>
                        <option>21–50 positions</option><option>50+ positions</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tell us more</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="Describe your hiring needs, roles, timelines..." rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm resize-none" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-darkred transition-all shadow-lg shadow-orange-200 hover:-translate-y-0.5 text-lg disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? <><Loader2 size={20} className="animate-spin" /> Sending…</> : <>Send Your Inquiry <Send size={20} /></>}
                  </button>
                  <p className="text-gray-400 text-xs text-center">🔒 Your information is secure and will never be shared with third parties.</p>
                </form>
              )}
            </motion.div>
          </div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-72">
            <iframe title="HRReflect Bangalore Office" width="100%" height="100%"
              style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBec5wj4JZKDCUPKmKu0gEMJWrCk3Pf5e0&q=Kanakapura+Road,Bangalore,Karnataka,India+560082&zoom=14" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
