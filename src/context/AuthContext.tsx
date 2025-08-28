import  { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null represents the initial loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      //const token = localStorage.getItem('token');
      const user = JSON.parse(sessionStorage.getItem("user") || '{}')
      setIsAuthenticated(user); 
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};