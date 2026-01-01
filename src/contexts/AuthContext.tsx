import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  clinicName: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [clinicName, setClinicName] = useState<string | null>(() => {
    return localStorage.getItem('clinicName');
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated login - accepts any credentials for demo
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    setIsAuthenticated(true);
    setClinicName(name + ' Clinic');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('clinicName', name + ' Clinic');
    
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setClinicName(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('clinicName');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, clinicName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
