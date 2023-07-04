'use client'

import { clearStorage } from "@/helpers/clearStorage"
import { Container, Content, Logo } from "./header.styles"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
import { setToInitalState as userSliceLogout } from "@/redux/features/users/user"
import { setToInitalState as taskSliceLogout} from "@/redux/features/tasks/task"
import { setToInitalState as loginSliceLogout} from "@/redux/features/login/login"


interface Props {
  page?: string 
}

const Header = ( props: Props) => {

  const {push} = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const logOut =  ()=>{
    clearStorage()
    dispatch(userSliceLogout)
    dispatch(taskSliceLogout)
    dispatch(loginSliceLogout)
    

    return push("/login")
  }

  const handleClick = () => {
    if (props.page == "login"){
      return push("/register")
    }

    if (props.page == "register"){
      return push("/login")
    }

    return (
      logOut()
    )
  }

  return (
    <Container>
            <Content>
                <Logo>
                     <p>TBTD</p>
                </Logo>
                <button onClick={()=> handleClick()}>{
                  props.page == "login" ? "Cadastrar" : props.page == "register" ? "Entrar" : "Sair"
                  }</button>
            </Content>
    </Container>
  )
}

export { Header }
