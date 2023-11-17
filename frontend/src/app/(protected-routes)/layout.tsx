import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import Header from "../components/Header";

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
      <Header/>  
      {children}
    </>
  )
}