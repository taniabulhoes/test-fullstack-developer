"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export type ToastContextDataProps = {
  notifyMe: ({message, styleClass}: notifyMeToast) => void;
  dimissToast: () => void
  toastShow: boolean
  setToastShow: Dispatch<SetStateAction<boolean>>,
}

export const ToastContext = createContext({} as ToastContextDataProps)


type ToastContextProviderProps = {
  children: ReactNode
}

type notifyMeToast = {
  message: string,
  styleClass: 'wrong' | 'success' | 'warning',
  icon: string,
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export function ToastContextProvider({children}: ToastContextProviderProps){
  const [toastShow, setToastShow] = useState<boolean>(false)

  const notifyMe = async ({message, styleClass, icon, position}: notifyMeToast) => {
    return toast(message, 
    {
      duration: 3000,
      position,
      className: styleClass,
      icon
    })
  }

  const dimissToast = async () => {
    return toast.dismiss()
  }

  return (
    <ToastContext.Provider value={{
      toastShow,
      setToastShow,
      notifyMe,
      dimissToast,
    }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
  
}

