'use client'

type InputProps = {
  name:string,
  required: boolean
  label?: string,
  type: string,
  placeholder?: string
  value: string | undefined
  onChange: (...args: any) => void;
}

export default function ComputedInput ({name, required, type, label, placeholder, value, onChange}: InputProps) {
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
          value={value}
          className="w-full h-11 pl-4 text-sm text-texttodo bg-inputs outline-none border-none rounded-sm mt-3"
          onChange={onChange}
        /> 
    </div>
  )
}