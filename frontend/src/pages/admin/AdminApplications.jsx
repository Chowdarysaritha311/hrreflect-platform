import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Download, X, Trash2, Loader2, ChevronLeft, ChevronRight as ChevRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import { applicationsApi } from '../../api/index.js';
import { useToast } from '../../hooks/useToast.js';
import ToastContainer from '../../components/ui/Toast.jsx';

const STATUSES = ['All', 'Applied', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Hired'];
const STATUS_COLORS = {
  Applied:              'bg-blue-900/40 text-blue-400 border-blue-800/40',
  Shortlisted:          'bg-green-900/40 text-green-400 border-green-800/40',
  'Interview Scheduled':'bg-purple-900/40 text-purple-400 border-purple-800/40',
  Rejected:             'bg-red-900/40 text-red-400 border-red-800/40',
  Hired:                'bg-emerald-900/40 text-emerald-400 border-emerald-800/40',
};

export default function AdminApplications() {
  const { toasts, toast, removeToast } = useToast();
  const [apps,       setApps]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [viewApp,    setViewApp]    = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'application' | 'jobseeker'
  const [search,     setSearch]     = useState('');
  const [page,       setPage]       = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const LIMIT = 15;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: LIMIT };
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search.trim()) params.search = search.trim();
      if (typeFilter !== 'all') params.type = typeFilter;
      const d = await applicationsApi.getAll(params);
      setApps(d.data);
      setPagination(d.pagination);
    } catch (err) { toast(err.message, 'error'); }
    finally { setLoading(false); }
  }, [page, statusFilter, search, typeFilter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [statusFilter, search, typeFilter]);

  const updateStatus = async (id, status) => {
    try {
      const updated = await applicationsApi.updateStatus(id, status);
      setApps(prev => prev.map(a => a._id === id ? updated.data : a));
      if (viewApp?._id === id) setViewApp(updated.data);
      toast('Status updated.');
    } catch (err) { toast(err.message, 'error'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this application?')) return;
    try {
      await applicationsApi.delete(id);
      toast('Application deleted.');
      load();
    } catch (err) { toast(err.message, 'error'); }
  };

  return (
    <AdminLayout>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Applications</h1>
          <p className="text-gray-500 text-sm">{pagination.total} total applications</p>
        </div>

        {/* Type Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'all',         label: 'All Submissions' },
            { key: 'application', label: '📋 Job Applications' },
            { key: 'jobseeker',   label: '👤 Job Seeker Profiles' },
          ].map(t => (
            <button key={t.key} onClick={() => setTypeFilter(t.key)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all ${
                typeFilter === t.key
                  ? 'bg-brand-red border-brand-red text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-brand-red hover:text-white'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 min-w-[220px] bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5">
            <Search size={16} className="text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, role, skills…"
              className="bg-transparent text-sm outline-none flex-1 text-gray-300 placeholder-gray-600" />
            {search && <button onClick={() => setSearch('')} className="text-gray-600 hover:text-gray-400"><X size={14} /></button>}
          </div>
          {/* Status */}
          <div className="flex gap-2 flex-wrap">
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  statusFilter === s
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <Loader2 size={28} className="animate-spin text-brand-red" />
            </div>
          ) : apps.length === 0 ? (
            <div className="p-16 text-center text-gray-500">No applications found.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 border-b border-gray-700">
                    <tr>
                      {['Candidate', 'Applied For', 'Contact', 'Experience', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {apps.map(app => (
                      <tr key={app._id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase flex-shrink-0">
                              {app.name?.[0] || '?'}
                            </div>
                            <div>
                              <div className="font-semibold text-white text-sm">{app.name}</div>
                              <div className="text-gray-500 text-xs">{app.location || '—'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-300 text-sm max-w-[160px]">
                          <div className="truncate">{app.jobTitle || 'General'}</div>
                          <div className="mt-0.5">
                            {app.type === 'jobseeker'
                              ? <span className="text-xs px-1.5 py-0.5 bg-purple-900/40 text-purple-400 rounded-md">Job Seeker</span>
                              : <span className="text-gray-600 text-xs truncate">{app.company || ''}</span>
                            }
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="text-gray-300 text-sm font-medium">{app.phone}</div>
                          <div className="text-gray-500 text-xs">{app.email}</div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-400 text-sm whitespace-nowrap">{app.experience}</td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                          {new Date(app.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-4 py-3.5">
                          <select
                            value={app.status}
                            onChange={e => updateStatus(app._id, e.target.value)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold outline-none border cursor-pointer bg-transparent ${STATUS_COLORS[app.status] || STATUS_COLORS.Applied}`}
                          >
                            {STATUSES.filter(s => s !== 'All').map(s => <option key={s} style={{ background: '#111' }}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => setViewApp(app)} title="View"
                              className="p-1.5 bg-blue-900/40 text-blue-400 hover:bg-blue-900/60 rounded-lg transition-colors">
                              <Eye size={14} />
                            </button>
                            {app.resumeFile?.filename && (
                              <a href={applicationsApi.downloadResume(app._id)} download title="Download Resume"
                                className="p-1.5 bg-green-900/40 text-green-400 hover:bg-green-900/60 rounded-lg transition-colors">
                                <Download size={14} />
                              </a>
                            )}
                            <button onClick={() => remove(app._id)} title="Delete"
                              className="p-1.5 bg-red-900/40 text-red-400 hover:bg-red-900/60 rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800">
                  <p className="text-gray-500 text-xs">Page {page} of {pagination.pages}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
                      className="p-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => setPage(p => p + 1)} disabled={page >= pagination.pages}
                      className="p-2 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors">
                      <ChevRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* View Application Modal */}
      <AnimatePresence>
        {viewApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm overflow-y-auto py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl my-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-xl text-white">Application Details</h3>
                <button onClick={() => setViewApp(null)} className="text-gray-500 hover:text-white"><X size={22} /></button>
              </div>

              {/* Type badge */}
              <div className="mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${viewApp.type === 'jobseeker' ? 'bg-purple-900/50 text-purple-300 border border-purple-700' : 'bg-blue-900/50 text-blue-300 border border-blue-700'}`}>
                  {viewApp.type === 'jobseeker' ? '👤 Job Seeker Profile' : '📋 Job Application'}
                </span>
              </div>
              <div className="space-y-2 mb-5">
                {(viewApp.type === 'jobseeker' ? [
                  ['Full Name',     viewApp.name],
                  ['Email',         viewApp.email],
                  ['Phone',         viewApp.phone],
                  ['Current City',  viewApp.location],
                  ['Experience',    viewApp.experience],
                  ['Current Role',  viewApp.currentRole],
                  ['Desired Role',  viewApp.desiredRole || viewApp.jobTitle],
                  ['Notice Period', viewApp.noticePeriod],
                  ['Key Skills',    viewApp.skills],
                  ['Submitted On',  viewApp.createdAt ? new Date(viewApp.createdAt).toLocaleDateString('en-IN') : ''],
                ] : [
                  ['Full Name',   viewApp.name],
                  ['Email',       viewApp.email],
                  ['Phone',       viewApp.phone],
                  ['Location',    viewApp.location],
                  ['Applied For', viewApp.jobTitle],
                  ['Company',     viewApp.company],
                  ['Experience',  viewApp.experience],
                  ['Key Skills',  viewApp.skills],
                  ['Applied On',  viewApp.createdAt ? new Date(viewApp.createdAt).toLocaleDateString('en-IN') : ''],
                ]).filter(([, v]) => v).map(([l, v]) => (
                  <div key={l} className="flex gap-3 px-4 py-2.5 bg-gray-800 rounded-xl">
                    <span className="text-gray-500 text-xs font-medium w-28 flex-shrink-0 pt-0.5">{l}</span>
                    <span className="text-gray-200 text-sm font-medium">{v}</span>
                  </div>
                ))}
                {(viewApp.coverLetter || viewApp.message) && (
                  <div className="px-4 py-3 bg-gray-800 rounded-xl">
                    <span className="text-gray-500 text-xs font-medium block mb-1.5">{viewApp.type === 'jobseeker' ? 'Additional Message' : 'Cover Letter'}</span>
                    <p className="text-gray-300 text-sm leading-relaxed">{viewApp.coverLetter || viewApp.message}</p>
                  </div>
                )}
              </div>

              {/* Status update */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 mb-2.5">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.filter(s => s !== 'All').map(s => (
                    <button key={s} onClick={() => updateStatus(viewApp._id, s)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border-2 transition-all ${
                        viewApp.status === s
                          ? 'border-brand-red bg-brand-red text-white'
                          : 'border-gray-700 text-gray-400 hover:border-brand-red hover:text-brand-red'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resume download */}
              {viewApp.resumeFile?.filename && (
                <a href={applicationsApi.downloadResume(viewApp._id)} download
                  className="w-full flex items-center justify-center gap-2 py-3 bg-green-900/40 text-green-400 hover:bg-green-900/60 font-semibold rounded-xl transition-colors text-sm">
                  <Download size={16} /> Download Resume
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
