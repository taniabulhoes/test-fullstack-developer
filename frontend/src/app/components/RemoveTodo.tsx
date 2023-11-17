import { Trash } from "phosphor-react";
import '../../styles/alertDialog.css'
import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useTodos } from "../hooks/useTodos";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage.external";

type removeTodoProps = {
  id: string, 
  todo: string
}

export default function RemoveTodo({todo, id}: removeTodoProps){
  const [show, setShow] = useState(false)
  const [open, setOpen] = React.useState(false);

  const {removeTodo} = useTodos()

  const handleRemoveTodo = async () => {
    removeTodo(id)

    setTimeout(() => {
      setOpen(false)    

    }, 2000)
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={setShow}>
    <AlertDialog.Trigger asChild onClick={(e) => setOpen(true)}>
      <Trash size={25} className="m-1 cursor-pointer" color="#00a873"/>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">Você tem certeza?</AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          A tarefa <span className="text-detail font-bold">{todo}</span> não poderá mais ser visualizada
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild onClick={(e) => setOpen(false)}>
            <button className="bg-detail text-texttodo rounded-sm px-2 py-1">Cancelar</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild onClick={handleRemoveTodo}>
            <button className="bg-[#000] text-texttodo rounded-sm px-2 py-1">Deletar</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
  )
}