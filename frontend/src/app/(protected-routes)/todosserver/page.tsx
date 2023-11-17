'use client'
import ApiClient from "@/lib/apiClient";


export default function TodosServer(){
  const fetchPost = async () => {

    const response = await ApiClient.patch('http://localhost:7777/token/refresh', {
      body: {
        none: '',
      }
    });

    console.log(response)
  };   

  


  return (
    <>
    <button onClick={() => fetchPost()}>
      
    </button>
      <h1>sadasdsad</h1>
    </>
  )
}