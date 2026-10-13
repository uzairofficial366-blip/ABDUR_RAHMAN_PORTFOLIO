import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/admin/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success && data.admin) {
          setAdmin(data.admin);
        } else {
          // Token invalid or expired
          logout();
        }
      } catch (err) {
        console.error('Failed to verify session:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = (newToken, adminData) => {
    localStorage.setItem('admin_token', newToken);
    setToken(newToken);
    setAdmin(adminData);
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (err) {
      // Ignore network errors on logout
    }
    localStorage.removeItem('admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

