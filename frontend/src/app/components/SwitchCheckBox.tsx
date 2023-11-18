'use client'

import Switch from "react-switch";

type swithCheckBoxPros = {
  switchState: boolean,
  onChange: () => void;
}

export default function SwitchCheckBox({switchState, onChange}: swithCheckBoxPros){
  return (
    <>
        <Switch 
          onChange={onChange} 
          checked={switchState} 
          width={50}
          height={25}
          onColor="#00a873" 
          offColor="#979797" 
          checkedIcon={false}
          uncheckedIcon={false}
          alt="Finalize a atividade"
          />
    </>
  )
}