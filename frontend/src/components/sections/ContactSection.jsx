import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useInView } from '../../hooks/useCounter';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section className="py-24 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-4">
            <span className="w-2 h-2 bg-brand-red rounded-full" />
            <span className="text-brand-red text-sm font-semibold">Get In Touch</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Let's Build Your Team<br />
            <span className="gradient-text">Together</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              {
                icon: MapPin,
                title: 'Bangalore Office',
                detail: 'Kanakapura Road, Bangalore, Karnataka 560082',
              },
              {
                icon: Phone,
                title: 'Call Us',
                detail: '+91 94521 55154',
              },
              {
                icon: Mail,
                title: 'Email',
                detail: 'info@hrreflect.com',
              },
              {
                icon: Clock,
                title: 'Business Hours',
                detail: 'Mon–Sat: 9:00 AM – 6:30 PM',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-brand-red" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</div>
                    <div className="text-gray-500 text-sm">{item.detail}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange} required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company *</label>
                    <input
                      name="company" value={form.company} onChange={handleChange} required
                      placeholder="Company name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="your@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange} required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Required</label>
                  <select
                    name="service" value={form.service} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm text-gray-600"
                  >
                    <option value="">Select a service</option>
                    <option>Permanent Staffing</option>
                    <option>Contract Staffing</option>
                    <option>Executive Hiring</option>
                    <option>IT Recruitment</option>
                    <option>Leadership Hiring</option>
                    <option>Manpower Support</option>
                    <option>HR Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about your hiring needs..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-darkred transition-all duration-200 shadow-lg shadow-orange-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Send Inquiry <Send size={18} />
                </button>
                <p className="text-gray-400 text-xs text-center">We respond within 24 business hours. No spam, ever.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
