"use client";
import { createContext, useContext, useState } from 'react';

const AppContext = createContext<ContextProps | undefined>(undefined);

export function AppWrapper({children} : {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<UserProps | null>(null);

  const login = (userData: UserProps) => {
    // Implement your login logic here
    // Set the user data and JWT token in the context
    setUser(userData);
  };

  const logout = () => {
    // Implement your logout logic here
    // Clear user data and JWT token
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout
      // setUser: (newUser: User) => setUser(newUser)
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