import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { ITask } from "@/types/tasks";
import usePersistedState from "@/hooks/usePersistedState";

interface TasksContextProps {
  deleteTask: (id: string) => void;
  filterTasks: (term: string) => void;
  getTasks: () => {};
  searchedTaskTitle?: string | null;
  tasks: ITask[];
  updateTask: ({
    completed,
    id,
    title,
  }: {
    completed?: boolean;
    id: string;
    title?: string;
  }) => void;
  createTask: ({ user_id, title }: { user_id?: string; title: string }) => void;
}

interface TasksProviderProps {
  children: JSX.Element;
}

const TasksContext = createContext<TasksContextProps | null>(null);

const TasksProvider = ({ children }: TasksProviderProps) => {
  const router = useRouter();

  const [tasks, setTasks] = usePersistedState<ITask[]>("tasks", []);
  const [searchedTaskTitle, setSearchedTaskTitle] = useState<string | null>();

  const getTasks = async () => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get("http://localhost:3000/task/all", config);

    setTasks(data);
  };

  const filterTasks = (term: string) => {
    setSearchedTaskTitle(term);
  };

  const deleteTask = async (id: string) => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.delete(`http://localhost:3000/task?id=${id}`, config);

      const taskIndexToDelete = tasks.findIndex((task) => task.id === id);
      const newTasks = [...tasks];
      newTasks.splice(taskIndexToDelete, 1);

      setTasks(newTasks);

      toast.success("Tarefa deletada com sucesso");
    } catch (error) {
      toast.error("Falha ao deletar tarefa");
    }
  };

  const createTask = async ({
    user_id,
    title,
  }: {
    user_id?: string;
    title: string;
  }) => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.post(
        "http://localhost:3000/task",
        {
          user_id,
          title,
        },
        config
      );

      toast.success("Tarefa criada com sucesso");

      router.push("/tasks");
    } catch (error) {
      toast.error("Falha ao criar tarefa");
    }
  };

  const updateTask = async ({
    completed,
    id,
    title,
  }: {
    completed?: boolean;
    id: string;
    title?: string;
  }) => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.put(
        `http://localhost:3000/task`,
        {
          id,
          ...(completed !== null && { completed }),
          ...(title && { title }),
        },
        config
      );

      const taskIndexToUpdate = tasks.findIndex((task) => task.id === id);
      const newTasks = [...tasks];
      const updatedTask = {
        ...tasks[taskIndexToUpdate],
        ...(completed !== null && { completed }),
        ...(title && { title }),
      };
      newTasks.splice(taskIndexToUpdate, 1, updatedTask);

      setTasks(newTasks);
    } catch (error) {
      toast.error("Falha ao atualizar tarefa");
    }
  };

  return (
    <TasksContext.Provider
      value={{
        deleteTask,
        createTask,
        filterTasks,
        getTasks,
        searchedTaskTitle,
        tasks,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

function useTasks(): TasksContextProps {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useAuth must be used within TasksContext provider");
  }

  return context;
}

export { TasksProvider, useTasks };
