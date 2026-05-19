import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/index.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin,   setAdmin]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate existing token on mount
  useEffect(() => {
    const verify = async () => {
      if (!authApi.isLoggedIn()) { setLoading(false); return; }
      try {
        const data = await authApi.me();
        setAdmin(data.admin);
      } catch {
        // Token invalid — clear it
        authApi.logout();
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    setAdmin(data.admin);
    return data;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthed: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
