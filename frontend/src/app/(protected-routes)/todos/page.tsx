'use client';

import { EmptyTodos } from "@/app/components/EmptyTodos";
import TodoCards from "@/app/components/TodoCards";
import { useTodos } from "@/app/hooks/useTodos";
import { MagnifyingGlass } from "phosphor-react";
import { useCallback, useEffect, useState } from "react";


export default function Todos(){

  const [searchText, setSearchText ] = useState<string>('')
  const {todos, fetchTodos, emptyList} = useTodos()

  const handleResearch = async () => {
    fetchTodos(searchText)
  }

  console.log(emptyList)

  useEffect(() => {
    fetchTodos()   
  }, [fetchTodos])

  return (
      <div className="">
        <p className="text-texttodo md:text-4xl sm:text-3xl md:w-[100%] w-[100%] font-bold sm:pt-4 mb-14 text-center">Suas atividades</p>
        <div className="bg-todocard w-full p-4 rounded-sm mb-12 leading-3 justify-center items-center">
            <div className="flex">
              <input 
                name="text" 
                type="text" 
                placeholder="Pesquise pelas suas atividades"
                onChange={(e) => setSearchText(e.target.value)} 
                value={searchText}
                className="bg-inputs w-full h-8 rounded-sm text-texttodo pl-2 text-sm"
              />
              <button 
                onClick={handleResearch}
                className="bg-detail rounded-sm px-2 leading-tight ml-2">
                  <MagnifyingGlass size={20} color="#fff"/>
              </button>
            </div>
          </div>
          {
            emptyList == 'empty' ? 
            (
              <EmptyTodos/>
            )
            :
            (
              <>
                {
                  todos.map((todo) => {
                    return (
                      <TodoCards key={todo.id} item={todo}/>
                    )
                  })
                }          
              </>
            )
          }
      </div>
  )
}

