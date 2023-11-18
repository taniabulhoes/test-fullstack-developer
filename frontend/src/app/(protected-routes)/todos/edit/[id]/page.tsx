'use client'

import SwitchCheckBox from "@/app/components/SwitchCheckBox";
import FormDateInput from "@/app/components/form/DateInput.";
import FormInput from "@/app/components/form/Input";
import { FloppyDiskBack } from "phosphor-react";
import { useRef, useState } from "react";

export default function EditTodo (){ 
  const [switchCheck, setSwitchCheck] = useState<boolean>(true)
  
  const subject = useRef<string>('');
  const expected_date = useRef<string>('');
  
  const handleRegister = () => {
    
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
        <p className="text-texttodo md:text-4xl sm:text-3xl md:w-[100%] w-[100%] font-bold sm:pt-10 mb-14 md:text-left sm:text-center">Editar</p>

<p>Adicionar aqui botão de excluir com confirmação de dialogo</p>
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
              <SwitchCheckBox
              switchState={switchCheck}
              onChange={() => setSwitchCheck(!switchCheck)}
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