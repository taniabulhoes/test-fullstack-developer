'use client'

import { useRef } from "react";
import FormDateInput from "@/app/components/form/DateInput.";
import FormInput from "@/app/components/form/Input";
import { FloppyDiskBack } from "phosphor-react";
import * as yup from 'yup';
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/useToast";
import ApiClient from "@/lib/ApiClient";

export default function CreateTodo(){
  const route = useRouter()
  const {notifyMe, dimissToast} = useToast()
  
  const subject = useRef<string>('');
  const expected_date = useRef<string>('');

  const validate = async () =>{
    let schema = yup.object().shape({
      expected_date: yup.string().required('Informe uma data'),
      subject: yup.string().required('Informe uma atividade'),
    })

    const registerData = {
      subject: subject.current,
      expected_date: expected_date.current,
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

    await saveTodo()
  }

  const saveTodo = async () => {
    try {
      const teste = await ApiClient.post('/todos', {
        subject: subject.current,
        expected_date: expected_date.current.replace('T', ' '),
      })     
      
      notifyMe({message: 'Atividade salva com sucesso', styleClass: 'success', icon: '👏', position: 'top-center'})

      setTimeout(() => {
        route.push('/todos')      
        dimissToast()
      }, 2500);

      return
    } catch (error) {
      notifyMe({message: 'Ops! Não conseguimos cadastrar, tente novamente', styleClass: 'warning', icon: '⚠️', position: 'top-center'})      
    }
  }

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
        <p className="text-texttodo md:text-4xl sm:text-3xl md:w-[100%] w-[100%] font-bold sm:pt-10 mb-14 md:text-left sm:text-center">Cadastro de atividades</p>

        <FormInput
          label="Atividade"
          name="todo"
          type="text"
          required={true}
          placeholder='Ex: Subir o monte Everest 🗻'
          onChange={(e) => (subject.current = e.target.value)}
        />       
        <FormDateInput 
          label="Vou fazer esta atividade no dia:" 
          required={true}
          type="datetime-local" 
          name="trip-start" 
          onChange={(e) => (expected_date.current = e.target.value)}  
        />
  
        <button 
          type="button" 
          className="w-full h-11 bg-detail rounded-sm mt-8"
          onClick={handleRegister}
        >
          <p className="text-texttodo font-bold text-sm flex justify-center items-center">
            <FloppyDiskBack size={20} className="mr-2"/>
            Cadastrar
          </p>
        </button>           
      </div>
    </div>
  )
}

