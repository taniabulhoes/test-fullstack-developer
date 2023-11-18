'use client'

import { signOut } from "next-auth/react"
import router from "next/router";
import { SignOut } from "phosphor-react";

export default function Logout(){

  const test = async () => {
    await signOut({ callbackUrl: "/signin" }).then(() => {
  });

  }

  return (
    <>
      <button onClick={() => test()} className="text-red-600">
        <SignOut size={30} color="#00a873"/>
      </button>    
    </>
  )
}