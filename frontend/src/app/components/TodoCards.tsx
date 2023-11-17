'use client'

import { format } from "date-fns"
import { CalendarBlank, Pen, Trash } from "phosphor-react"
import { useState } from "react"
import SwitchCheckBox from "./SwitchCheckBox"
import RemoveTodo from "./RemoveTodo"

type itemTodoCard = {
  id: string
  subject: string
  expected_date: string
}

type todoCardProps = {
  item: itemTodoCard
}

export default function TodoCards({item}: todoCardProps){
  const [switchCheck, setSwitchCheck] = useState(false)

  async function handleSwitchBox(){
    setSwitchCheck(!switchCheck)
  }

  var date = new Date(item.expected_date);
  var formattedDate = format(date, "yyyy/MM/dd");

  return (
    <>

    <div className="flex flex-row">
      <div className="
          bg-todocard w-full flex flex-row justify-between rounded-sm mb-3 px-4 py-2 items-center
          border-l-4 border-solid border-detail
        ">
          <div className="flex">
            <p className="text-texttodo text-sm">{item.subject}</p>
          </div>
          <div className="flex">
            <div className="flex mr-6 mt-1">
              <CalendarBlank  size={20} color="#00a873"/>
              <p className="text-detail text-sm ml-2">{formattedDate}</p>
            </div>
            <SwitchCheckBox
              switchState={switchCheck}
              onChange={() => handleSwitchBox()}
            />      
          </div>
        </div>
        <div className="flex items-center rounded-sm bg-todocard h-5 px-2 py-5 ml-2">
          <button>
            <Pen size={25} className="m-1" color="#fff"/>
          </button>
          <RemoveTodo todo={item.subject} id={item.id}/>
        </div>
    </div>
    </>
  )
}