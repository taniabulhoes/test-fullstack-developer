
import AuthNextProvider from "@/Providers/AuthNextProvider";
import { ToastContextProvider } from "@/Providers/ToastProvider";
import { TodosContextProvider } from "@/Providers/TodosProvider";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {

  return (
    <>
      <AuthNextProvider>
        <ToastContextProvider>
            {children}
        </ToastContextProvider>          
      </AuthNextProvider>
    </>
  )
}