interface ContextProps {
  user: User | null
  // setUser: (user: User) => void
  login: (userData: User) => void;
  logout: () => void;
}

interface ServerResponseProps {
  
}