'use client'

import { FormContainer } from "./registerForm.styles"
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { registerUser } from "@/redux/features/users/usersActions"
import { IUserRequest } from "@/interfaces/IUser"
import { AppDispatch, RootState } from "@/redux/store/store"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { ToastContainer, toast } from "react-toastify"
import { useState } from "react"

type FormValues = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}


const RegisterForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const user = useSelector((state: RootState) => state.user)
  const [showPassword, setShowPassword] = useState("password")

 const handleShowPassword = () => {
    if(showPassword == "password"){
      setShowPassword("text")
    } else {
      setShowPassword("password")
    }
 } 

  const onSubmit: SubmitHandler<FormValues> =  data => {
    if (data.password !== data.passwordConfirm) {
    }

    const userData: IUserRequest = {
      email: data.email.toLowerCase(),
      name: data.name,
      password: data.password
    }

    dispatch(registerUser(userData)).unwrap().then((originalPromiseResult) => {
        toast.success("Cadastro realizado")
        return router.push('/login')
      })
      .catch((rejectedValueOrSerializedError) => {
        toast.error("Erro ao cadastrar")
      })
  }

  return (
             <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Cadastrar</h1>
                  <h2>Crie a sua conta e aproveite nossos serviços.</h2>
                  <div className="inputContainer">
                    <input placeholder="Nome*" {...register("name")} name="name"/> 
                  </div>                 
                  <div className="inputContainer">
                    <input placeholder="seuemail@email.com*" {...register("email")} name="email"/>
                  </div>
                  <div className="inputContainer">
                    <input placeholder="Senha*" type={showPassword} {...register("password")} name="password"/>
                    {showPassword == "password" ? <AiFillEyeInvisible onClick={()=> handleShowPassword()} /> : <AiFillEye onClick={()=> handleShowPassword()}/>}                
                  </div>
                  <div className="inputContainer">
                    <input placeholder="Confirme a Senha*" type="password" {...register("passwordConfirm")} name="passwordConfirm"/>                 
                  </div>
                  <button type="submit" disabled={user.loading}>
                    Criar Conta
                  </button>
                  { user.error && !user.success && 
                  <div className="erroContainer">
                    <span>{user.error}*</span>
                  </div>
                  }
                </form>
            </FormContainer>
  )
}

export { RegisterForm }
