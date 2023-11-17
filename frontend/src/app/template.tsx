
import AuthNextProvider from "@/Providers/AuthNextProvider";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {

  return (
    <>
      <AuthNextProvider>
        {children}
      </AuthNextProvider>
    </>
  )
}