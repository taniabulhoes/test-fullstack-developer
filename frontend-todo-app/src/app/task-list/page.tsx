"use client";

import Image from 'next/image';
import { useState } from 'react';
import EditTaskModal from '../../components/EditTaskModal';
import Header from '../../components/Header';
import PrivateRoute from '../../components/PrivateRoute';
import useAuth from '../../context';
import { deleteTask } from '../../services/tasksApi.js';

export default function TaskList() {
  const { tasks, localStorageToken, user } = useAuth();
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<number>(0)
  const [newTaskModalOpen, setNewTaskModalOpen] = useState<boolean>(false)

  async function handleDeleteTask(taskId: number, userId: number, token: string) {
    await deleteTask(taskId, userId, token);
  }

  function handleEditTask(taskId: number) {
    if(taskId === editTaskModalOpen) {
      setEditTaskModalOpen(0)
    }
    if(taskId !== editTaskModalOpen) {
      setEditTaskModalOpen(taskId)
    }
  }

  // if(!tasks) {
  //   return (
  //   <PrivateRoute>
  //     <Loading />
  //   </PrivateRoute>
  // )};

  return (
    <PrivateRoute>
      {localStorageToken &&
        <main>
          <Header 
            userId={user?.id}
            newTaskModalOpen={newTaskModalOpen}
            setNewTaskModalOpen={setNewTaskModalOpen}
            token={localStorageToken}
          />
          {tasks && tasks.length > 0 ? (
            <ol>
              {tasks?.map((task: TasksProps) => (
                <div key={task.id} className="task__container">
                  <div>
                    <li>{task.title}</li>
                    <a onClick={() => handleEditTask(task.id)}>
                      <Image
                        src="/icons/EditIcon.svg"
                        alt="Edit Task Button"
                        width={24}
                        height={24}
                      />
                    </a>
                    <a onClick={() => handleDeleteTask(task.id, task.user_id, localStorageToken)}>
                      <Image
                        src="/icons/DeleteIcon.svg"
                        alt="Delete Task Button"
                        width={24}
                        height={24}
                      />
                    </a>
                  </div>
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