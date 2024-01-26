"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext<ContextProps | undefined>(undefined);

export function AppWrapper({children} : {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      const userFromToken = decodeToken(storedToken);
      setUser(userFromToken);
    }
  }, []);


  const login = (token: string) => {
    const userData = decodeToken(token);
    setUser(userData);

    localStorage.setItem('jwtToken', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default function useAuth(): ContextProps {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

const decodeToken = (token: string): any => {
  const {id, name, email} = JSON.parse(atob(token.split('.')[1]));

  return {
    id,
    name,
    email
  };
};