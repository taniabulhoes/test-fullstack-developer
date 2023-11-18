import { ToastContext } from "@/Providers/ToastProvider";
import { useContext } from "react";

export function useToast(){
  const context = useContext(ToastContext);

  return context;
}