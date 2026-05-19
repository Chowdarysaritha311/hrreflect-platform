import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, X, Save, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import { jobsApi } from '../../api/index.js';
import { useToast } from '../../hooks/useToast.js';
import ToastContainer from '../../components/ui/Toast.jsx';

const EMPTY = {
  title: '', company: '', location: 'Bangalore', experience: '', salary: '',
  skills: '', industry: 'IT', employmentType: 'Full Time', description: '',
  urgent: false, status: 'open',
};

export default function AdminJobs() {
  const { toasts, toast, removeToast } = useToast();
  const [jobs,    setJobs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editJob,  setEditJob]  = useState(null);
  const [form,     setForm]     = useState(EMPTY);

  const load = useCallback(async () => {
    try {
      const d = await jobsApi.getAll();
      setJobs(d.data);
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd  = () => { setForm(EMPTY); setEditJob(null); setShowForm(true); };
  const openEdit = (job) => {
    setForm({ ...job, skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '' });
    setEditJob(job);
    setShowForm(true);
  };

  const save = async () => {
    if (!form.title || !form.company || !form.experience) {
      return toast('Title, company and experience are required.', 'error');
    }
    setSaving(true);
    try {
      const payload = { ...form, skills: typeof form.skills === 'string' ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : form.skills };
      if (editJob) {
        await jobsApi.update(editJob._id, payload);
        toast('Job updated successfully.');
      } else {
        await jobsApi.create(payload);
        toast('Job created successfully.');
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (job) => {
    try {
      await jobsApi.toggle(job._id);
      toast(`Job ${job.status === 'open' ? 'closed' : 'opened'}.`);
      load();
    } catch (err) { toast(err.message, 'error'); }
  };

  const remove = async (job) => {
    if (!confirm(`Delete "${job.title}"?`)) return;
    try {
      await jobsApi.delete(job._id);
      toast('Job deleted.');
      load();
    } catch (err) { toast(err.message, 'error'); }
  };

  return (
    <AdminLayout>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="font-display font-bold text-2xl text-white">Job Vacancies</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {jobs.filter(j => j.status === 'open').length} active · {jobs.filter(j => j.status === 'closed').length} closed
            </p>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white font-semibold rounded-xl hover:bg-brand-darkred transition-colors shadow-lg shadow-orange-900/30">
            <Plus size={18} /> Add New Job
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-900 rounded-2xl animate-pulse border border-gray-800" />)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-16 text-center">
            <p className="text-gray-500">No jobs yet. Click "Add New Job" to create one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job, i) => (
              <motion.div key={job._id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 hover:border-gray-600 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-display font-bold text-white">{job.title}</h3>
                    {job.urgent && <span className="px-2 py-0.5 bg-red-900/50 text-red-400 text-xs font-bold rounded-full border border-red-800/50">🔥 Urgent</span>}
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${job.status === 'open' ? 'bg-green-900/40 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                      {job.status === 'open' ? '● Active' : '○ Closed'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{job.company} · {job.location} · {job.experience} · <span className="text-brand-red font-medium">{job.salary}</span></p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(job.skills || []).map(s => (
                      <span key={s} className="px-2 py-0.5 bg-gray-800 border border-gray-700 text-gray-400 text-xs rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggle(job)} title={job.status === 'open' ? 'Close job' : 'Open job'}
                    className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all">
                    {job.status === 'open' ? <ToggleRight size={18} className="text-green-400" /> : <ToggleLeft size={18} />}
                  </button>
                  <button onClick={() => openEdit(job)} title="Edit"
                    className="p-2 bg-blue-900/40 text-blue-400 hover:bg-blue-900/60 rounded-xl transition-all">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => remove(job)} title="Delete"
                    className="p-2 bg-red-900/40 text-red-400 hover:bg-red-900/60 rounded-xl transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Job Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm overflow-y-auto py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-xl shadow-2xl my-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl text-white">{editJob ? 'Edit Job' : 'Add New Vacancy'}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X size={22} /></button>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Job Title *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-xl outline-none focus:border-brand-red text-sm" />
                </div>
                {/* Company */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Company</label>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Confidential Client"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-xl outline-none focus:border-brand-red text-sm" />
                </div>
                {/* Industry + Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Industry</label>
                    <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-xl outline-none focus:border-brand-red text-sm">
                      {['IT','Healthcare','Finance','Manufacturing','BPO','Logistics','Corporate','Startups','Other'].map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Location</label>
                    {(() => {
                      const PRESET_LOCATIONS = ['Bangalore','Karnal','Remote','Hybrid','Pan India','Mumbai','Delhi','Hyderabad','Chennai','Pune'];
                      const isCustom = form.location && !PRESET_LOCATIONS.includes(form.location);
                      return (
                        <>
                          <select
                            value={isCustom ? 'custom' : form.location}
                            onChange={e => setForm({ ...form, location: e.target.value === 'custom' ? '' : e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-xl outline-none focus:border-brand-red text-sm mb-2">
                            {PRESET_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                            <option value="custom">✏️ Custom Location...</option>
                          </select>
                          {isCustom && (
                            <input
                              value={form.location}
                              onChange={e => setForm({ ...form, location: e.target.value })}
                              placeholder="Type custom city / location"
                              autoFocus
                              className="w-full px-4 py-2.5 bg-gray-800 border border-brand-red text-white rounded-xl outline-none focus:border-orange-400 text-sm"
                            />
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
                {/* Experience + Salary */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Experience *</label>
                    <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })}
                      placeholder="e.g. 3–5 years"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-xl outline-none focus:border-brand-red text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Salary Range</label>
                    <input value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })}
                      placeholder="e.g. 10–15 LPA"
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-xl outline-none focus:border-brand-red text-sm" />
                  </div>
                </div>
                {/* Employment Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Employment Type</label>
                  <select value={form.employmentType} onChange={e => setForm({ ...form, employmentType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 rounded-xl outline-none focus:border-brand-red text-sm">
                    {['Full Time','Part Time','Contract','Internship','Remote'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                {/* Skills */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Skills (comma separated)</label>
                  <input value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })}
                    placeholder="e.g. React, Node.js, AWS"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-xl outline-none focus:border-brand-red text-sm" />
                </div>
                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                    Job Description
                    <span className="ml-2 text-gray-500 font-normal">(Visible to candidates on the website)</span>
                  </label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder={"Write the full job description here...\n\nExample:\nKey Responsibilities:\n• Manage employee lifecycle\n• Handle HR operations\n\nRequirements:\n• 3+ years experience\n• Strong communication skills"}
                    rows={12}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl outline-none focus:border-brand-red text-sm resize-y leading-relaxed" />
                  <p className="text-xs text-gray-500 mt-1">💡 Tip: Use bullet points (•) and sections like Key Responsibilities, Requirements etc. for better readability.</p>
                </div>
                {/* Toggles */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.urgent} onChange={e => setForm({ ...form, urgent: e.target.checked })}
                      className="w-4 h-4 accent-orange-500 rounded" />
                    <span className="text-gray-300 text-sm">🔥 Mark Urgent</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.status === 'open'} onChange={e => setForm({ ...form, status: e.target.checked ? 'open' : 'closed' })}
                      className="w-4 h-4 accent-orange-500 rounded" />
                    <span className="text-gray-300 text-sm">● Visible on Site</span>
                  </label>
                </div>
                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowForm(false)}
                    className="flex-1 py-3 bg-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button onClick={save} disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-darkred transition-colors disabled:opacity-60">
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {editJob ? 'Save Changes' : 'Add Vacancy'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
