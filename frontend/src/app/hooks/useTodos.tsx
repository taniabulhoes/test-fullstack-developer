import { TodosContext } from "@/Providers/TodosProvider";
import { useContext } from "react";

export function useTodos(){
  const context = useContext(TodosContext);

  return context;
}