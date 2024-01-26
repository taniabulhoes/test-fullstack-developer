interface ContextProps {
  user: UserProps | null
  login: (token: string) => void;
  logout: () => void;
  tasks: any
}

interface ServerResponseProps {
  
}