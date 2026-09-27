'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('farmconnect_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        // Fallback for old string-based role
        setUser({ role: saved, name: 'Guest', phone: '' });
      }
    }
    setMounted(true);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('farmconnect_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmconnect_user');
    // Cleanup old role if exists
    localStorage.removeItem('farmconnect_role');
  };

  if (!mounted) return null;

  return (
    <RoleContext.Provider value={{ user, role: user?.role, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
