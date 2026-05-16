import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim())    return setError('Please enter your admin email.');
    if (!password.trim()) return setError('Please enter your password.');

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-brand-red opacity-10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-3 inline-flex items-center justify-center">
                <img
                  src="/hrr-logo.jpg"
                  alt="HRReflect"
                  className="h-12 w-auto object-contain"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span style="font-family:Syne,sans-serif;font-weight:800;font-size:22px;color:#F97316">HR<span style="color:#111827">Reflect</span></span>';
                  }}
                />
              </div>
            </div>
            <h1 className="font-display font-bold text-2xl text-gray-900">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-1">HRReflect Management Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="info@hrreflect.com"
                autoFocus
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl"
              >
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-darkred transition-colors shadow-lg shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Signing in…</>
              ) : (
                'Sign in to Admin Panel'
              )}
            </button>
          </form>

          <p className="text-gray-400 text-xs text-center mt-6">
            Only authorised HRReflect team members can access this panel.
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          © {new Date().getFullYear()} HRReflect · All rights reserved
        </p>
      </motion.div>
    </main>
  );
}
