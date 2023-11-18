'use client'

type InputProps = {
  name:string,
  required: boolean
  label?: string,
  type: 'date' | 'datetime-local',
  placeholder?: string
  onChange: (...args: any) => string;
}

export default function FormDateInput ({name, required, type, label, placeholder, onChange}: InputProps) {
  return (
    <div className="mb-4">
        {
          label ?
          (
            <label className="text-texttodo text-sm mb-4">
              {label} {required ? (<span className="text-detail">*</span>) : null}
            </label>  
          )
          :
          null
        }
        <input 
          name={name} type={type} placeholder={placeholder}
          className="w-full h-11 pl-4 text-sm text-texttodo bg-inputs outline-none border-none rounded-sm mt-3"
          onChange={onChange}
        />      
    </div>
  )
}