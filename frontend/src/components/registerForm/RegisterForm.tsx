'use client'

import { FormContainer } from "./registerForm.styles"
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { registerUser } from "@/redux/features/users/usersActions"
import { IUserRequest } from "@/interfaces/IUser"
import { AppDispatch, RootState } from "@/redux/store/store"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { toast } from "react-toastify"
import { useState } from "react"

type FormValues = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}


const RegisterForm = () => {
  const { register, handleSubmit, watch, formState:{ errors } } = useForm<FormValues>();
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
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <h1>Cadastrar</h1>
                  <h2>Crie a sua conta e aproveite nossos serviços.</h2>
                  <div className="inputContainer">
                    <input placeholder="Nome*" {...register("name", {required: "Campo obrigatório"})} name="name"/> 
                    {errors.name && <p>{errors.name.message}</p>}
                  </div>                 
                  <div className="inputContainer">
                    <input placeholder="seuemail@email.com*" {...register("email", {pattern: { 
                        value: new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
                        message: "Email em formato inválido"
                       }, required: "Campo obrigatório"})} name="email"/>
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="inputContainer">
                    <input placeholder="Senha*" type={showPassword} {...register("password", {required: "Campo obrigatório", minLength: {value: 6, message: "Deve conter ao 6 caracteres"}})} name="password"/>
                    {showPassword == "password" ? <AiFillEyeInvisible onClick={()=> handleShowPassword()} /> : <AiFillEye onClick={()=> handleShowPassword()}/>} 
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                  <div className="inputContainer">
                    <input placeholder="Confirme a Senha*" type="password" {...register("passwordConfirm", {required: "Campo obrigatório",
                        validate: (val: string) => {
                          if(watch('password') != val){
                            return "Senhas diferentes"
                          }
                        }
                      })} name="passwordConfirm"/>    
                    {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
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
