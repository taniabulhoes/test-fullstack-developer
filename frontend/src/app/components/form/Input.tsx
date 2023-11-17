'use client'

type InputProps = {
  label?: string,
  required: boolean
  type: string,
  name:string,
  onChange: (...args: any) => string;
}

export default function FormInput ({name, type, label, required, onChange}: InputProps) {
  return (
    <div className="mb-4">
        {
          label ?
          (
            <label className="text-texttodo mb-4">
              {label} {required ? (<span className="text-detail">*</span>) : null}
            </label>  
          )
          :
          null
        }
        <input 
          name={name} type={type} placeholder="Example"
          className="w-full h-11 pl-4 text-sm text-texttodo bg-inputs outline-none border-none rounded-sm mt-3"
          onChange={onChange}
        />      
    </div>
  )
}