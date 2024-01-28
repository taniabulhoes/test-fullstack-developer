"use client";

import Image from 'next/image';
import { useState } from 'react';
import CustomAlert from '../../components/CustomAlert';
import EditTaskModal from '../../components/EditTaskModal';
import PrivateRoute from '../../components/PrivateRoute';
import TaskListHeader from '../../components/TaskListHeader';
import useAuth from '../../context';
import { deleteTask } from '../../services/tasksApi.js';

export default function TaskList() {
  const { tasks, localStorageToken, user } = useAuth();
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<number>(0)
  const [newTaskModalOpen, setNewTaskModalOpen] = useState<boolean>(false)
  const [alert, setAlert] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<string | null>(null);

  async function handleDeleteTask(taskId: number, userId: number, token: string) {
    const {success} = await deleteTask(taskId, userId, token);

    if (success) {
      setAlert("Your task has been deleted nsucessfully")
      setAlertType("success")
      setTimeout(() => {
        setAlert(null)
        setAlertType(null)
      }, 1500);
    } else {
      setAlert("Something went wrong deleting the task, please try again")
      setAlertType("error")

      setTimeout(() => {
        setAlert(null)
        setAlertType(null)
      }, 1500);
    }

    window.location.reload();
  }

  function handleEditTask(taskId: number) {
    if(taskId === editTaskModalOpen) {
      setEditTaskModalOpen(0)
    }
    if(taskId !== editTaskModalOpen) {
      setEditTaskModalOpen(taskId)
    }
  }

  return (
    <PrivateRoute>
      {localStorageToken &&
        <main className="formulary__container">
          {alert && alertType && <CustomAlert message={alert} type={alertType}/> }
          <TaskListHeader 
            userId={user?.id}
            newTaskModalOpen={newTaskModalOpen}
            setNewTaskModalOpen={setNewTaskModalOpen}
            token={localStorageToken}
          />
          {tasks && tasks.length > 0 ? (
            <ol className="taskList__container">
              {tasks?.map((task: TasksProps) => (
                <div key={task.id} className="taskList__item_container">
                  <div className="taskList__item">
                    <li className="taskList__item_title">{task.title}</li>
                    <div className="taskList__item_buttonsContainer">
                      <a onClick={() => handleEditTask(task.id)}>
                        <Image
                          src="/icons/EditIcon.svg"
                          alt="Edit Task Button"
                          width={16}
                          height={16}
                        />
                      </a>
                      <a onClick={() => handleDeleteTask(task.id, task.user_id, localStorageToken)}>
                        <Image
                          src="/icons/DeleteIcon.svg"
                          alt="Delete Task Button"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  </div >
                    <EditTaskModal
                      editTaskModalOpen={editTaskModalOpen}
                      setEditTaskModalOpen={setEditTaskModalOpen}
                      taskId={task.id}
                      userId={task.user_id}
                      token={localStorageToken}
                    />
                </div>
              ))}
            </ol>
          ) : (
            <p>No tasks available.</p>
          )}
        </main>
      }
    </PrivateRoute>
  );
}