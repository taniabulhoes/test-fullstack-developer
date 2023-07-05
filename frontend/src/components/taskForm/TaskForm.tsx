'use client'

import { FormContainer } from "./taskForm.styles"
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { AppDispatch, RootState } from "@/redux/store/store"
import { toast } from "react-toastify"
import { useState } from "react"
import { ITaskRequest } from "@/interfaces/ITask"
import { createTask } from "@/redux/features/tasks/tasksActions"
import { APP_ROUTES } from "@/constants/routes"


type FormValues = {
  title: string
  description: string
  status?: string
  userToken: string
}

const TaskForm = () => {
  const { register, handleSubmit, watch, formState:{ errors } } = useForm<FormValues>();

  const task = useSelector((state: RootState) => state.task)
  const dispatch = useDispatch<AppDispatch>()
  const { push } = useRouter()


  const [step, SetStep] = useState(1)
  const [title, setTitle] = useState("")
  const [showError, SetShowError] = useState(false)

  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(title == "" || title.length < 6){
      return SetShowError(true)
    }
    SetShowError(false)
    SetStep(2)
  }

    const previousStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    SetStep(1)
  }

  const handleBackButton = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      push("/")
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }


  const onSubmit: SubmitHandler<FormValues> =  data => {
        const newwTask: ITaskRequest = {
          title: data.title,
          description: data.description,
          status: data.status,
          userToken: task.userToken
        }

        dispatch(createTask(newwTask)).unwrap().then((_originalPromiseResult) => {
        toast.success("Tarefa Cadastrada")
        return push('/')
      })
      .catch((_rejectedValueOrSerializedError) => {
        toast.error("Erro ao cadastrar")
      })

  }


  return (
             <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1>Cadastrar nova tarefa</h1>
                  {step == 1 && 
                  <div className="formStep">
                    <h2>Vamos lá, primeiro digite o título da tarefa.</h2>              
                    <div className="inputContainer">
                      <input placeholder="Minha tarefa*" {...register("title", {required: "Campo obrigatório", minLength: { value: 6, message: "Deve conter ao 6 caracteres"}, onChange: (e) => {handleChange(e)}})} name="title"/>
                      {showError && <p>Mínimo 6 caracteres</p>}
                    </div>
                    <div className="actions">
                      <button className="stepCrontrol left" onClick={(e) => handleBackButton(e)}>
                        Voltar
                      </button>
                      <button className="stepCrontrol left" onClick={(e) => nextStep(e)}>
                        Continuar
                      </button>
                    </div>
                  </div>               
                  }
                  {step == 2 && 
                    <div className="formStep">
                      <h2>Agora a descrição e status</h2>              
                      <div className="inputContainer">
                        <textarea maxLength={300} placeholder="Descrição" {...register("description", {required: "Campo obrigatório", maxLength: { value: 30, message: "Tamanho máximo 300"}})} name="description"/>
                        {errors.description && <p>{errors.description.message}</p>}
                      </div>
                      <div className="radioOptions" >
                        <input {...register("status")} checked type="radio" id="open" name="status" value="open"/>
                        <label  htmlFor="open">Aberta</label><br/>
                        <input {...register("status")} type="radio" id="closed" name="status" value="closed"/>
                        <label htmlFor="closed">Fechada</label><br/>
                        <input {...register("status")} type="radio" id="running" name="status" value="running"/>
                        <label htmlFor="open">Em andamento</label>
                      </div>
                      <button type="submit" disabled={task.loading}>
                        Criar Tarefa
                      </button>
                      <button onClick={(e) => previousStep(e)} className="stepCrontrol right" >
                        Voltar
                      </button>
                    </div>               
                  }
                </form>
            </FormContainer>
  )
}

export { TaskForm }
