import Image from 'next/image';
import { useState } from 'react';
import { editTask } from '../../services/tasksApi';
import CustomAlert from '../CustomAlert';

export default function EditTaskModal({
    editTaskModalOpen,
    setEditTaskModalOpen,
    taskId,
    userId,
    token,
  } : EditTaskModalProps) {
  const [taskNewTitle, setTaskNewTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleEditTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if(taskNewTitle.length === 0){
      setError('Please insert a new task title');
      setTimeout(() => {
        setError(null)
      }, 1500);
      return
    }

    const { success } = await editTask(taskId, taskNewTitle, userId, token);

    if (success) {
      setEditTaskModalOpen(0)
      window.location.reload();
    } else {
      setError('Something went wrong editing the task, please try again');
      setTimeout(() => {
        setError(null)
      }, 1500);
      
      return
    }
  };

  return (
    <div className={`${editTaskModalOpen === taskId ? 'editTask__container_opened' : 'editTask__container'}`}>
      {error && <CustomAlert message={error} type="error"/>}
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