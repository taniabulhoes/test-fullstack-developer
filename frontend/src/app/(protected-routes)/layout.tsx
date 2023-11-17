import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Logout from "../components/Logout";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

interface PrivateLayoutProps {
 children: ReactNode 
}

export default async function PrivateLayout({children}: PrivateLayoutProps){
  const session = await getServerSession(nextAuthOptions)


  if(!session) {
    redirect('/signin')
  } 

  return (
    <>
      <p>Olá {session && session?.user.name}</p>
      <Logout/>
      {children}
    </>
  )
}