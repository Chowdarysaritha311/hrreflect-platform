import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, X, Loader2, Phone, Mail } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import { contactsApi } from '../../api/index.js';
import { useToast } from '../../hooks/useToast.js';
import ToastContainer from '../../components/ui/Toast.jsx';

const ENQ_STATUSES = ['New', 'In Progress', 'Closed'];
const ENQ_COLORS   = {
  New:          'bg-orange-900/40 text-orange-400 border-orange-800/40',
  'In Progress':'bg-blue-900/40 text-blue-400 border-blue-800/40',
  Closed:       'bg-gray-700/60 text-gray-400 border-gray-600/40',
};

export default function AdminContacts() {
  const { toasts, toast, removeToast } = useToast();
  const [contacts,  setContacts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [viewEnq,   setViewEnq]   = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      const d = await contactsApi.getAll(params);
      setContacts(d.data);
    } catch (err) { toast(err.message, 'error'); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, status) => {
    try {
      const updated = await contactsApi.updateStatus(id, status);
      setContacts(prev => prev.map(c => c._id === id ? updated.data : c));
      if (viewEnq?._id === id) setViewEnq(updated.data);
      toast('Status updated.');
    } catch (err) { toast(err.message, 'error'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    try {
      await contactsApi.delete(id);
      toast('Enquiry deleted.');
      if (viewEnq?._id === id) setViewEnq(null);
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
            <h1 className="font-display font-bold text-2xl text-white mb-1">Contact Enquiries</h1>
            <p className="text-gray-500 text-sm">{contacts.length} enquiries</p>
          </div>
          {/* Status filters */}
          <div className="flex gap-2">
            {['All', ...ENQ_STATUSES].map(s => (
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

        {/* List */}
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 size={28} className="animate-spin text-brand-red" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-20 text-center">
            <p className="text-gray-500">No enquiries yet.</p>
            <p className="text-gray-600 text-sm mt-1">When someone fills the Contact form, it appears here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((ct, i) => (
              <motion.div key={ct._id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className={`bg-gray-900 border rounded-2xl p-5 hover:border-gray-600 transition-all ${
                  ct.status === 'New' || !ct.status ? 'border-orange-900/60' : 'border-gray-800'
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-bold text-white">{ct.name}</h3>
                      {ct.company && <><span className="text-gray-600">·</span><span className="text-gray-400 text-sm">{ct.company}</span></>}
                      {(ct.status === 'New' || !ct.status) && (
                        <span className="px-2 py-0.5 bg-orange-900/40 text-orange-400 border border-orange-800/40 text-xs font-bold rounded-full">🔔 New</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
                      <a href={`mailto:${ct.email}`} className="hover:text-brand-red transition-colors">{ct.email}</a>
                      {ct.phone && <a href={`tel:${ct.phone}`} className="hover:text-brand-red transition-colors">{ct.phone}</a>}
                      {ct.service && <span className="text-gray-400 font-medium">{ct.service}</span>}
                    </div>
                    {ct.message && (
                      <p className="text-gray-600 text-sm italic line-clamp-1">"{ct.message}"</p>
                    )}
                    <p className="text-gray-600 text-xs mt-1">
                      {ct.createdAt ? new Date(ct.createdAt).toLocaleString('en-IN') : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <select value={ct.status || 'New'} onChange={e => updateStatus(ct._id, e.target.value)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold outline-none border cursor-pointer bg-transparent ${ENQ_COLORS[ct.status || 'New']}`}>
                      {ENQ_STATUSES.map(s => <option key={s} style={{ background: '#111' }}>{s}</option>)}
                    </select>
                    <button onClick={() => setViewEnq(ct)} title="View"
                      className="p-2 bg-blue-900/40 text-blue-400 hover:bg-blue-900/60 rounded-xl transition-colors">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => remove(ct._id)} title="Delete"
                      className="p-2 bg-red-900/40 text-red-400 hover:bg-red-900/60 rounded-xl transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* View Enquiry Modal */}
      <AnimatePresence>
        {viewEnq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm overflow-y-auto py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl my-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-xl text-white">Enquiry Details</h3>
                <button onClick={() => setViewEnq(null)} className="text-gray-500 hover:text-white"><X size={22} /></button>
              </div>

              <div className="space-y-2 mb-5">
                {[
                  ['Name',      viewEnq.name],
                  ['Company',   viewEnq.company],
                  ['Email',     viewEnq.email],
                  ['Phone',     viewEnq.phone],
                  ['Service',   viewEnq.service],
                  ['Positions', viewEnq.positions],
                  ['Submitted', viewEnq.createdAt ? new Date(viewEnq.createdAt).toLocaleString('en-IN') : ''],
                ].filter(([, v]) => v).map(([l, v]) => (
                  <div key={l} className="flex gap-3 px-4 py-2.5 bg-gray-800 rounded-xl">
                    <span className="text-gray-500 text-xs font-medium w-24 flex-shrink-0 pt-0.5">{l}</span>
                    <span className="text-gray-200 text-sm font-medium">{v}</span>
                  </div>
                ))}
                {viewEnq.message && (
                  <div className="px-4 py-3 bg-gray-800 rounded-xl">
                    <span className="text-gray-500 text-xs font-medium block mb-1.5">Message</span>
                    <p className="text-gray-300 text-sm leading-relaxed">{viewEnq.message}</p>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 mb-2.5">Update Status</p>
                <div className="flex gap-2">
                  {ENQ_STATUSES.map(s => (
                    <button key={s} onClick={() => updateStatus(viewEnq._id, s)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xl border-2 transition-all ${
                        (viewEnq.status || 'New') === s
                          ? 'border-brand-red bg-brand-red text-white'
                          : 'border-gray-700 text-gray-400 hover:border-brand-red hover:text-brand-red'
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a href={`mailto:${viewEnq.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-900/40 text-blue-400 hover:bg-blue-900/60 font-semibold rounded-xl transition-colors text-sm">
                  <Mail size={16} /> Email
                </a>
                {viewEnq.phone && (
                  <a href={`tel:${viewEnq.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-900/40 text-green-400 hover:bg-green-900/60 font-semibold rounded-xl transition-colors text-sm">
                    <Phone size={16} /> Call
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
