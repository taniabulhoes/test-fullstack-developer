import { AuthGetApiServer } from "../fetchApi";

export async function getMetrics(){
  const res = await AuthGetApiServer('/todos/metrics')

  return res
}