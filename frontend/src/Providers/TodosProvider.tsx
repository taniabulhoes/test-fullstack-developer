"use client";

import ApiClient from "@/lib/ApiClient";
import { format } from "date-fns";
import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useEffect, useMemo, useState } from "react";


type TodosContextProviderProps = {
  children: ReactNode
}

export type todosProps = {
  id: string;
  subject: string;
  expected_date: string
  checked?: number 
}

export type TodosContextDataProps = {
  fetchTodos: (searchText?: string) => Promise<void>,
  todos: todosProps[],
  setSearch: Dispatch<SetStateAction<string>>,
  search: string,
  setActivityToBeDeleted: Dispatch<SetStateAction<string>>,
  activityToBeDeleted: string,
  removeTodo: (id: string) => void
  swithTodo: (id: string) => void
}

export const TodosContext = createContext({} as TodosContextDataProps)

export function TodosContextProvider({children}: TodosContextProviderProps){
  const [todos, setTodos] = useState<todosProps[]>([])
  const [search, setSearch] = useState<string>('')
  const [activityToBeDeleted, setActivityToBeDeleted] = useState<string>('')

  const fetchTodos = useCallback(
    async (searchText?: string) => {
      const response = await ApiClient.get('/todos', {
        params: {
          q: searchText || ''
        }
      });
  
      const {todo} = response.data
  
      setTodos(todo) 
    },
    []
  );

  const swithTodo = useCallback(
    async (id: string) => {
      await ApiClient.patch(`/todos/conclude/${id}`)
       return null;
    },
    []
  );

  const removeTodo = useCallback(
    async (id: string) => {
      await ApiClient.delete(`/todos/${id}`)
      fetchTodos()
      return null;
    },
    [fetchTodos]
  );

  useEffect(() => {
    fetchTodos()    
  }, [fetchTodos])
  
  const value = useMemo(
    () => ({
      fetchTodos,
      todos,
      setSearch,
      search,
      setActivityToBeDeleted,
      activityToBeDeleted,
      removeTodo,
      swithTodo
    }),
    [
      fetchTodos,
      todos,
      setSearch,
      search,
      setActivityToBeDeleted,
      activityToBeDeleted,
      removeTodo,
      swithTodo
    ]
  );

  return (
    <TodosContext.Provider value={value}>
      {children}

    </TodosContext.Provider>
  )
  
}

