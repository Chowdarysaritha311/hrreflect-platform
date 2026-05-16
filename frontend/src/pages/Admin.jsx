// This file is kept for backwards compatibility.
// Admin functionality has moved to /admin/login and /admin/dashboard
import { Navigate } from 'react-router-dom';
export default function Admin() {
  return <Navigate to="/admin/login" replace />;
}
