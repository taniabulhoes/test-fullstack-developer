import Login from "../../components/Login";

export default function SignIn(){
  return (
    <div className="flex justify-center">
      <div className="
        md:flex items-center justify-center h-[100vh]
        m-auto
        sm:mx-8
        md:max-w-[70%]
      ">
        <div className="w-full sm:h-[220px]">
          <p className="text-texttodo md:text-4xl sm:text-3xl md:w-[85%] w-[100%] font-bold sm:pt-8 md:text-left sm:text-center">Faça login para acessar a melhor <span className="text-detail">Todo List</span> do Brasil!</p>
        </div>
        <div className="bg-containerlogin w-full justify-center content-center">
          <Login/>
        </div>
      </div>
    </div>
  )
}