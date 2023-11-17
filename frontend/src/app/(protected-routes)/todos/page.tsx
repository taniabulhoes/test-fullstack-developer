"use client";

import ApiClient from "@/lib/apiClient";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type todosProps = {
  id: string;
  subject: string;
  expected_date: string 
}

export default function Todos(){
  const [todos, setTodos] = useState<todosProps[]>([])

const teste = useSession()

console.log(teste)

  const fetchPost = async () => {

    const response = await ApiClient.get('/todos', {
      params: {
        q: '',
        page: 1
      }
    });

    const {todo} = response.data

    setTodos(todo)
  };


  useEffect(() => {
    fetchPost()    
  }, [])

  return (
    <>
      {
        todos.map((todo) => {
          return (
            <p key={todo.id}>{todo.subject}</p>
          )
        })
      }
    </>
  )
}

