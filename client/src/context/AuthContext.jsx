import { createContext, useContext, useState, useEffect } from 'react';

import { getCurrentUser } from '@/services/auth.service.js';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
  async function restoreUser() {
    try {
      const response = await getCurrentUser();

      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  restoreUser();
}, []);
  const value = {
  user,
  setUser,
  loading,
};
console.log('Auth Restore:', { user, loading });
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}