
import Providers from "@/Providers/Provider";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {

  return (
    <>
    <Providers>
      {children}
    </Providers>

    </>
  )
}