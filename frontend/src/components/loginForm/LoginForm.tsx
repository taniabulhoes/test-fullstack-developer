'use client'

import { FormContainer } from "./form.styles"
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { AppDispatch, RootState } from "@/redux/store/store"
import { loginUser } from "@/redux/features/login/loginActions"
import { ILoginRequest } from "@/interfaces/ILogin"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useState } from "react"
import { toast } from "react-toastify"

type FormValues = {
  email: string
  password: string
}


const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const login = useSelector((state: RootState) => state.login)
  const [showPassword, setShowPassword] = useState("password")

  const handleShowPassword = () => {
      if(showPassword == "password"){
        setShowPassword("text")
      } else {
        setShowPassword("password")
      }
  } 

  const onSubmit: SubmitHandler<FormValues> =  data => {


    const userData: ILoginRequest = {
      email: data.email,
      password: data.password
    }

    dispatch(loginUser(userData)).unwrap().then((_originalPromiseResult) => {
        toast.success("Sucesso ao entrar")
        return router.push('/')
      })
      .catch((_rejectedValueOrSerializedError) => {
        toast.error("Erro ao cadastrar")
      })
  }

  return (
             <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Login</h1>
                  <h2>Que bom que você voltou! Faça o login com seu e-mail e senha.</h2>
                  <div className="inputContainer">               
                    <input placeholder="seuemail@email.com*" {...register("email")} name="email"/>
                  </div>
                  <div className="inputContainer">               
                    <input type={showPassword} placeholder="Senha*" {...register("password")} name="password"/>                 
                     {showPassword == "password" ? <AiFillEyeInvisible onClick={()=> handleShowPassword()} /> : <AiFillEye onClick={()=> handleShowPassword()}/>}
                  </div>
                  <button type="submit">
                    Entrar
                  </button>
                  { login.error && !login.success && 
                  <div className="erroContainer">
                    <span>{login.error}*</span>
                  </div>
                  }               
                </form>
            </FormContainer>
  )
}

export { LoginForm }
