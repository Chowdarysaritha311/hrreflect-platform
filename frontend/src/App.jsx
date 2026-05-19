import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import JobSeekers from './pages/JobSeekers';
import Vacancies from './pages/Vacancies';

// Admin
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminJobs from './pages/admin/AdminJobs.jsx';
import AdminApplications from './pages/admin/AdminApplications.jsx';
import AdminContacts from './pages/admin/AdminContacts.jsx';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function PublicLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin  = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route path="/admin"             element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login"       element={<AdminLogin />} />
        <Route path="/admin/dashboard"   element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/jobs"        element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
        <Route path="/admin/applications"element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
        <Route path="/admin/contacts"    element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />
      </Routes>
    );
  }

  return (
    <PublicLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<PageWrapper><Home       /></PageWrapper>} />
          <Route path="/about"       element={<PageWrapper><About      /></PageWrapper>} />
          <Route path="/services"    element={<PageWrapper><Services   /></PageWrapper>} />
          <Route path="/industries"  element={<PageWrapper><Industries /></PageWrapper>} />
          <Route path="/vacancies"   element={<PageWrapper><Vacancies  /></PageWrapper>} />
          <Route path="/job-seekers" element={<PageWrapper><JobSeekers /></PageWrapper>} />
          <Route path="/contact"     element={<PageWrapper><Contact    /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </PublicLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
