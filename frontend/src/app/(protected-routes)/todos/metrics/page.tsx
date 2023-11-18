import { getMetrics } from "@/lib/ssr/getMetrics"

type Metrics = {
  metrics: {
    total_todos: 5,
    total_conclude: 1
  }
}

export default async function Metrics(){
  const response: Metrics = await getMetrics()

  const {metrics} = response

  return (
    <div>
      <p className="text-detail md:text-4xl sm:text-3xl md:w-[100%] w-[100%] font-bold sm:pt-0 mb-14 text-center">Acompanhe suas métricas</p>
      <div className="bg-container flex justify-around rounded-sm items-center py-16">       
        <div className="bg-texttodo w-[200px] h-[200px] rounded-sm text-center flex flex-col items-center justify-center">
          <p className="text-sm font-bold">Atividades</p>
          <p className="text-[4rem]">{metrics.total_todos}</p>
        </div>
        <div className="bg-detail w-[200px] h-[200px] rounded-sm text-center flex flex-col items-center justify-center">
          <p className="text-sm font-bold text-texttodo">Atividades completadas</p>
          <p className="text-[4rem] text-texttodo">{metrics.total_conclude}</p>
        </div>      
      </div>
    </div>
  )
}