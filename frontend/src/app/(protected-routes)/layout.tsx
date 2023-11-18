import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "../components/Header";
import { TodosContextProvider } from "@/Providers/TodosProvider";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import SubHeader from "../components/SubHead";

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
      <SubHeader/>
      <div className="flex flex-col justify-center items-center">
        <div className="
          md:max-w-[60%]
          md:min-w-min
          sm:w-[90%]
          sm:mx-8
          rounded-sm
          p-8
          w-[90%]
          my-10">

          <TodosContextProvider>
            {children}
          </TodosContextProvider>                     
        </div>
      </div>
    </>
  )
}