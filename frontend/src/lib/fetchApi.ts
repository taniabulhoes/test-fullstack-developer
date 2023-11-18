import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function AuthGetApiServer(url: string){
  const BASE_URL = process.env.BASE_URL || "https://taniatestpi.codens.com.br";

  const session = await getServerSession(nextAuthOptions)
  
  let res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Authorization: `bearer ${session?.tokenAccess}`,
    },
  }); 
  
  return await res.json();

}
