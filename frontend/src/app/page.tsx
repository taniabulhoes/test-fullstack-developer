'use client'

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession()


  return (
   <div>
    <p>Olá</p>
      <button onClick={() => signOut()} className="text-red-600">
        Sign Out
      </button>  

   </div>
  )
}
