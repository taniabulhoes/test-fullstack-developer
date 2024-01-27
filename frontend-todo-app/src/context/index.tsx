"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { userTasks } from '../services/tasksApi.js';

const AppContext = createContext<ContextProps | undefined>(undefined);

export function AppWrapper({children} : {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<UserProps | null>(null);
  const [tasks, setTasks] = useState<TasksProps[] | null>(null);
  const [localStorageToken, setLocalStorageToken] = useState<string | null>(null);

  const loadUserTasks = async (userId: number, token: string) => {
    if(userId && token) {
      const { data } = await userTasks(userId, token);
      return data
    }
  }
  
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');

    if (storedToken) {
      setLocalStorageToken(storedToken)
      const userFromToken = decodeToken(storedToken);
      setUser(userFromToken);

      const fetchContextTasksData = async () => {
        const returnedTasks = await loadUserTasks(userFromToken.id, storedToken)
        setTasks(returnedTasks);
      };

      fetchContextTasksData();

    }
    
  }, []);

  const login = async (token: string) => {
    
    const userData = decodeToken(token);
    setUser(userData);
    
    const returnedTasks = await loadUserTasks(userData?.id, token);

    setTasks(returnedTasks)

    localStorage.setItem('jwtToken', token);
    setLocalStorageToken(token)
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      tasks,
      localStorageToken
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

const decodeToken = (token: string): UserProps => {
  const {id, name, email} = JSON.parse(atob(token.split('.')[1]));

  return {
    id,
    name,
    email
  };
};