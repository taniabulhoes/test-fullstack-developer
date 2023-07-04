import { Container, Content , Main } from "./register.styles.js"
import { Header } from "@/components/header/Header"
import { RegisterForm } from "@/components/registerForm/RegisterForm"


export default function Register() {
  return (
    <Main>
      <Header page="register"/>
      <Container>
        <Content>
            <RegisterForm/>
        </Content>
      </Container>
    </Main>
  )
}
