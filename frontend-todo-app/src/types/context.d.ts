interface ContextProps {
  user: UserProps | null
  login: (token: string) => void;
  logout: () => void;
  tasks: TasksProps[] | null
  localStorageToken: string | null
  loadTasksError: string | null
}

interface ServerResponseProps {
  
}