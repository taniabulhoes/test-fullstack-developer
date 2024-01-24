"use client";
import { createContext, useContext, useState } from 'react';

type Context = {
  user: string
  setUser: (user: string) => void
}

const defaultContext = {
  user: 'Stefano',
  setUser: () => {}
}

const AppContext = createContext<Context>(defaultContext);

export function AppWrapper({children} : {
  children: React.ReactNode;
}) {
  let [user, setUser] = useState('STEFANO');

  return (
    <AppContext.Provider value={{
      user,
      setUser: (newUser: string) => setUser(newUser)
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}