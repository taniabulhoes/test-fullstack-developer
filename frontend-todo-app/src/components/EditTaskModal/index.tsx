import Image from 'next/image';
import { useState } from 'react';
import CustomAlert, { defaultAlert } from '../../components/CustomAlert';
import { editTask } from '../../services/tasksApi';
import handleChangeInput from '../../utils/handleChangeInput';
import { isAnyFormInputsEmpty } from '../../utils/validateField';

export default function EditTaskModal({
    editTaskModalOpen,
    setEditTaskModalOpen,
    taskId,
    userId,
    token,
  } : EditTaskModalProps) {
  const [taskNewTitle, setTaskNewTitle] = useState<NewTaskProps>({title: ''});
  const [alertComponent, setAlertComponent] = useState<CustomAlertProps>(defaultAlert);

  const handleEditTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if(isAnyFormInputsEmpty([taskNewTitle.title])){
      setAlertComponent((prev: CustomAlertProps) => ({
        ...prev,
        open: true,
        message: "Please insert a new task title",
        type: 'error'
      }));
      return
    }

    const { success } = await editTask(taskId, taskNewTitle.title, userId, token);

    if (success) {
      setEditTaskModalOpen(0)
      window.location.reload();
    } else {
      setAlertComponent((prev: CustomAlertProps) => ({
        ...prev,
        open: true,
        message: "Something went wrong editing the task, please try again",
        type: 'error'
      }));
    }
  };

  return (
    <div className={`${editTaskModalOpen === taskId ? 'editTask__container_opened' : 'editTask__container'}`}>
      {alertComponent.open && (
        <CustomAlert
          message={alertComponent.message}
          type={alertComponent.type}
          setAlertComponent={setAlertComponent}
          open={alertComponent.open}
        />
      )}
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