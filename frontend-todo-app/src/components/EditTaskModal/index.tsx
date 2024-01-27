import { useState } from 'react';
import { editTask } from '../../services/tasksApi';

export default function EditTaskModal({
    editTaskModalOpen,
    setEditTaskModalOpen,
    taskId,
    userId,
    token,
  } : EditTaskModalProps) {
  const [taskNewTitle, setTaskNewTitle] = useState<string>('');

  const handleEditTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { success } = await editTask(taskId, taskNewTitle, userId, token);

    if (success) {
      setEditTaskModalOpen(0)
    } else {
      return
    }
  };

  return (
    <div className={`${editTaskModalOpen === taskId ? 'editTask__container_opened' : 'editTask__container'}`}>
      <form onSubmit={handleEditTask}>
        <label>
          New title:
          <input type="text" value={taskNewTitle} onChange={(e) => setTaskNewTitle(e.target.value)} />
        </label>
        <button type="submit">Edit Task</button>
      </form>
    </div>
  );
};