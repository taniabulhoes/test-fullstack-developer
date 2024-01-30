import { useState } from 'react';
import CustomAlert, { defaultAlert } from '../../components/CustomAlert';
import { createTask } from '../../services/tasksApi';
import handleChangeInput from '../../utils/handleChangeInput';
import { isAnyFormInputsEmpty } from '../../utils/validateField';

export default function CreateNewTaskModal({
    userId,
    newTaskModalOpen,
    setNewTaskModalOpen,
    token
  } : CreateNewTaskProps) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [alertComponent, setAlertComponent] = useState<CustomAlertProps>(defaultAlert);
  
  async function handleCreateNewTask(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isAnyFormInputsEmpty([newTaskTitle])) {
      setAlertComponent((prev: CustomAlertProps) => ({
        ...prev,
        open: true,
        message: "Please insert a new task title",
        type: 'error'
      }));
      return setNewTaskModalOpen(true)
    }

    await createTask(userId, newTaskTitle, token )
    setNewTaskModalOpen(false)
    window.location.reload();
  }
  
  return (
    <main className={`${newTaskModalOpen ? 'newTask__container_opened' : 'newTask__container'} formulary__container`}>
      {alertComponent.open && (
        <CustomAlert
          message={alertComponent.message}
          type={alertComponent.type}
          setAlertComponent={setAlertComponent}
          open={alertComponent.open}
        />
      )}
      <h1 className="formulary__container_title">Create a new task</h1>
      <form className="formulary" onSubmit={handleCreateNewTask}>
        <label className="formulary__label">
          <input
            className="formulary__input"
            name='title'
            placeholder='Type a new task'
            type="text"
            value={newTaskTitle}
            onChange={(e) => handleChangeInput(e, setNewTaskTitle)}
          />
        </label>
        <div>
          <button className="formulary__button" type="submit">Create</button>
          <button className="formulary__button" type="button" onClick={() => setNewTaskModalOpen(false)}>Close</button>
        </div>
      </form>
    </main>
  );
};