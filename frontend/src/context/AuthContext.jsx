import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api.js';

const AuthContext = createContext(null);
const STORAGE_KEY = 'failure-academy-auth';

const readStoredUser = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Failed to parse stored auth state', error);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.token) {
      return;
    }

    let ignore = false;
    const hydrateProfile = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/auth/me');
        if (!ignore) {
          const hydratedUser = { ...user, profile: response.data };
          setUser(hydratedUser);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(hydratedUser));
        }
      } catch (error) {
        console.warn('Token may be invalid, forcing logout', error);
        toast.error('Session expired. Please login again.');
        logout(true);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateProfile();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = ({ token, role, name, email }, { silent = false } = {}) => {
    const payload = { token, role, name, email };
    setUser(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    if (!silent) {
      toast.success(`Welcome back${name ? `, ${name}` : ''}!`);
    }
  };

  const register = (payload) => {
    login(payload, { silent: true });
    toast.success('Account created successfully.');
  };

  const logout = (silent = false) => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    if (!silent) {
      toast.success('Signed out successfully.');
    }
  };

  const value = useMemo(
    () => ({
      user,
      token: user?.token ?? null,
      role: user?.role ?? null,
      isAuthenticated: Boolean(user?.token),
      isLoading,
      login,
      register,
      logout,
      setUserState: setUser,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
