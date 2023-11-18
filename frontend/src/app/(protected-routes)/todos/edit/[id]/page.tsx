'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import FormDateInput from "@/app/components/form/DateInput.";
import FormInput from "@/app/components/form/Input";
import { useParams, useRouter } from "next/navigation";
import { FloppyDiskBack } from "phosphor-react";
import * as yup from 'yup';
import Link from "next/link";
import RemoveTodo from "@/app/components/RemoveTodo";
import { useToast } from "@/app/hooks/useToast";
import ApiClient from "@/lib/ApiClient";
import { todosProps } from "@/Providers/TodosProvider";
import { format } from "date-fns";
import ComputedInput from "@/app/components/form/ComputedInput";
import { AxiosError } from "axios";
import axios, { api } from "@/lib/axios";

export default function EditTodo (){ 
  const [todo, setTodo] = useState<todosProps>()
  const [nonExistentTodo, setNonExistentTodo] = useState<boolean>(false)
  const [subject, setSubject] = useState<string>()
  const [expectedDate, setExpectedDate] = useState<string>()

  const params = useParams()
  const id = String(params.id)
  const route = useRouter()

  const {notifyMe, dimissToast} = useToast()

  const fetchTodoById = useCallback(
    async () => {
      try {
        const response = await ApiClient.get(`/todos/todo/${id}`, {}); 
        const responseTodo: todosProps = response.data.todo

        const date = new Date(String(responseTodo?.expected_date));
        const formattedDate = format(date, "yyyy-MM-dd hh:mm");   

        responseTodo.expected_date = formattedDate

        setSubject(responseTodo.subject)
        setExpectedDate(formattedDate)

        setTodo(response.data.todo)        
      } catch (error) {
        console.log()
        setNonExistentTodo(true)
      }
    }, [setNonExistentTodo, id]
  )

  const validate = async () =>{
    let schema = yup.object().shape({
      expected_date: yup.string().required('Informe uma data'),
      subject: yup.string().required('Informe uma atividade'),
    })

    const registerData = {
      subject: subject,
      expected_date: expectedDate,
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

  const updateTodo = async () => {
    try {
      await ApiClient.put(`/todos/${id}`, {
        subject: subject,
        expected_date: expectedDate?.replace('T', ' '),
      })     
      
      notifyMe({message: 'Atividade atualizada com sucesso', styleClass: 'success', icon: '👏', position: 'top-center'})

      setTimeout(() => {
        route.push('/todos')      
        dimissToast()
      }, 2000);

      return
    } catch (error: AxiosError | any) {
      if(error instanceof AxiosError){
        error?.response?.data.message
        notifyMe({message: error?.response?.data.message, styleClass: 'warning', icon: '⚠️', position: 'top-center'})      
      }
    }
  }
 
  const handleUpdate = async () => {
    if (!(await validate())) return;

    await updateTodo()
   }

  useEffect(() => {
    fetchTodoById()
  }, [fetchTodoById])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="
        flex
        flex-col	
        md:flex  h-[80vh]
        sm:mx-8
        rounded-sm
        p-4
        bg-container
        w-[100%]
        sm:w-[100%]
        my-2
        md:max-w-[100%]
        md:min-w-min
      ">
        {
          nonExistentTodo === false ?
          (
            <>
                <p className="text-texttodo md:text-4xl sm:text-3xl md:w-[100%] w-[100%] font-bold sm:pt-10 mb-14 md:text-left sm:text-center">Editar</p>
                
                <div className="flex items-center justify-end">
                  <p className="text-detail text-sm">Deletar atividade</p>
                  {
                    todo ? (
                      <RemoveTodo todo={todo.subject} id={todo.id} redirect={true}/>
                    ) : null
                  }
                </div>

                <ComputedInput
                  label="Atividade"
                  name="todo"
                  type="text"
                  required={true}
                  value={subject}
                  placeholder='Ex: Subir o monte Everest 🗻'
                  onChange={(e) => setSubject(e.target.value)}
                />       
                <ComputedInput 
                  label="Vou fazer esta atividade no dia:"
                  required={true}
                  type="datetime-local"
                  name="trip-start"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}/>

                <button 
                  type="button" 
                  className="w-full h-11 bg-detail rounded-sm mt-8"
                  onClick={handleUpdate}
                >
                  <p className="text-texttodo font-bold text-sm flex justify-center items-center">
                    <FloppyDiskBack size={20} className="mr-2"/>
                    Atualizar
                  </p>
                </button>           
                   
            </>
          )
          :
          (
            <>
              <p className="text-texttodo md:text-4xl sm:text-3xl md:w-[100%] w-[100%] font-bold sm:pt-10 mb-14 md:text-left sm:text-center">Ops! Não conseguimos achar nenhuma atividade com esta identificação</p>
              <Link href="/todos" className="text-center text-detail" prefetch={false}>Voltar</Link>
            </>
          )
        }
     </div>
    </div>
  )
}
