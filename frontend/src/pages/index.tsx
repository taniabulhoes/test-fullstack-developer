import Image from "next/image";
import { Advertising, Container, CreateAccount, ForgotPassowrd, LoginContainer } from "../styles/pages/login";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input, Button } from "../styles/pages/general";

export default function Login() {
  const router = useRouter()

  return (
    <div>
      <Container>
        <Advertising>
          <p>
            Faça Login e use o melhor <span>ToDo List</span> do Brasil!
          </p>
        </Advertising>
        <LoginContainer>
          <Input name="email" type="text" placeholder="E-mail"/>
          <Input name="password" type="password" placeholder="Senha"/>
          <ForgotPassowrd>
            <Link href={'.'} prefetch={false}>Esqueci minha senha</Link>
          </ForgotPassowrd>
          <Button>
            ACESSAR
          </Button>
          <CreateAccount>
            <p>Não tem uma conta? <span><Link href={`/register`}>Registre-se</Link></span></p>
          </CreateAccount>
        </LoginContainer>
      </Container>
    </div>
  )
}
