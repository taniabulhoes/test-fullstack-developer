'use client'

import { useRef } from "react";
import FormInput from "../components/form/Input";
import * as yup from 'yup';
import { useToast } from "../hooks/useToast";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function Register(){
  const route = useRouter()
  const {notifyMe, dimissToast} = useToast()

  const nome = useRef<string>('');
  const email = useRef<string>('');
  const password = useRef<string>('');
  const password_confirm = useRef<string>('');

  const validate = async () =>{
    let schema = yup.object().shape({
      password_confirm: yup.string().required('Confirme a senha')
      .oneOf([yup.ref('password')], 'A confirmação da senha não confere'),      
      password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
      email: yup.string().required('Informe  o email').email('E-mail inválido'),
      nome: yup.string().required('Adicione seu nome'),
    })

    const registerData = {
      nome: nome.current,
      email: email.current,
      password: password.current,
      password_confirm: password_confirm.current
    }

    try {
      await schema.validate(registerData);      

      return true
    } catch (error) {
      if (error instanceof yup.ValidationError) {        
        error.errors.map((err) => {
          notifyMe({message: err, styleClass: 'wrong', icon: '✖', position: 'top-center'})
        })
      }
      return false;
    }
  }

  const handleRegister = async () => {
    if (!(await validate())) return;

    saveUser()
  }

  const saveUser = async () => {
    
    try {
      await api.post('/users', {
        name: nome.current,
        email: email.current,
        password: password.current
      })     
 
      notifyMe({message: 'Você foi cadastro! Agora é só logar', styleClass: 'success', icon: '✖', position: 'top-center'})

      setTimeout(() => {
        dimissToast()
        route.push('/signin')      
      }, 700);
      return
    } catch (error) {
      notifyMe({message: 'Ops! Não conseguimos cadastrar você, tente novamente', styleClass: 'warning', icon: '⚠️', position: 'top-center'})      
    }
  }

  return(
    <div className="flex flex-col items-center justify-center">
      <div className="
        flex
        flex-col	
        md:flex  h-[80vh]
        sm:mx-8
        rounded-sm
        p-8
        bg-container
        w-[90%]
        sm:w-[80%]
        my-10
        md:max-w-[50%]
        md:min-w-min
      ">
        <p className="text-texttodo md:text-4xl sm:text-3xl md:w-[100%] w-[100%] font-bold sm:pt-10 mb-14 md:text-left sm:text-center">Crie sua conta para acessar a <span className="text-detail">Todo List</span></p>

        <FormInput
          label="Nome"
          name="Nome"
          type="text"
          required={true}
          onChange={(e) => (nome.current = e.target.value)}
        />

        <FormInput
          label="Email"
          name="email"
          type="text"
          required={true}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => (email.current = e.target.value)}
        />

        <FormInput
          label="Senha"
          name="password"
          type="password"
          required={true}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => (password.current = e.target.value)}
        />

        <FormInput
          label="Confirme sua senha"
          name="password_confirm"
          type="password"
          required={true}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => (password_confirm.current = e.target.value)}
        />        
  
        <button 
          type="button" 
          className="w-full h-11 bg-detail rounded-sm mt-8"
          onClick={handleRegister}
        >
          <p className="text-texttodo font-bold text-sm">ACESSAR</p>
        </button>        
      </div>
    </div>
  )
}