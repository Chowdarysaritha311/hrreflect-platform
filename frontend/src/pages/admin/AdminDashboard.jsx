import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Users, MessageSquare, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import { adminApi } from '../../api/index.js';

const STATUS_COLORS = {
  Applied:              'bg-blue-900/40 text-blue-400',
  Shortlisted:          'bg-green-900/40 text-green-400',
  'Interview Scheduled':'bg-purple-900/40 text-purple-400',
  Rejected:             'bg-red-900/40 text-red-400',
  Hired:                'bg-emerald-900/40 text-emerald-400',
};

export default function AdminDashboard() {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats()
      .then(d => setStats(d.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Active Jobs',      value: stats.jobs.active,        sub: `${stats.jobs.total} total`,              icon: Briefcase,    color: 'from-orange-600 to-orange-500', to: '/admin/jobs'         },
    { label: 'Total Applications', value: stats.applications.total, sub: `${stats.applications.new} new`,        icon: Users,        color: 'from-blue-700 to-blue-600',     to: '/admin/applications' },
    { label: 'Hired',            value: stats.applications.hired, sub: 'successfully placed',                    icon: TrendingUp,   color: 'from-emerald-700 to-emerald-600', to: '/admin/applications' },
    { label: 'New Enquiries',    value: stats.contacts.new,       sub: `${stats.contacts.total} total`,          icon: MessageSquare, color: 'from-purple-700 to-purple-600', to: '/admin/contacts'     },
  ] : [];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back — here's your recruitment overview.</p>
        </div>

        {/* Stats cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl h-32 animate-pulse border border-gray-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link to={c.to}
                    className="block bg-gray-900 rounded-2xl p-5 border border-gray-800 hover:border-gray-600 transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="font-display font-bold text-3xl text-white mb-0.5">{c.value}</div>
                    <div className="text-gray-400 text-xs font-medium">{c.sub}</div>
                    <div className="text-white text-sm font-semibold mt-1 flex items-center gap-1 group-hover:text-brand-red transition-colors">
                      {c.label} <ChevronRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Recent Applications */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-white">Recent Applications</h2>
            <Link to="/admin/applications" className="text-brand-red text-sm font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : stats?.recentApplications?.length > 0 ? (
            <div className="space-y-2">
              {stats.recentApplications.map(app => (
                <div key={app._id} className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
                      {app.name?.[0] || '?'}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{app.name}</p>
                      <p className="text-gray-400 text-xs">{app.jobTitle || 'General Application'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <Clock size={12} />
                      {new Date(app.createdAt).toLocaleDateString('en-IN')}
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${STATUS_COLORS[app.status] || STATUS_COLORS.Applied}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No applications yet.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
