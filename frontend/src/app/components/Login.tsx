'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useToast } from "../hooks/useToast";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

export default function Login(props: Props){
  const router = useRouter();
  const {notifyMe} = useToast()

  const user = useRef("");
  const password = useRef("");

  const handleSigIn = async () => {

    const res = await signIn("credentials", {
      username: user.current,
      password: password.current,
      redirect: false,
      callbackUrl: 'http://localhost:3000/todo'
    });      

    if (!res?.error) {
      router.push(props.callbackUrl ?? "http://localhost:3000/todos");
      return;
    }    

    
    if(!user.current || !password.current){
      notifyMe({message: 'Não é possível logar com usuário e senha vazios', styleClass: 'wrong', icon: '✖', position: 'top-center'})
      return 
    }

    if(res?.error){
      notifyMe({message: 'Usuário ou senha inválidos', styleClass: 'wrong', icon: '✖', position: 'top-center'})
      return 
    }
  }


  return (
    <div className="md:p-12 sm:p-8 rounded-sm">
      <div>
        <input 
          name="email" type="text" placeholder="E-mail"
          className="w-full h-11 pl-4 text-sm text-texttodo bg-inputs outline-none border-none rounded-sm mb-4"
          onChange={(e) => (user.current = e.target.value)}
        />
        <input 
          name="password" type="password" placeholder="Senha"
          className="w-full h-11 pl-4 text-sm text-texttodo bg-inputs outline-none border-none rounded-sm mb-2"
          onChange={(e) => (password.current = e.target.value)}
        />
        <div className="text-texttodo mb-6 text-sm">
          <Link href={'/register'} prefetch={false}>Esqueci minha senha</Link>
        </div>
        <button 
          type="button" 
          onClick={handleSigIn}
          className="w-full h-11 bg-detail rounded-sm"
        >
          <p className="text-texttodo font-bold text-sm">ACESSAR</p>
        </button>
        <div>
          <p className="text-texttodo text-center mt-4 text-sm">Não tem uma conta? <span className="text-detail font-bold"><Link href={`/register`}>Registre-se</Link></span></p>
        </div>
      </div>
  </div>    
  )  
}