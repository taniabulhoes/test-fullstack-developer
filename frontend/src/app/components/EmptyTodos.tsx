'use client'

import Link from "next/link"

export function EmptyTodos(){
  return (
    <>
      <div className="flex flex-col bg-container text-center p-10 rounded-sm">
         <p className="text-detail text-[25]"> Você ainda não cadastrou nenhuma ToDo. Deseja adicionar?    
          </p>
        <div className="mt-6">
          <Link href="/todos/create" className="text-texttodo bg-detail p-2">Adicionar</Link>
        </div>
      </div>
    </>
  )
} 