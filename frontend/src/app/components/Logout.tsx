'use client'

import { signOut } from "next-auth/react"
import router from "next/router";

export default function Logout(){

  const test = async () => {
    await signOut({ callbackUrl: "/signin" }).then(() => {
  });

  }

  return (
    <>
      <button onClick={() => test()} className="text-red-600">
        Sign Out
      </button>    
    </>
  )
}