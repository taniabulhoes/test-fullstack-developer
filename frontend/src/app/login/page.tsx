
import { Container, Content , Main } from "./login.styles.js"
import { Header } from "@/components/header/Header"
import { LoginForm } from "@/components/loginForm/LoginForm"
import { ILoginSliceinitialState } from "@/interfaces/ILogin.js"
import { RootState } from "@/redux/store/store.js"
import { useRouter } from "next/navigation.js"
import { useSelector } from "react-redux"


export default function Login() {

  return (
    <Main>
      <Header page="login"/>
      <Container>
        <Content>
            <LoginForm/>
        </Content>
      </Container>
    </Main>
  )
}
