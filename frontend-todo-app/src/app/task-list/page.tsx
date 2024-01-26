"use client";

import Loading from '../../components/Loading';
import PrivateRoute from '../../components/PrivateRoute';
import useAuth from '../../context';

export default function TaskList() {
  const { tasks } = useAuth();

  console.log(tasks)

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
              <li key={task.id}>{task.title}</li>
            ))}
          </ol>
        ) : (
          <p>No tasks available.</p>
        )}
      </main>
    </PrivateRoute>
  );
}