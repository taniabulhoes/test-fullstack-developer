"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { userTasks } from '../services/tasksApi';

const AppContext = createContext<ContextProps | undefined>(undefined);

export function AppWrapper({children} : {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<UserProps | null>(null);
  const [tasks, setTasks] = useState<TasksProps[] | null>(null);
  const [localStorageToken, setLocalStorageToken] = useState<string | null>(null);
  const [loadTasksError, setLoadTasksError] = useState<string | null>(null);
  

  const loadUserTasks = async (userId: number, token: string) => {
    const { data, error } = await userTasks(userId, token);
    if (data) {
      setTasks(data);
      return
    }
    if (error) {
      setLoadTasksError(error.error)
    }

  }
  
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');

    if (storedToken) {
      setLocalStorageToken(storedToken)
      const userFromToken = decodeToken(storedToken);
      setUser(userFromToken);

      const fetchContextTasksData = async () => {
        try {
          await loadUserTasks(userFromToken.id, storedToken);

        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };

      fetchContextTasksData();

    }
    
  }, []);

  const login = async (token: string) => {
    
    const userData = decodeToken(token);
    setUser(userData);
    
    await loadUserTasks(userData?.id, token);

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
      localStorageToken,
      loadTasksError
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