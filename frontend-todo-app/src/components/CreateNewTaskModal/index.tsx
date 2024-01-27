import { useState } from 'react';
import { createTask } from '../../services/tasksApi';

export default function CreateNewTaskModal({
    userId,
    newTaskModalOpen,
    setNewTaskModalOpen,
    token
  } : CreateNewTaskProps) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  
  async function handleCreateNewTask() {

    await createTask(userId, newTaskTitle, token )
    setNewTaskModalOpen(false)
  }
  
  return (
    <div className={`${newTaskModalOpen ? 'newTask__container_opened' : 'newTask__container'}`}>
      <form onSubmit={handleCreateNewTask}>
        <label>
          Insert a new task
          <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
        </label>
        <button type="submit">Create new task</button>
      </form>
      <button onClick={() => setNewTaskModalOpen(false)}>Close</button>
    </div>
  );
};