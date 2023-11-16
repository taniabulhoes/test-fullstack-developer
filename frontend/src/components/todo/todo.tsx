import { Cube } from "phosphor-react";
import { TodoCard } from "../../styles/components/todo";

export function Todo(){
  return (
    <TodoCard>
    <div>
      <span>Check</span>
      <p>Minha todo de hoje</p>
    </div>
    <Cube color="teal" weight="duotone" />
  </TodoCard>
  )
}