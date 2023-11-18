import Link from "next/link";


export default async function SubHeader(){

  return (
  <>
    <div className="bg-container flex items-center justify-center h-[45px]">
      <div>          
        <Link href="/todos" prefetch={false} className="text-detail text-sm ml-4 mr-4">
          Home
        </Link>
        <Link href="/todos/create" prefetch={false} className="text-detail text-sm">
          Adicionar atividade
        </Link>
        <Link href="/todos/metrics" prefetch={false} className="text-detail text-sm ml-4 mr-4">
          Métricas
        </Link>        
      </div>
    </div>
  </>
 ) 
}