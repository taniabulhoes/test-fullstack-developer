
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../api/auth/[...nextauth]/route"
import Logout from "./Logout"

export default async function Header(){
  const session = await getServerSession(nextAuthOptions)

  return (
  <>
      <p>Olá {session && session?.user.name}</p>
      <Logout/>          
  </>
 ) 
}