import { useState } from 'react';
import { createTask } from '../../services/tasksApi';
import handleChangeInput from '../../utils/handleChangeInput';
import CustomAlert from '../CustomAlert';

export default function CreateNewTaskModal({
    userId,
    newTaskModalOpen,
    setNewTaskModalOpen,
    token
  } : CreateNewTaskProps) {
  const [newTaskTitle, setNewTaskTitle] = useState<NewTaskProps>({title: ''})
  const [error, setError] = useState<string | null>(null);
  
  async function handleCreateNewTask(e: React.SyntheticEvent) {
    e.preventDefault();

    if (newTaskTitle.title.length === 0) {
      setError('Please insert a new task title');
      setTimeout(() => {
        setError(null)
      }, 1500);
      return setNewTaskModalOpen(true)
    }

    await createTask(userId, newTaskTitle.title, token )
    setNewTaskModalOpen(false)
    window.location.reload();
  }
  
  return (
    <main className={`${newTaskModalOpen ? 'newTask__container_opened' : 'newTask__container'} formulary__container`}>
      {error && <CustomAlert message={error} type="error"/> }
      <h1 className="formulary__container_title">Create a new task</h1>
      <form className="formulary" onSubmit={handleCreateNewTask}>
        <label className="formulary__label">
          <input
            className="formulary__input"
            name='title'
            placeholder='Type a new task'
            type="text"
            value={newTaskTitle.title}
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