import Image from 'next/image';
import { useState } from 'react';
import { editTask } from '../../services/tasksApi';
import handleChangeInput from '../../utils/handleChangeInput';
import CustomAlert from '../CustomAlert';

export default function EditTaskModal({
    editTaskModalOpen,
    setEditTaskModalOpen,
    taskId,
    userId,
    token,
  } : EditTaskModalProps) {
  const [taskNewTitle, setTaskNewTitle] = useState<NewTaskProps>({title: ''});
  const [error, setError] = useState<string | null>(null);

  const handleEditTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if(taskNewTitle.title.length === 0){
      setError('Please insert a new task title');
      setTimeout(() => {
        setError(null)
      }, 1500);
      return
    }

    const { success } = await editTask(taskId, taskNewTitle.title, userId, token);

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
          <input
            type="text"
            name='title'
            value={taskNewTitle.title}
            placeholder="Write a new title"
            onChange={(e) => handleChangeInput(e, setTaskNewTitle)}
          />
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