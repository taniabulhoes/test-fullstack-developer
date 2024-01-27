import Image from 'next/image';
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
      <form className="editTask__formulary" onSubmit={handleEditTask}>
        <label className="editTask__label">
          <h6>New title:</h6>          
          <input type="text" value={taskNewTitle} placeholder="Write a new title" onChange={(e) => setTaskNewTitle(e.target.value)} />
        </label>
        <button type="submit">
          <Image
            src="/icons/ConfirmIcon.svg"
            alt="Confirm Edit Icon"
            width={22}
            height={22}
          />
        </button>
      </form>
    </div>
  );
};