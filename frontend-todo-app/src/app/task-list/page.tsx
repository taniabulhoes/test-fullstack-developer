"use client";

import Image from 'next/image';
import { useState } from 'react';
import CustomAlert, { defaultAlert } from '../../components/CustomAlert';
import EditTaskModal from '../../components/EditTaskModal';
import PrivateRoute from '../../components/PrivateRoute';
import TaskListHeader from '../../components/TaskListHeader';
import useAuth from '../../context';
import { deleteTask } from '../../services/tasksApi';

export default function TaskList() {
  const { tasks, localStorageToken, user } = useAuth();
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<number>(0)
  const [alertComponent, setAlertComponent] = useState<CustomAlertProps>(defaultAlert);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const filteredTasks = tasks?.filter(task =>
    task.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  async function handleDeleteTask(taskId: number, userId: number, token: string) {
    const {success} = await deleteTask(taskId, userId, token);

    if (success) {
      setAlertComponent((prev: CustomAlertProps) => ({
        ...prev,
        open: true,
        message: "Your task has been deleted nsucessfully",
        type: 'success'

      }));
    } else {
        setAlertComponent((prev: CustomAlertProps) => ({
          ...prev,
          open: true,
          message: "Something went wrong deleting the task, please try again",
          type: 'error'

        }));
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
          {alertComponent.open && (
            <CustomAlert 
              message={alertComponent.message}
              type={alertComponent.type}
              setAlertComponent={setAlertComponent}
              open={alertComponent.open}
            />)
          }
          <TaskListHeader 
            userId={user?.id}
            token={localStorageToken}
          />
          <div className='taskList__searchTasks_container'>
            <input
              type="text"
              placeholder="Search tasks by title..."
              onChange={(e) => setSearchTitle(e.target.value)}
              className='formulary__input'
            />
          </div>
          {filteredTasks && filteredTasks.length > 0 ? (
            <ol className="taskList__container">
              {filteredTasks?.map((task: TasksProps) => (
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
            <p className='taskList__noTasks'>No tasks available.</p>
          )}
        </main>
      }
    </PrivateRoute>
  );
}