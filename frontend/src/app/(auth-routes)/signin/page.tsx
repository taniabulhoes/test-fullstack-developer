import Login from "../../components/Login";

export default function SignIn(){

  return (
    <div className="
      flex justify-between items-center h-[100vh]
      max-w-7xl
      m-auto
    ">
      <div className="w-full">
        <p className="text-texttodo text-4xl w-[80%] font-bold px-10">Faça login para acessar a melhor <span className="text-detail">Todo List</span> do Brasil!</p>
      </div>
      <div className="bg-containerlogin w-full">
        <Login/>
      </div>
    </div>
  )
}