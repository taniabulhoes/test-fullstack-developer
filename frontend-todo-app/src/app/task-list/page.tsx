"use client";

import Image from 'next/image';
import Loading from '../../components/Loading';
import PrivateRoute from '../../components/PrivateRoute';
import useAuth from '../../context';

export default function TaskList() {
  const { tasks } = useAuth();

  function handleEditTask(task: any) {
    console.log("editing task")
  }

  function handleDeleteTask(task: any) {
    console.log("deleting task")
  }

  if(!tasks) {
    return (
    <PrivateRoute>
      <Loading />
    </PrivateRoute>
  )};

  return (
    <PrivateRoute>
      <main>
        <h1>Task List</h1>
        {tasks.length > 0 ? (
          <ol>
            {tasks.map((task: any) => (
              <div key={task.id}>
                <li>{task.title}</li>
                <a onClick={handleEditTask}>
                  <Image
                    src="/icons/EditIcon.svg"
                    alt="Edit Task Button"
                    width={24}
                    height={24}
                  />
                </a>
                <a onClick={handleDeleteTask}>
                  <Image
                    src="/icons/DeleteIcon.svg"
                    alt="Delete Task Button"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            ))}
          </ol>
        ) : (
          <p>No tasks available.</p>
        )}
      </main>
    </PrivateRoute>
  );
}