'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

export default function Login(props: Props){
  const router = useRouter();

  const teste = async () => {
    const res = await signIn("credentials", {
      username: 'nailson',
      password: 'israel',
      redirect: false,
    });      

    if (!res?.error) {
      router.push(props.callbackUrl ?? "http://localhost:3000/todos");
    }    
  }


  return (
    <div className="p-8 rounded-sm">
      <div>
        <input 
          name="email" type="text" placeholder="E-mail"
          className="w-full h-11 pl-4 text-sm text-texttodo bg-inputs outline-none border-none rounded-sm mb-4"
        />
        <input 
          name="password" type="password" placeholder="Senha"
          className="w-full h-11 pl-4 text-sm text-texttodo bg-inputs outline-none border-none rounded-sm mb-2"
        />
        <div className="text-texttodo mb-6">
          <Link href={'.'} prefetch={false}>Esqueci minha senha</Link>
        </div>
        <button 
          type="button" onClick={teste}
          className="w-full h-11 bg-detail rounded-sm"
        >
          <p className="text-texttodo font-bold text-sm">ACESSAR</p>
        </button>
        <div>
          <p className="text-texttodo">Não tem uma conta? <span><Link href={`/register`}>Registre-se</Link></span></p>
        </div>
      </div>
  </div>    
  )  
}