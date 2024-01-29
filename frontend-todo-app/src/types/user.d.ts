interface UserProps {
  id: number
  name: string 
  email: string
}

type UserLoginProps = {
  email: string
  password: string
}

type NewUserProps = {
  name: string
  email: string
  password: string
}