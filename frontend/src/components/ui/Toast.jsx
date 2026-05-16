import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error:   <XCircle    size={18} className="text-red-500"   />,
  warning: <AlertCircle size={18} className="text-yellow-500" />,
};

const bg = {
  success: 'bg-green-50  border-green-200',
  error:   'bg-red-50    border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
};

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[260px] max-w-sm pointer-events-auto ${bg[t.type] || bg.success}`}
          >
            {icons[t.type] || icons.success}
            <span className="text-gray-800 text-sm font-medium flex-1">{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
