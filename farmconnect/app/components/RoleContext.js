'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('farmconnect_role');
    if (saved) setRole(saved);
    setMounted(true);
  }, []);

  const login = (r) => {
    setRole(r);
    localStorage.setItem('farmconnect_role', r);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('farmconnect_role');
  };

  if (!mounted) return null;

  return (
    <RoleContext.Provider value={{ role, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
