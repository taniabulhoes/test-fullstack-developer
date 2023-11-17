import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function AuthGetApiServer(url: string){
  const BASE_URL = process.env.BASE_URL || "http://localhost:7777";

  const session = await getServerSession(nextAuthOptions)

  console.log("before: ", session?.tokenAccess);

  
  let res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Authorization: `bearer ${session?.tokenAccess}`,
    },
  }); 
  
  return await res.json();

}
