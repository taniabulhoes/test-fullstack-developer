"use client";

import TodoCards from "@/app/components/TodoCards";
import { useToast } from "@/app/hooks/useToast";
import { useTodos } from "@/app/hooks/useTodos";
import { MagnifyingGlass } from "phosphor-react";

export default function Todos(){
  const {todos, fetchTodos, setSearch, search} = useTodos()
  const handleResearch = async () => {
    fetchTodos()
  }

  return (
      <div className="">
        <>
          <div className="bg-todocard w-full p-4 rounded-sm mb-12 leading-3 justify-center items-center">
            <div className="flex">
              <input 
                name="text" 
                type="text" 
                placeholder="Pesquise pelas suas atividades"
                onChange={(e) => setSearch(e.target.value)} 
                value={search}
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
            todos.map((todo) => {
              return (
                <TodoCards key={todo.id} item={todo}/>
              )
            })
          }          
        </>
      </div>
  )
}

